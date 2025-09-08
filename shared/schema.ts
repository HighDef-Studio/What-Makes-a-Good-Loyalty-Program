import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Quiz data structures
export interface QuizItem {
  id: string;
  category: string;
  title: string;
  description: string;
  weightedPoints: number;
  advice: string;
}

export interface QuizResponse {
  itemId: string;
  deployed: boolean;
}

export interface CategoryScore {
  category: string;
  score: number;
  totalPossible: number;
  percentage: number;
  isUnderperforming: boolean;
  summary: string;
  recommendations: string[];
}

export interface QuizResult {
  totalScore: number;
  totalPossible: number;
  overallPercentage: number;
  categoryScores: CategoryScore[];
  overallFeedback: string;
  recommendations: string[];
}

export const quizAssessments = pgTable("quiz_assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  responses: jsonb("responses").$type<QuizResponse[]>().notNull(),
  result: jsonb("result").$type<QuizResult>().notNull(),
  completedAt: text("completed_at").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuizAssessmentSchema = z.object({
  responses: z.array(z.object({
    itemId: z.string(),
    deployed: z.boolean()
  })),
  result: z.object({
    totalScore: z.number(),
    totalPossible: z.number(), 
    overallPercentage: z.number(),
    categoryScores: z.array(z.object({
      category: z.string(),
      score: z.number(),
      totalPossible: z.number(),
      percentage: z.number(),
      isUnderperforming: z.boolean(),
      summary: z.string(),
      recommendations: z.array(z.string())
    })),
    overallFeedback: z.string(),
    recommendations: z.array(z.string())
  })
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertQuizAssessment = z.infer<typeof insertQuizAssessmentSchema>;
export type QuizAssessment = typeof quizAssessments.$inferSelect;
