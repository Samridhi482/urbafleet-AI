import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Shield,
  HelpCircle,
  Activity,
  Terminal,
} from 'lucide-react';
import { Avatar } from '../ui/avatar';
import { Dropdown, DropdownItem } from '../ui/dropdown';
import { Button } from '../ui/button';
import { CommandPalette } from '../shared/CommandPalette';
import { NotificationCenter } from '../shared/NotificationCenter';

export interface TopbarProps {
  onOpenMobileMenu: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const getPageTitle = (path: string): string => {
    switch (path) {
      case '/overview':
      case '/':
        return 'Operations Overview';
      case '/live-map':
        return 'Live Intelligence Map';
      case '/roads':
        return 'Road & Pothole Intelligence';
      case '/traffic':
        return 'Traffic Intelligence';
      case '/constituency':
        return 'Constituency Insights';
      case '/safe-routes':
        return 'Safe Route Comparison';
      case '/reports':
        return 'Citizen Reports';
      case '/alerts':
        return 'Active System Alerts';
      case '/operations':
        return 'Road-Fix Operations';
      case '/assistant':
        return 'AI Mobility Assistant';
      case '/settings':
        return 'Platform Settings';
      default:
        return 'UrbanFleet Platform';
    }
  };

  const userMenuItems: DropdownItem[] = [
    {
      id: 'profile',
      label: 'Ops Controller Profile',
      icon: <User className="h-3.5 w-3.5" />,
      onClick: () => navigate('/settings'),
    },
    {
      id: 'role',
      label: 'Role: Senior Mobility Lead',
      icon: <Shield className="h-3.5 w-3.5 text-blue-400" />,
      disabled: true,
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: <Settings className="h-3.5 w-3.5" />,
      onClick: () => navigate('/settings'),
      dividerBefore: true,
    },
    {
      id: 'docs',
      label: 'Architecture Specs (Phase 1)',
      icon: <Terminal className="h-3.5 w-3.5" />,
      onClick: () => navigate('/overview'),
    },
    {
      id: 'logout',
      label: 'Sign Out (Demo Mode)',
      icon: <LogOut className="h-3.5 w-3.5" />,
      isDanger: true,
      dividerBefore: true,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-slate-800/80 bg-[#080d17]/95 px-4 sm:px-6 backdrop-blur-md">
        {/* Left: Mobile hamburger & title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2.5 truncate">
            <span className="text-xs font-semibold text-slate-200 hidden sm:inline truncate">
              {getPageTitle(location.pathname)}
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-950/60 text-blue-400 border border-blue-800/40">
              <Activity className="h-3 w-3" />
              <span>Telemetry Connected</span>
            </span>
          </div>
        </div>

        {/* Right: Search, Alerts, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCommandOpen(true)}
            className="h-8 px-2.5 sm:px-3 text-xs bg-slate-900/80 border-slate-700/70 text-slate-400 hover:text-slate-200 hover:border-slate-600 gap-2 font-normal"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search or command...</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </Button>

          {/* Notifications Dropdown Anchor */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="h-8 w-8 relative text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-slate-900 animate-pulse" />
            </Button>
            <NotificationCenter
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </div>

          {/* User Profile Avatar Dropdown */}
          <Dropdown
            align="right"
            items={userMenuItems}
            trigger={
              <div className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800/60 transition-colors">
                <Avatar
                  fallback="UF"
                  size="sm"
                  status="online"
                  className="cursor-pointer"
                />
                <div className="hidden xl:flex flex-col text-left leading-tight">
                  <span className="text-xs font-medium text-slate-200">Ops Controller</span>
                  <span className="text-[10px] text-slate-500">Central Metro HQ</span>
                </div>
              </div>
            }
          />
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
