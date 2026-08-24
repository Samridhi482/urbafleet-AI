import React, { useEffect, useState } from 'react';
import { Bell, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { alertService } from '../../services/alertService';
import { SystemAlert } from '../../types/alert';
import { StatusBadge } from '../ui/status-badge';
import { Button } from '../ui/button';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);

  useEffect(() => {
    if (isOpen) {
      alertService.getAlerts().then(setAlerts);
    }
  }, [isOpen]);

  const handleMarkAsRead = async (id: string) => {
    const updated = await alertService.markAsRead(id);
    setAlerts((prev) => prev.map((a) => (a.id === id ? updated : a)));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl p-4 text-slate-100 animate-in fade-in zoom-in-95 duration-100">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-400" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">System Alerts</h4>
        </div>
        <Link
          to="/alerts"
          onClick={onClose}
          className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          <span>View All</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="max-h-80 overflow-y-auto space-y-2.5 py-3 pr-1">
        {alerts.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">No active alerts at this time.</div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border text-xs transition-colors ${
                alert.isRead
                  ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                  : 'bg-slate-800/60 border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <StatusBadge status={alert.severity} />
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h5 className="font-semibold text-slate-200 mb-1">{alert.title}</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{alert.message}</p>
              {!alert.isRead && (
                <div className="mt-2 pt-2 border-t border-slate-800 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkAsRead(alert.id)}
                    className="h-6 px-2 text-[10px] text-slate-400 hover:text-slate-200 gap-1"
                  >
                    <Check className="h-3 w-3" />
                    <span>Mark as Read</span>
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="pt-2 border-t border-slate-800 text-center">
        <Link
          to="/operations"
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          Check Field Operations Queue →
        </Link>
      </div>
    </div>
  );
};
