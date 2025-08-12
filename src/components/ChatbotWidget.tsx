
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, User, X, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotWidgetProps {
  onClose: () => void;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onClose }) => {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getWelcomeMessage(location.pathname),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function getWelcomeMessage(pathname: string): string {
    switch (pathname) {
      case '/':
        return 'Hello! I\'m your ECOVATE AI assistant. I can help you understand your dashboard metrics, CO₂ readings, and carbon offset progress. What would you like to know?';
      case '/sensors':
        return 'Hi! I\'m here to help with sensor management. I can assist with sensor status, troubleshooting offline sensors, and understanding sensor data. How can I help?';
      case '/map':
        return 'Welcome! I can help you navigate the sensor map, understand location data, and interpret geographical CO₂ patterns. What would you like to explore?';
      case '/analytics':
        return 'Hello! I\'m here to help you understand your analytics data, trends, and reports. I can explain charts, metrics, and help you make sense of your environmental data.';
      case '/settings':
        return 'Hi! I can help you with account settings, API configuration, notifications, and profile management. What settings would you like to adjust?';
      default:
        return 'Hello! I\'m your ECOVATE AI assistant. How can I help you today?';
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText, location.pathname),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string, pathname: string): string => {
    const input = userInput.toLowerCase();
    
    // AI and Machine Learning responses
    if (input.includes('ai') || input.includes('artificial intelligence') || input.includes('machine learning')) {
      return 'Our AI-powered features include predictive analytics for CO₂ trends, personalized carbon reduction recommendations, anomaly detection for sensors, and smart insights based on your usage patterns. Check the AI Insights tab on your dashboard!';
    } else if (input.includes('prediction') || input.includes('forecast')) {
      return 'Our AI models analyze historical data to predict future CO₂ levels, energy consumption patterns, and carbon offset opportunities. Predictions include confidence intervals and are updated regularly. Visit the Predictions tab for detailed forecasts.';
    } else if (input.includes('recommendation') || input.includes('suggest')) {
      return 'AI generates personalized recommendations based on your carbon footprint, location, and behavior patterns. These include transport alternatives, energy efficiency tips, and investment opportunities. Check the Smart Tips tab!';
    } else if (input.includes('insight') || input.includes('analysis')) {
      return 'AI continuously analyzes your environmental data to provide actionable insights. This includes trend detection, anomaly alerts, optimization opportunities, and impact predictions. All insights include confidence scores.';
    }
    
    // Page-specific responses
    if (pathname === '/sensors') {
      if (input.includes('offline') || input.includes('not working')) {
        return 'Our AI can detect sensor anomalies and predict failures before they happen. To troubleshoot: 1) Check AI alerts for sensor health predictions, 2) Verify network connectivity, 3) Check power supply, 4) Review anomaly detection reports.';
      } else if (input.includes('add') || input.includes('new sensor')) {
        return 'To add a new sensor, click "Add Sensor" and our AI will help optimize placement based on your location and existing sensor network for maximum coverage and accuracy.';
      }
    } else if (pathname === '/analytics') {
      if (input.includes('chart') || input.includes('graph')) {
        return 'Analytics charts now include AI-powered trend analysis, predictive overlays, and smart annotations. Hover over data points for AI-generated insights, confidence intervals, and future projections.';
      } else if (input.includes('export') || input.includes('download')) {
        return 'Export includes raw data plus AI insights, predictions, and recommendations. Available formats: CSV with AI annotations, PDF reports with predictive analysis, and JSON with full AI metadata.';
      }
    } else if (pathname === '/map') {
      if (input.includes('location') || input.includes('sensor location')) {
        return 'The map uses AI to identify optimal sensor placement, predict pollution hotspots, and recommend coverage improvements. AI-powered heat maps show predicted CO₂ concentrations and trend patterns.';
      }
    } else if (pathname === '/settings') {
      if (input.includes('api')) {
        return 'API access includes endpoints for AI predictions, recommendations, and insights. Use the AI API to integrate our machine learning capabilities into your applications.';
      } else if (input.includes('notification')) {
        return 'AI-powered notifications include smart alerts based on prediction confidence, personalized timing, and contextual relevance. Configure AI alert sensitivity in notification preferences.';
      }
    }
    
    // General responses
    if (input.includes('co2') || input.includes('carbon')) {
      return 'Our AI continuously monitors CO₂ patterns, predicts future levels, and suggests optimal reduction strategies. The system learns from your data to provide increasingly accurate forecasts and personalized recommendations.';
    } else if (input.includes('sensor')) {
      return 'AI monitors sensor health, predicts maintenance needs, and optimizes data collection patterns. Smart algorithms detect anomalies, calibration drift, and network optimization opportunities.';
    } else if (input.includes('dashboard')) {
      return 'The dashboard features AI-powered insights including predictive analytics, smart recommendations, trend analysis, and personalized optimization suggestions. Each metric includes AI-generated context and forecasts.';
    } else if (input.includes('help') || input.includes('support')) {
      return 'I\'m your AI assistant powered by advanced machine learning! I can help with predictions, recommendations, data analysis, and explaining our AI features. What would you like to explore?';
    } else {
      return 'I\'m enhanced with AI capabilities! I can help with predictive analytics, smart recommendations, anomaly detection, and optimization strategies. Try asking about AI insights, predictions, or personalized tips!';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 h-96 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Bot className="h-4 w-4 mr-2 text-eco-green" />
            ECOVATE Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-80">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-eco-green text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="h-3 w-3 mt-0.5 text-eco-green" />
                    )}
                    {message.sender === 'user' && (
                      <User className="h-3 w-3 mt-0.5 text-white" />
                    )}
                    <span>{message.text}</span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-2 rounded-lg text-sm">
                  <Bot className="h-3 w-3 animate-pulse text-eco-green" />
                  <span className="ml-2">Typing...</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                size="sm"
                className="bg-eco-green hover:bg-eco-green/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotWidget;
