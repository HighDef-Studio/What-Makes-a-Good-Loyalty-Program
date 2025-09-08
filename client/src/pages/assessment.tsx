import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, TrendingUp, RotateCcw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QuizItem, QuizResponse, QuizResult, CategoryScore } from "@shared/schema";
import { categoryOrder } from "@shared/quizData";

export default function Assessment() {
  const [responses, setResponses] = useState<Map<string, boolean>>(new Map());
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch quiz items
  const { data: itemsData, isLoading } = useQuery<{ items: QuizItem[] }>({
    queryKey: ['/api/quiz/items']
  });

  // Submit assessment mutation
  const submitMutation = useMutation({
    mutationFn: async (responses: QuizResponse[]) => {
      const response = await fetch('/api/quiz/assess', {
        method: 'POST',
        body: JSON.stringify({ responses }),
        headers: { 'Content-Type': 'application/json' }
      });
      return response.json();
    },
    onSuccess: (data: any) => {
      setResult(data.assessment.result);
      setShowResults(true);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process assessment. Please try again.",
        variant: "destructive",
      });
    }
  });

  const quizItems = itemsData?.items || [];
  
  // Group items by category in the specified order
  const groupedItems = categoryOrder.reduce((acc, category) => {
    acc[category] = quizItems.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, QuizItem[]>);

  const categories = Object.keys(groupedItems);
  const currentCategoryItems = groupedItems[categories[currentCategory]] || [];
  const totalCategories = categories.length;

  // Calculate progress
  const totalItems = quizItems.length;
  const answeredItems = responses.size;
  const progressPercentage = totalItems > 0 ? (answeredItems / totalItems) * 100 : 0;

  const handleResponse = (itemId: string, deployed: boolean) => {
    const newResponses = new Map(responses);
    newResponses.set(itemId, deployed);
    setResponses(newResponses);
  };

  const canProceedToNext = currentCategoryItems.every(item => responses.has(item.id));
  const canSubmit = answeredItems === totalItems;

  const handleNext = () => {
    if (currentCategory < totalCategories - 1) {
      setCurrentCategory(currentCategory + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };

  const handleSubmit = () => {
    if (canSubmit) {
      const responseArray: QuizResponse[] = Array.from(responses.entries()).map(([itemId, deployed]) => ({
        itemId,
        deployed
      }));
      submitMutation.mutate(responseArray);
    }
  };

  const handleRestart = () => {
    setResponses(new Map());
    setCurrentCategory(0);
    setShowResults(false);
    setResult(null);
  };

  const generateReport = () => {
    if (!result) return;
    
    const reportContent = `
LOYALTY PROGRAM MATURITY ASSESSMENT REPORT
==========================================

Overall Score: ${result.overallPercentage}%
Total Score: ${result.totalScore}/${result.totalPossible}

${result.overallFeedback}

CATEGORY BREAKDOWN:
${result.categoryScores.map(cat => `
${cat.category}: ${cat.percentage}% ${cat.isUnderperforming ? '(Needs Improvement)' : ''}
${cat.summary}

Recommendations:
${cat.recommendations.map(rec => `• ${rec}`).join('\n')}
`).join('\n')}

TOP RECOMMENDATIONS:
${result.recommendations.map(rec => `• ${rec}`).join('\n')}
`;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loyalty-assessment-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#F05E5E] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="bg-white border-b border-gray-200 pb-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Loyalty Program Maturity Assessment
                    </h1>
                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                      A comprehensive evaluation of your customer loyalty program across 8 key categories
                    </p>
                  </div>
                  
                </div>
              </div>
                
              {/* Progress */}
              <div className="max-w-md mx-auto mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{answeredItems} of {totalItems} completed</span>
                  </div>
                  <Progress value={progressPercentage} className="progress-custom h-3" />
              </div>

              {/* Category Navigation */}
              <div className="grid grid-cols-4 gap-2 mb-8 max-w-4xl mx-auto">
                  {categories.map((category, index) => {
                    const categoryItems = groupedItems[category] || [];
                    const categoryCompleted = categoryItems.every(item => responses.has(item.id));
                    
                    return (
                      <button
                        key={category}
                        onClick={() => setCurrentCategory(index)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          index === currentCategory
                            ? 'bg-gray-700 text-white'
                            : categoryCompleted
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        style={{ fontFamily: 'Lato, sans-serif' }}
                      >
                        {category}
                      </button>
                    );
                  })}
              </div>

              {/* Current Category */}
              <div className="max-w-4xl mx-auto">
                <Card className="modern-card mb-6">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {categories[currentCategory]}
                    </CardTitle>
                    <p className="text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Category {currentCategory + 1} of {totalCategories}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentCategoryItems.map((item) => (
                      <Card key={item.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>
                                {item.title}
                              </h3>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button
                                variant={responses.get(item.id) === true ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleResponse(item.id, true)}
                                className={responses.get(item.id) === true ? "bg-[#F05E5E] hover:bg-[#E04E4E]" : ""}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Yes
                              </Button>
                              <Button
                                variant={responses.get(item.id) === false ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleResponse(item.id, false)}
                                className={responses.get(item.id) === false ? "bg-gray-600 hover:bg-gray-700" : ""}
                              >
                                <Circle className="h-4 w-4 mr-1" />
                                No
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentCategory === 0}
                  >
                    Previous Category
                  </Button>
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-600">
                      {canProceedToNext ? '✓' : `${currentCategoryItems.filter(item => responses.has(item.id)).length}/${currentCategoryItems.length}`} questions answered
                    </span>
                  </div>

                  {currentCategory < totalCategories - 1 ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceedToNext}
                      className="bg-[#F05E5E] hover:bg-[#E04E4E]"
                    >
                      Next Category
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!canSubmit || submitMutation.isPending}
                      className="bg-[#00CECB] hover:bg-[#00B8B5]"
                    >
                      {submitMutation.isPending ? "Processing..." : "Complete Assessment"}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Results */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Your Loyalty Program Assessment Results
                </h1>
                
                {/* Overall Score */}
                <Card className="modern-card max-w-2xl mx-auto mb-8">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl font-bold text-[#F05E5E] mb-2">
                      {result?.overallPercentage}%
                    </div>
                    <p className="text-xl text-gray-700 mb-4" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Overall Maturity Score
                    </p>
                    <p className="text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {result?.overallFeedback}
                    </p>
                  </CardContent>
                </Card>

                {/* Category Breakdown */}
                <div className="max-w-6xl mx-auto mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Category Breakdown
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {result?.categoryScores.map((category) => (
                      <Card key={category.category} className={`modern-card ${category.isUnderperforming ? 'border-l-4 border-l-[#F05E5E]' : 'border-l-4 border-l-green-500'}`}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Lato, sans-serif' }}>
                              {category.category}
                            </CardTitle>
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${category.isUnderperforming ? 'text-[#F05E5E]' : 'text-green-600'}`}>
                                {category.percentage}%
                              </div>
                              {category.isUnderperforming && (
                                <span className="text-xs text-[#F05E5E] font-medium">Needs Improvement</span>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
                            {category.summary}
                          </p>
                          
                          {category.recommendations.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-sm text-gray-800 mb-2">Recommendations:</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {category.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <TrendingUp className="h-3 w-3 mt-1 text-[#F05E5E] flex-shrink-0" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Top Recommendations */}
                {result?.recommendations && result.recommendations.length > 0 && (
                  <Card className="modern-card max-w-4xl mx-auto mb-8">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Priority Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="bg-[#F05E5E] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-gray-700" style={{ fontFamily: 'Lato, sans-serif' }}>
                              {rec}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={() => window.open('https://highdef.studio/contact', '_blank')}
                    className="bg-[#00CECB] hover:bg-[#00B8B5] text-white"
                  >
                    Contact Us
                  </Button>
                  <Button
                    onClick={handleRestart}
                    variant="outline"
                    className="border-[#F05E5E] text-[#F05E5E] hover:bg-[#F05E5E] hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Take Assessment Again
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}