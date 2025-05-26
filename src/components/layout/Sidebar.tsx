
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChartIcon, GaugeIcon, MapPinIcon, LeafIcon, SettingsIcon } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', icon: <GaugeIcon className="h-5 w-5" />, path: '/' },
  { name: 'Sensors', icon: <LeafIcon className="h-5 w-5" />, path: '/sensors' },
  { name: 'Map', icon: <MapPinIcon className="h-5 w-5" />, path: '/map' },
  { name: 'Analytics', icon: <BarChartIcon className="h-5 w-5" />, path: '/analytics' },
  { name: 'Settings', icon: <SettingsIcon className="h-5 w-5" />, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-eco-green p-2 rounded-md">
            <LeafIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-eco-dark">ECOVATE</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">Carbon Offset Monitoring</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname === item.path 
                    ? "bg-eco-green text-white font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
