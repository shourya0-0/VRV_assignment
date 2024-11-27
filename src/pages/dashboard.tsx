import { useState } from 'react';
import { Users, Shield, Key, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserManagement } from '@/components/user-management';
import { RoleManagement } from '@/components/role-management';
import { PermissionManagement } from '@/components/permission-management';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Navbar } from '@/components/layout/navbar';

const tabs = [
  { id: 'users', label: 'Users', icon: Users, component: UserManagement },
  { id: 'roles', label: 'Roles', icon: Shield, component: RoleManagement },
  {
    id: 'permissions',
    label: 'Permissions',
    icon: Key,
    component: PermissionManagement,
  },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-8">
        <Settings className="h-6 w-6" />
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start gap-2 transition-all duration-200',
              activeTab === tab.id && 'bg-secondary'
            )}
            onClick={() => {
              setActiveTab(tab.id);
              if (!isDesktop) setIsSidebarOpen(false);
            }}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Menu Button */}
        {!isDesktop && (
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <Sidebar />
            </SheetContent>
          </Sheet>
        )}

        {/* Desktop Sidebar */}
        {isDesktop && (
          <div className="w-64 bg-card border-r border-border p-4">
            <Sidebar />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}