import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Brain, Calendar, AlertCircle, Target } from 'lucide-react';

interface PredictionData {
  date: string;
  actual?: number;
  predicted: number;
  confidence: number;
  lower_bound: number;
  upper_bound: number;
}

interface PredictiveAnalyticsProps {
  historicalData?: any[];
  timeframe?: '7d' | '30d' | '90d';
  metric?: 'co2' | 'emissions' | 'energy';
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ 
  historicalData = [], 
  timeframe = '30d',
  metric = 'co2'
}) => {
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [insights, setInsights] = useState<any[]>([]);

  useEffect(() => {
    generatePredictions();
  }, [historicalData, selectedTimeframe, metric]);

  const generatePredictions = async () => {
    setIsLoading(true);
    
    // Simulate AI model processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate realistic prediction data
    const futureDays = selectedTimeframe === '7d' ? 7 : selectedTimeframe === '30d' ? 30 : 90;
    const baseValue = historicalData.length > 0 ? historicalData[historicalData.length - 1]?.value || 400 : 400;
    
    const predictionData: PredictionData[] = [];
    
    // Add historical data points
    const recentHistory = historicalData.slice(-10).map((item, index) => ({
      date: new Date(Date.now() - (10 - index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      actual: item.value || baseValue + (Math.random() - 0.5) * 50,
      predicted: item.value || baseValue + (Math.random() - 0.5) * 50,
      confidence: 0.95,
      lower_bound: (item.value || baseValue) * 0.9,
      upper_bound: (item.value || baseValue) * 1.1
    }));
    
    predictionData.push(...recentHistory);
    
    // Generate future predictions
    for (let i = 1; i <= futureDays; i++) {
      const date = new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      // Simple trend-based prediction with some randomness
      const trendFactor = 1 + (Math.random() - 0.5) * 0.1; // ±5% trend
      const seasonalFactor = 1 + Math.sin(i / 7) * 0.05; // Weekly seasonality
      const predicted = baseValue * trendFactor * seasonalFactor;
      
      // Confidence decreases over time
      const confidence = Math.max(0.3, 0.95 - (i / futureDays) * 0.4);
      
      predictionData.push({
        date,
        predicted,
        confidence,
        lower_bound: predicted * (1 - (1 - confidence) * 0.5),
        upper_bound: predicted * (1 + (1 - confidence) * 0.5)
      });
    }
    
    setPredictions(predictionData);
    generateInsights(predictionData);
    setIsLoading(false);
  };

  const generateInsights = (data: PredictionData[]) => {
    const futureData = data.filter(d => !d.actual);
    const futureDays = selectedTimeframe === '7d' ? 7 : selectedTimeframe === '30d' ? 30 : 90;
    const currentValue = data[data.length - futureDays - 1]?.actual || 400;
    const futureValue = futureData[futureData.length - 1]?.predicted || 400;
    
    const trend = ((futureValue - currentValue) / currentValue) * 100;
    const avgConfidence = futureData.reduce((sum, d) => sum + d.confidence, 0) / futureData.length;
    
    const newInsights = [
      {
        type: trend > 0 ? 'warning' : 'positive',
        title: `${Math.abs(trend).toFixed(1)}% ${trend > 0 ? 'Increase' : 'Decrease'} Expected`,
        description: `AI models predict ${metric.toUpperCase()} levels will ${trend > 0 ? 'rise' : 'fall'} over the next ${selectedTimeframe}.`,
        confidence: avgConfidence,
        icon: trend > 0 ? TrendingUp : TrendingDown
      },
      {
        type: 'info',
        title: 'Peak Period Forecast',
        description: 'Highest levels expected during weekdays 9-11 AM based on historical patterns.',
        confidence: 0.78,
        icon: Calendar
      },
      {
        type: avgConfidence > 0.7 ? 'positive' : 'warning',
        title: `Model Confidence: ${(avgConfidence * 100).toFixed(0)}%`,
        description: `Prediction accuracy ${avgConfidence > 0.7 ? 'is high' : 'decreases'} for longer time horizons.`,
        confidence: avgConfidence,
        icon: Brain
      }
    ];
    
    setInsights(newInsights);
  };

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium">{label}</p>
          {data.actual !== undefined && (
            <p className="text-blue-600">Actual: {data.actual.toFixed(1)} ppm</p>
          )}
          <p className="text-purple-600">Predicted: {data.predicted.toFixed(1)} ppm</p>
          <p className="text-gray-500 text-sm">Confidence: {(data.confidence * 100).toFixed(0)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Predictive Analytics
        </CardTitle>
        <div className="flex gap-2 mt-4">
          {(['7d', '30d', '90d'] as const).map((period) => (
            <Button
              key={period}
              variant={selectedTimeframe === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-100 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-500">
              <Brain className="h-4 w-4 inline mr-2" />
              AI is analyzing patterns and generating predictions...
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Prediction Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={predictions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Confidence bands */}
                  <Area
                    dataKey="upper_bound"
                    stroke="none"
                    fill="url(#confidence)"
                    fillOpacity={0.1}
                  />
                  <Area
                    dataKey="lower_bound"
                    stroke="none"
                    fill="white"
                    fillOpacity={1}
                  />
                  
                  {/* Actual data line */}
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 3 }}
                    connectNulls={false}
                  />
                  
                  {/* Predicted data line */}
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#8b5cf6', r: 2 }}
                  />
                  
                  <defs>
                    <linearGradient id="confidence" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Actual Data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded border-dashed border"></div>
                <span>AI Predictions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-200 rounded"></div>
                <span>Confidence Interval</span>
              </div>
            </div>

            {/* AI Insights */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Target className="h-4 w-4" />
                AI-Generated Insights
              </h4>
              
              {insights.map((insight, index) => (
                <div key={index} className={`border rounded-lg p-3 ${getInsightTypeColor(insight.type)}`}>
                  <div className="flex items-start gap-3">
                    <insight.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h5 className="font-medium text-sm mb-1">{insight.title}</h5>
                      <p className="text-xs opacity-80">{insight.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs">Confidence:</span>
                        <Progress value={insight.confidence * 100} className="h-1 w-16" />
                        <span className="text-xs">{Math.round(insight.confidence * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              onClick={generatePredictions} 
              className="w-full"
              disabled={isLoading}
            >
              <Brain className="h-4 w-4 mr-2" />
              Regenerate Predictions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictiveAnalytics;