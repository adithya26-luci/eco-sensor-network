
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
    
    // Page-specific responses
    if (pathname === '/sensors') {
      if (input.includes('offline') || input.includes('not working')) {
        return 'To troubleshoot offline sensors: 1) Check the sensor status in the list, 2) Verify network connectivity, 3) Check power supply, 4) Contact support if issues persist. You can also enable notifications for sensor offline alerts in Settings.';
      } else if (input.includes('add') || input.includes('new sensor')) {
        return 'To add a new sensor, click the "Add Sensor" button on the sensors page. You\'ll need to provide the sensor ID, location, and configure its monitoring settings.';
      }
    } else if (pathname === '/analytics') {
      if (input.includes('chart') || input.includes('graph')) {
        return 'The analytics charts show CO₂ trends over time. Hover over data points for specific values, use the time range selector to adjust the view, and download reports using the export button.';
      } else if (input.includes('export') || input.includes('download')) {
        return 'You can export your analytics data in CSV or PDF format using the export buttons above the charts. This includes historical data, trends, and summary reports.';
      }
    } else if (pathname === '/map') {
      if (input.includes('location') || input.includes('sensor location')) {
        return 'Sensors are displayed as colored markers on the map. Green indicates normal levels, yellow shows moderate levels, and red indicates high CO₂ concentrations. Click on any marker for detailed information.';
      }
    } else if (pathname === '/settings') {
      if (input.includes('api')) {
        return 'Your API key is in the API Configuration section. Use the reveal button to show it, and you can regenerate it if needed. Remember to update any applications using the old key.';
      } else if (input.includes('notification')) {
        return 'You can configure email alerts, daily reports, and threshold notifications in the Notification Preferences section. Toggle each option based on your needs.';
      }
    }
    
    // General responses
    if (input.includes('co2') || input.includes('carbon')) {
      return 'I can help you with CO₂ monitoring! Our sensors track carbon dioxide levels in real-time. You can view current readings on the dashboard, check historical data in analytics, or see geographical patterns on the map.';
    } else if (input.includes('sensor')) {
      return 'Our sensor network monitors environmental parameters continuously. Visit the Sensors page to manage devices, check their status, and configure alerts for when they go offline.';
    } else if (input.includes('dashboard')) {
      return 'The dashboard shows your key metrics: current CO₂ levels, sensor status, carbon offset progress, and recent trends. Each card provides insights into different aspects of your environmental monitoring.';
    } else if (input.includes('help') || input.includes('support')) {
      return 'I\'m here to help! I can assist with navigation, explain features, troubleshoot issues, and guide you through using ECOVATE. What specific area would you like help with?';
    } else {
      return 'Thanks for your message! I can help you with CO₂ monitoring, sensor management, analytics interpretation, map navigation, and system settings. What would you like to know more about?';
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
