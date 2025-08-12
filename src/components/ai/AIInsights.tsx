import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Lightbulb, AlertTriangle, Leaf } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
}

interface AIInsightsProps {
  co2Data?: number[];
  userActivities?: any[];
  sensorData?: any[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ co2Data = [], userActivities = [], sensorData = [] }) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateAIInsights();
  }, [co2Data, userActivities, sensorData]);

  const generateAIInsights = async () => {
    setIsLoading(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedInsights: AIInsight[] = [];

    // CO2 Trend Prediction
    if (co2Data.length >= 5) {
      const trend = analyzeTrend(co2Data);
      generatedInsights.push({
        id: '1',
        type: 'prediction',
        title: 'CO₂ Level Forecast',
        description: `Based on recent patterns, CO₂ levels are expected to ${trend.direction} by ${trend.percentage}% in the next 7 days.`,
        confidence: trend.confidence,
        impact: trend.direction === 'increase' ? 'high' : 'medium',
        category: 'Environmental'
      });
    }

    // Smart Recommendations
    if (userActivities.length > 0) {
      const recommendation = generateSmartRecommendation(userActivities);
      generatedInsights.push({
        id: '2',
        type: 'recommendation',
        title: 'Personalized Carbon Reduction',
        description: recommendation.description,
        confidence: recommendation.confidence,
        impact: 'high',
        category: 'Action'
      });
    }

    // Sensor Anomaly Detection
    if (sensorData.length > 0) {
      const anomaly = detectAnomalies(sensorData);
      if (anomaly.found) {
        generatedInsights.push({
          id: '3',
          type: 'alert',
          title: 'Sensor Anomaly Detected',
          description: anomaly.description,
          confidence: anomaly.confidence,
          impact: 'medium',
          category: 'Technical'
        });
      }
    }

    // Energy Optimization
    generatedInsights.push({
      id: '4',
      type: 'optimization',
      title: 'Energy Efficiency Opportunity',
      description: 'Installing smart thermostats could reduce your carbon footprint by 15-20% based on your usage patterns.',
      confidence: 0.78,
      impact: 'high',
      category: 'Efficiency'
    });

    // Carbon Credit Opportunity
    generatedInsights.push({
      id: '5',
      type: 'recommendation',
      title: 'Carbon Credit Investment',
      description: 'Based on your emissions profile, investing in reforestation projects would offset 85% of your monthly footprint.',
      confidence: 0.82,
      impact: 'medium',
      category: 'Investment'
    });

    setInsights(generatedInsights);
    setIsLoading(false);
  };

  const analyzeTrend = (data: number[]) => {
    const recent = data.slice(-5);
    const older = data.slice(-10, -5);
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
    
    const change = ((recentAvg - olderAvg) / olderAvg) * 100;
    
    return {
      direction: change > 0 ? 'increase' : 'decrease',
      percentage: Math.abs(change).toFixed(1),
      confidence: Math.min(0.9, 0.6 + (Math.abs(change) / 100))
    };
  };

  const generateSmartRecommendation = (activities: any[]) => {
    const highImpactActivities = ['car-travel', 'air-travel', 'electricity'];
    const userHighImpact = activities.filter(a => highImpactActivities.includes(a.type));
    
    if (userHighImpact.length > 0) {
      return {
        description: `Focus on reducing ${userHighImpact[0].type.replace('-', ' ')} - it represents 60% of your carbon footprint. Consider alternatives like public transport or electric vehicles.`,
        confidence: 0.85
      };
    }
    
    return {
      description: 'Consider implementing a home energy audit to identify the most impactful reduction opportunities.',
      confidence: 0.72
    };
  };

  const detectAnomalies = (sensors: any[]) => {
    // Simulate anomaly detection
    const randomAnomaly = Math.random() > 0.7;
    
    if (randomAnomaly) {
      return {
        found: true,
        description: 'Sensor #3 showing irregular readings - possible calibration needed or environmental interference detected.',
        confidence: 0.75
      };
    }
    
    return { found: false, description: '', confidence: 0 };
  };

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction':
        return <TrendingUp className="h-4 w-4" />;
      case 'recommendation':
        return <Lightbulb className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      case 'optimization':
        return <Leaf className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: AIInsight['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction':
        return 'bg-blue-100 text-blue-800';
      case 'recommendation':
        return 'bg-purple-100 text-purple-800';
      case 'alert':
        return 'bg-orange-100 text-orange-800';
      case 'optimization':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI-Powered Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
            <div className="text-center text-sm text-gray-500 mt-4">
              AI is analyzing your data...
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className={getTypeColor(insight.type)}>
                      {insight.type}
                    </Badge>
                    <Badge variant="secondary" className={getImpactColor(insight.impact)}>
                      {insight.impact} impact
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Confidence:</span>
                    <div className="w-16 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-purple-600 rounded"
                        style={{ width: `${insight.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{Math.round(insight.confidence * 100)}%</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {insight.category}
                  </Badge>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={generateAIInsights} 
              className="w-full mt-4"
              disabled={isLoading}
            >
              <Brain className="h-4 w-4 mr-2" />
              Refresh AI Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsights;