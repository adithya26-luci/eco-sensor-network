
import React, { useState } from 'react';
import { GaugeIcon, LeafIcon, TreePineIcon, BarChartIcon } from 'lucide-react';
import StatusCard from '@/components/dashboard/StatusCard';
import CO2Chart from '@/components/dashboard/CO2Chart';
import SensorStatus from '@/components/dashboard/SensorStatus';
import CarbonOffsetTable from '@/components/dashboard/CarbonOffsetTable';
import ProgressCard from '@/components/dashboard/ProgressCard';
import CarbonCreditsCalculator from '@/components/dashboard/CarbonCreditsCalculator';
import { mockSensors, mockOffsets, mockDashboardStats, generateHistoricalData } from '@/lib/mockData';

const Dashboard: React.FC = () => {
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
          Monitor your environmental impact and carbon offset projects.
        </p>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatusCard 
          title="Total CO₂ Reduced" 
          value={`${mockDashboardStats.totalCo2Reduced} tons`}
          icon={<LeafIcon className="h-4 w-4 text-eco-green" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatusCard 
          title="Active Sensors" 
          value={onlineSensors}
          description={`${mockSensors.length} total devices`}
          icon={<GaugeIcon className="h-4 w-4 text-eco-teal" />}
        />
        <StatusCard 
          title="Projects" 
          value={mockDashboardStats.totalProjects}
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
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CarbonCreditsCalculator />
        </div>
        <div>
          <ProgressCard 
            title="Carbon Neutral Progress"
            currentValue={mockDashboardStats.carbonNeutralProgress} 
            maxValue={100}
            unit="%"
          />
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <CarbonOffsetTable offsets={mockOffsets} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
