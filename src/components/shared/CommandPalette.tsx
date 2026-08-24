import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Search,
  ArrowRight,
  X,
} from 'lucide-react';
import { Dialog } from '../ui/dialog';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const navigationItems = [
    { title: 'Overview', path: '/overview', section: 'Main', icon: <LayoutDashboard className="h-4 w-4" /> },
    { title: 'Live Intelligence Map', path: '/live-map', section: 'Main', icon: <Map className="h-4 w-4" /> },
    { title: 'Road Intelligence', path: '/roads', section: 'Main', icon: <Construction className="h-4 w-4" /> },
    { title: 'Traffic Intelligence', path: '/traffic', section: 'Main', icon: <Activity className="h-4 w-4" /> },
    { title: 'Constituency', path: '/constituency', section: 'Main', icon: <Landmark className="h-4 w-4" /> },
    { title: 'Safe Routes', path: '/safe-routes', section: 'Main', icon: <Navigation className="h-4 w-4" /> },
    { title: 'Reports', path: '/reports', section: 'Operations', icon: <FileSpreadsheet className="h-4 w-4" /> },
    { title: 'Alerts', path: '/alerts', section: 'Operations', icon: <Bell className="h-4 w-4" /> },
    { title: 'Operations & Fixes', path: '/operations', section: 'Operations', icon: <Wrench className="h-4 w-4" /> },
    { title: 'AI Assistant', path: '/assistant', section: 'System', icon: <Bot className="h-4 w-4" /> },
    { title: 'Settings', path: '/settings', section: 'System', icon: <Settings className="h-4 w-4" /> },
  ];

  const filteredItems = navigationItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.section.toLowerCase().includes(query.toLowerCase()) ||
    item.path.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="UrbanFleet Navigation & Commands" maxWidth="md">
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Type a module name, route, or quick command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full pl-9 pr-8 py-2 text-sm bg-slate-950 border border-slate-700/80 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="max-h-64 overflow-y-auto space-y-1 pr-1 pt-1">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500">
              No matching modules found for "{query}"
            </div>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleSelect(item.path)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors group cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-400 group-hover:text-blue-400 transition-colors">{item.icon}</span>
                  <span className="font-medium text-slate-200">{item.title}</span>
                  <span className="text-[10px] text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/40">
                    {item.section}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 group-hover:text-slate-300">
                  <span className="text-[11px] font-mono">{item.path}</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-500">
          <span>Navigate with click or arrow keys</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </Dialog>
  );
};
