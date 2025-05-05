
import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-eco-background">
      {(sidebarOpen || !isMobile) && (
        <div 
          className={`${isMobile ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : ''}`}
          onClick={isMobile ? toggleSidebar : undefined}
        >
          <div 
            className={`${isMobile ? 'w-64 absolute h-full' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {isMobile && (
          <div className="mb-4">
            <Button 
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
