import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Drawer } from '../ui/drawer';

export const AppShell: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080c14] text-slate-100 antialiased">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Slide-over Drawer */}
      <Drawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        side="left"
        className="w-72 bg-[#0b101b] p-0"
      >
        <Sidebar
          isCollapsed={false}
          onToggleCollapse={() => setIsMobileDrawerOpen(false)}
          onNavigate={() => setIsMobileDrawerOpen(false)}
          className="border-none h-full w-full"
        />
      </Drawer>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-full overflow-hidden min-w-0">
        <Topbar onOpenMobileMenu={() => setIsMobileDrawerOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#080c14]">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
