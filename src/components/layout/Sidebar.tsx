import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Construction,
  Activity,
  Landmark,
  Navigation,
  FileSpreadsheet,
  Bell,
  Wrench,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Radio,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Tooltip } from '../ui/tooltip';

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNavigate?: () => void;
  className?: string;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  badge?: string | number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  onNavigate,
  className,
}) => {
  const sections: NavSection[] = [
    {
      title: 'Main',
      items: [
        { title: 'Overview', path: '/overview', icon: <LayoutDashboard className="h-4 w-4 shrink-0" /> },
        { title: 'Live Intelligence', path: '/live-map', icon: <Map className="h-4 w-4 shrink-0" /> },
        { title: 'Road Intelligence', path: '/roads', icon: <Construction className="h-4 w-4 shrink-0" /> },
        { title: 'Traffic Intelligence', path: '/traffic', icon: <Activity className="h-4 w-4 shrink-0" /> },
        { title: 'Constituency', path: '/constituency', icon: <Landmark className="h-4 w-4 shrink-0" /> },
        { title: 'Safe Routes', path: '/safe-routes', icon: <Navigation className="h-4 w-4 shrink-0" /> },
      ],
    },
    {
      title: 'Operations',
      items: [
        { title: 'Reports', path: '/reports', icon: <FileSpreadsheet className="h-4 w-4 shrink-0" />, badge: '3 New' },
        { title: 'Alerts', path: '/alerts', icon: <Bell className="h-4 w-4 shrink-0" />, badge: 2 },
        { title: 'Operations', path: '/operations', icon: <Wrench className="h-4 w-4 shrink-0" /> },
      ],
    },
    {
      title: 'System',
      items: [
        { title: 'AI Assistant', path: '/assistant', icon: <Bot className="h-4 w-4 shrink-0" /> },
        { title: 'Settings', path: '/settings', icon: <Settings className="h-4 w-4 shrink-0" /> },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        'relative flex flex-col h-full bg-[#0b101b] border-r border-slate-800/80 transition-all duration-200 z-30 select-none',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-slate-800/80 bg-[#0b101b]">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 shrink-0">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-slate-100 truncate">UrbanFleet</span>
                <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/80 border border-blue-800/60 px-1 py-0.2 rounded">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-500 tracking-wider uppercase font-mono">Operations</span>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400">
            <ShieldAlert className="h-4 w-4" />
          </div>
        )}

        {/* Collapse toggle (desktop) */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex h-6 w-6 items-center justify-center rounded-md bg-slate-800/60 text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-colors border border-slate-700/50 cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5 scrollbar-thin">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!isCollapsed ? (
              <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
                {section.title}
              </div>
            ) : (
              <div className="h-px bg-slate-800 mx-2 my-2" />
            )}

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const navLink = (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all group relative cursor-pointer',
                        isActive
                          ? 'bg-blue-900/30 text-blue-400 border border-blue-700/40 shadow-xs font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            'transition-colors',
                            isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                          )}
                        >
                          {item.icon}
                        </span>

                        {!isCollapsed && (
                          <div className="flex flex-1 items-center justify-between min-w-0">
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <span
                                className={cn(
                                  'text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium',
                                  isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                );

                if (isCollapsed) {
                  return (
                    <Tooltip key={item.path} content={item.title} position="right">
                      {navLink}
                    </Tooltip>
                  );
                }

                return navLink;
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / System Status */}
      <div className="p-3 border-t border-slate-800/80 bg-[#080d17]">
        {!isCollapsed ? (
          <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-slate-300">Phase 1 Live</span>
            </div>
            <span className="text-[10px] text-slate-500">v0.1.0-alpha</span>
          </div>
        ) : (
          <div className="flex justify-center" title="System Normal">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
