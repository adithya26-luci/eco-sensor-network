import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, Target, Star, ChevronRight, Sparkles } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'energy' | 'waste' | 'consumption' | 'investment';
  impact: number; // CO2 reduction in kg
  effort: 'low' | 'medium' | 'high';
  cost: 'free' | 'low' | 'medium' | 'high';
  timeframe: string;
  priority: number;
  aiGenerated: boolean;
}

interface SmartRecommendationsProps {
  userProfile?: any;
  emissionData?: any[];
  currentLocation?: string;
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({ 
  userProfile, 
  emissionData = [], 
  currentLocation = 'Unknown' 
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generatePersonalizedRecommendations();
  }, [userProfile, emissionData, currentLocation]);

  const generatePersonalizedRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const baseRecommendations: Recommendation[] = [
      {
        id: '1',
        title: 'Switch to Electric Vehicle',
        description: 'Based on your 250km weekly driving pattern, an EV could reduce your transport emissions by 75%.',
        category: 'transport',
        impact: 2400,
        effort: 'high',
        cost: 'high',
        timeframe: '6 months',
        priority: 9,
        aiGenerated: true
      },
      {
        id: '2',
        title: 'Install Smart Thermostat',
        description: 'Your heating pattern suggests 20% energy savings with automated temperature control.',
        category: 'energy',
        impact: 850,
        effort: 'low',
        cost: 'low',
        timeframe: '1 week',
        priority: 8,
        aiGenerated: true
      },
      {
        id: '3',
        title: 'Solar Panel Installation',
        description: 'Your location receives optimal sunlight. Solar panels could offset 60% of your electricity emissions.',
        category: 'energy',
        impact: 1800,
        effort: 'high',
        cost: 'high',
        timeframe: '3 months',
        priority: 7,
        aiGenerated: true
      },
      {
        id: '4',
        title: 'Reduce Meat Consumption',
        description: 'Replacing 50% of meat meals with plant-based alternatives based on your diet pattern.',
        category: 'consumption',
        impact: 650,
        effort: 'medium',
        cost: 'free',
        timeframe: '1 month',
        priority: 6,
        aiGenerated: true
      },
      {
        id: '5',
        title: 'Home Insulation Upgrade',
        description: 'Your energy usage patterns indicate poor insulation. Upgrade could reduce heating needs by 30%.',
        category: 'energy',
        impact: 950,
        effort: 'medium',
        cost: 'medium',
        timeframe: '2 months',
        priority: 7,
        aiGenerated: true
      },
      {
        id: '6',
        title: 'Invest in Carbon Credits',
        description: 'Verified reforestation projects that match your offset goals and ethical preferences.',
        category: 'investment',
        impact: 500,
        effort: 'low',
        cost: 'medium',
        timeframe: '1 day',
        priority: 5,
        aiGenerated: true
      }
    ];

    // Sort by priority
    const sortedRecommendations = baseRecommendations.sort((a, b) => b.priority - a.priority);
    
    setRecommendations(sortedRecommendations);
    setIsLoading(false);
  };

  const categories = [
    { id: 'all', name: 'All', icon: Target },
    { id: 'transport', name: 'Transport', icon: Target },
    { id: 'energy', name: 'Energy', icon: Target },
    { id: 'consumption', name: 'Consumption', icon: Target },
    { id: 'investment', name: 'Investment', icon: Target },
  ];

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.category === selectedCategory);

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport': return 'bg-blue-100 text-blue-800';
      case 'energy': return 'bg-orange-100 text-orange-800';
      case 'waste': return 'bg-green-100 text-green-800';
      case 'consumption': return 'bg-purple-100 text-purple-800';
      case 'investment': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          AI-Powered Recommendations
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse border rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
            <div className="text-center text-sm text-gray-500 mt-4">
              <Sparkles className="h-4 w-4 inline mr-2" />
              Generating personalized recommendations...
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecommendations.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    {rec.aiGenerated && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, rec.priority))].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Potential CO₂ Reduction</span>
                    <span className="font-medium text-green-600">{rec.impact} kg/year</span>
                  </div>
                  <Progress value={(rec.impact / 3000) * 100} className="h-2" />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getCategoryColor(rec.category)}>
                    {rec.category}
                  </Badge>
                  <Badge variant="secondary" className={getEffortColor(rec.effort)}>
                    {rec.effort} effort
                  </Badge>
                  <Badge variant="secondary" className={getCostColor(rec.cost)}>
                    {rec.cost} cost
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {rec.timeframe}
                  </Badge>
                </div>
                
                <Button size="sm" className="w-full" variant="outline">
                  Learn More
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            ))}
            
            <div className="text-center mt-6">
              <Button 
                variant="outline" 
                onClick={generatePersonalizedRecommendations}
                disabled={isLoading}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate New Recommendations
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartRecommendations;