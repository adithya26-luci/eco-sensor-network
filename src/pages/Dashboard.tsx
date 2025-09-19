
import React, { useState } from 'react';
import { GaugeIcon, LeafIcon, TreePineIcon, BarChartIcon, Brain } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusCard from '@/components/dashboard/StatusCard';
import CO2Chart from '@/components/dashboard/CO2Chart';
import SensorStatus from '@/components/dashboard/SensorStatus';
import CarbonOffsetTable from '@/components/dashboard/CarbonOffsetTable';
import ProgressCard from '@/components/dashboard/ProgressCard';
import CarbonCreditsCalculator from '@/components/dashboard/CarbonCreditsCalculator';
import CarbonEmissionCalculator from '@/components/dashboard/CarbonEmissionCalculator';
import AIInsights from '@/components/ai/AIInsights';
import SmartRecommendations from '@/components/ai/SmartRecommendations';
import PredictiveAnalytics from '@/components/ai/PredictiveAnalytics';
import { mockSensors, generateHistoricalData } from '@/lib/mockData';
import { useUserData } from '@/contexts/UserDataContext';

const Dashboard: React.FC = () => {
  const { userData } = useUserData();
  // For demo, we'll show data from the first sensor
  const [selectedSensorId] = useState(mockSensors[0].id);
  const sensorData = generateHistoricalData(selectedSensorId);
  
  // Get counts by status
  const onlineSensors = mockSensors.filter(sensor => sensor.status === 'online').length;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Carbon Offset Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your environmental impact and carbon offset projects with AI-powered insights.
        </p>
      </div>
      
      {/* Status Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatusCard 
          title="Total CO₂ Reduced" 
          value={`${userData.dashboardStats.totalCo2Reduced} tons`}
          icon={<LeafIcon className="h-4 w-4 text-eco-green" />}
          trend={userData.dashboardStats.totalCo2Reduced > 0 ? { value: 12.5, isPositive: true } : undefined}
        />
        <StatusCard 
          title="Active Sensors" 
          value={onlineSensors}
          description={`${mockSensors.length} total devices`}
          icon={<GaugeIcon className="h-4 w-4 text-eco-teal" />}
        />
        <StatusCard 
          title="Projects" 
          value={userData.dashboardStats.totalProjects}
          icon={<TreePineIcon className="h-4 w-4 text-eco-green" />}
        />
        <StatusCard 
          title="CO₂ Current Level" 
          value={`${mockSensors[0].lastReading.co2} PPM`}
          description="Global average: 415 PPM"
          icon={<BarChartIcon className="h-4 w-4 text-eco-teal" />}
          trend={{ value: 2.3, isPositive: false }}
        />
      </div>

      {/* AI-Enhanced Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-insights">
            <Brain className="h-4 w-4 mr-2" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="recommendations">Smart Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CO2Chart 
                data={sensorData.slice(0, 48)} 
                title="CO₂ Levels (Last 48 Hours)"
                description="Parts per million (PPM)"
              />
            </div>
            <div>
              <SensorStatus sensors={mockSensors} />
            </div>
          </div>
          
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <CarbonCreditsCalculator />
            <CarbonEmissionCalculator />
          </div>
          
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CarbonOffsetTable offsets={userData.carbonOffsets} />
            </div>
            <div>
              <ProgressCard 
                title="Carbon Neutral Progress"
                currentValue={userData.dashboardStats.carbonNeutralProgress} 
                maxValue={100}
                unit="%"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIInsights 
              co2Data={sensorData.map(d => d.value)} 
              sensorData={mockSensors}
            />
            <SmartRecommendations />
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <PredictiveAnalytics 
            historicalData={sensorData}
            timeframe="30d"
            metric="co2"
          />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SmartRecommendations />
            </div>
            <div>
              <AIInsights 
                co2Data={sensorData.map(d => d.value)} 
                sensorData={mockSensors}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
