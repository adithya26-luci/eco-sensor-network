import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/sonner';

const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [organization, setOrganization] = useState('ECOVATE Network');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');

  const handleSaveProfile = () => {
    if (user && name) {
      updateProfile(name, profilePicture);
      toast.success('Profile updated successfully');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your ECOVATE Network
        </p>
      </div>
      
      <div className="grid gap-6 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profilePicture} />
                  <AvatarFallback className="text-lg">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : <User className="h-8 w-8" />}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 bg-eco-green rounded-full p-2 cursor-pointer hover:bg-eco-green/80">
                  <Camera className="h-4 w-4 text-white" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input 
                id="organization" 
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
            
            <Button onClick={handleSaveProfile} className="mt-2 bg-eco-green hover:bg-eco-green/90">
              Save Changes
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Manage your API keys and webhooks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex">
                <Input id="apiKey" defaultValue="sk_eco_*****************" readOnly className="font-mono" />
                <Button variant="outline" className="ml-2 whitespace-nowrap">Reveal</Button>
                <Button variant="outline" className="ml-2 whitespace-nowrap">Regenerate</Button>
              </div>
              <p className="text-sm text-slate-500">Use this key to authenticate API requests</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook">Webhook URL</Label>
              <Input id="webhook" placeholder="https://your-service.com/webhook" />
              <p className="text-sm text-slate-500">Receive real-time updates when data changes</p>
            </div>
            
            <Button className="mt-2">Save Configuration</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure how you receive alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Alerts</div>
                <div className="text-sm text-slate-500">Receive critical alerts via email</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Daily Reports</div>
                <div className="text-sm text-slate-500">Receive daily summary reports</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Sensor Offline Notifications</div>
                <div className="text-sm text-slate-500">Get notified when sensors go offline</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">CO₂ Threshold Alerts</div>
                <div className="text-sm text-slate-500">Alert when CO₂ exceeds safe levels</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
