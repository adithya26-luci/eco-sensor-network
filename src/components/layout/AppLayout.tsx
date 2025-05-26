
import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@/contexts/UserContext';
import AuthDialog from '@/components/auth/AuthDialog';
import UserMenu from '@/components/auth/UserMenu';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { isAuthenticated } = useUser();
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
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'} mb-4`}>
          {isMobile && (
            <Button 
              variant="outline"
              size="icon"
              className="h-10 w-10 self-start"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          )}
          <div className={`${isMobile ? 'self-end' : 'ml-auto'}`}>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button 
                onClick={() => setAuthDialogOpen(true)}
                className="bg-eco-green hover:bg-eco-green/90"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
        {children}
      </main>
      
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />
    </div>
  );
};

export default AppLayout;
