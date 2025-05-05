
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSensors } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusIcon, RefreshCwIcon, LinkIcon, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import InvestmentDialog from '@/components/InvestmentDialog';

const SensorsPage: React.FC = () => {
  const [selectedSensor, setSelectedSensor] = useState<{ id: string; name: string } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleInvestClick = (sensorId: string, sensorName: string) => {
    setSelectedSensor({ id: sensorId, name: sensorName });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sensors</h1>
          <p className="text-muted-foreground">Manage and monitor your sensor network</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Sensor
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mockSensors.map((sensor) => (
          <Card key={sensor.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{sensor.name}</CardTitle>
                  <CardDescription>{sensor.location.name}</CardDescription>
                </div>
                <Badge 
                  variant={sensor.status === 'online' ? 'default' : 
                          sensor.status === 'maintenance' ? 'secondary' : 'outline'}
                  className={sensor.status === 'online' ? 'bg-eco-green' : ''}
                >
                  {sensor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-slate-500">Sensor ID:</div>
                  <div className="font-mono">{sensor.id}</div>
                  
                  <div className="text-slate-500">Last Reading:</div>
                  <div className="font-medium">
                    {sensor.status === 'online' ? `${sensor.lastReading.co2} PPM` : 'N/A'}
                  </div>
                  
                  <div className="text-slate-500">Last Update:</div>
                  <div>
                    {new Date(sensor.lastReading.timestamp).toLocaleString()}
                  </div>
                  
                  <div className="text-slate-500">Coordinates:</div>
                  <div className="font-mono text-xs truncate">
                    {sensor.location.lat.toFixed(4)}, {sensor.location.lng.toFixed(4)}
                  </div>
                  
                  <div className="text-slate-500">Projects:</div>
                  <div className="flex items-center gap-2">
                    <Link to="/analytics" className="text-eco-green hover:underline flex items-center">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      View Projects
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-6 px-2 text-xs bg-eco-teal text-white hover:bg-eco-teal/90"
                      onClick={() => handleInvestClick(sensor.id, sensor.name)}
                    >
                      <Coins className="h-3 w-3 mr-1" />
                      Invest
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedSensor && (
        <InvestmentDialog 
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          sensorName={selectedSensor.name}
          projectName={`Carbon Offset Project ${selectedSensor.id.substring(0, 4)}`}
        />
      )}
    </div>
  );
};

export default SensorsPage;
