import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { type QuizResponse, type QuizResult, type CategoryScore, type QuizItem } from "@shared/schema";
import { quizItems, categorySummaries, overallScoreFeedback } from "@shared/quizData";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get quiz items
  app.get("/api/quiz/items", (req, res) => {
    res.json({ items: quizItems });
  });

  // Submit quiz assessment
  app.post("/api/quiz/assess", async (req, res) => {
    try {
      const responses: QuizResponse[] = req.body.responses;
      
      // Calculate scores
      const result = calculateQuizResult(responses);
      
      // Save assessment
      const assessment = await storage.createQuizAssessment({
        responses,
        result
      });

      res.json({ assessment });
    } catch (error) {
      console.error("Error processing quiz assessment:", error);
      res.status(500).json({ error: "Failed to process assessment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function calculateQuizResult(responses: QuizResponse[]): QuizResult {
  // Create a map of responses for quick lookup
  const responseMap = new Map(responses.map(r => [r.itemId, r.deployed]));
  
  // Group items by category and calculate scores
  const categoryScores: CategoryScore[] = [];
  const categoriesMap = new Map<string, { totalScore: number; totalPossible: number; items: QuizItem[] }>();
  
  // Group quiz items by category
  quizItems.forEach(item => {
    if (!categoriesMap.has(item.category)) {
      categoriesMap.set(item.category, { totalScore: 0, totalPossible: 0, items: [] });
    }
    const categoryData = categoriesMap.get(item.category)!;
    categoryData.items.push(item);
    categoryData.totalPossible += item.weightedPoints;
    
    // Add score if deployed
    if (responseMap.get(item.id)) {
      categoryData.totalScore += item.weightedPoints;
    }
  });

  // Calculate category scores and build recommendations
  let totalScore = 0;
  let totalPossible = 0;
  
  for (const [categoryName, data] of Array.from(categoriesMap.entries())) {
    const percentage = Math.round((data.totalScore / data.totalPossible) * 100);
    const isUnderperforming = percentage < 60;
    
    // Get recommendations from undeployed items in this category
    const recommendations = data.items
      .filter((item: QuizItem) => !responseMap.get(item.id))
      .slice(0, 2) // Top 2 recommendations
      .map((item: QuizItem) => item.advice);
    
    categoryScores.push({
      category: categoryName,
      score: data.totalScore,
      totalPossible: data.totalPossible,
      percentage,
      isUnderperforming,
      summary: categorySummaries[categoryName as keyof typeof categorySummaries] || "",
      recommendations
    });
    
    totalScore += data.totalScore;
    totalPossible += data.totalPossible;
  }

  const overallPercentage = Math.round((totalScore / totalPossible) * 100);
  
  // Get overall feedback based on score
  let feedback = overallScoreFeedback[0];
  for (const threshold of [90, 80, 70, 60, 50]) {
    if (overallPercentage >= threshold) {
      feedback = overallScoreFeedback[threshold as keyof typeof overallScoreFeedback];
      break;
    }
  }

  // Get top recommendations from weakest categories
  const weakCategories = categoryScores
    .filter(cat => cat.isUnderperforming)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);
  
  const topRecommendations = weakCategories
    .flatMap(cat => cat.recommendations.slice(0, 1))
    .slice(0, 3);

  return {
    totalScore,
    totalPossible,
    overallPercentage,
    categoryScores,
    overallFeedback: feedback.feedback,
    recommendations: topRecommendations.length > 0 ? topRecommendations : feedback.recommendations
  };
}
