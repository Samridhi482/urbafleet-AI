import React, { useEffect, useState } from 'react';
import { Bell, Check, ShieldAlert } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/ui/status-badge';
import { alertService } from '../services/alertService';
import { SystemAlert } from '../types/alert';
import { useToast } from '../components/ui/toast';

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    alertService.getAlerts().then(setAlerts);
  }, []);

  const handleAcknowledge = async (id: string) => {
    const updated = await alertService.acknowledgeAlert(id, 'Ops Lead #1');
    setAlerts((prev) => prev.map((a) => (a.id === id ? updated : a)));
    showToast('Alert Acknowledged', `Alert ${updated.code} has been logged in operational records.`, 'success');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Active System Alerts"
        description="Automated telemetry alerts, rapid road degradation warnings, and citizen surge triggers."
        breadcrumbs={[{ label: 'Alerts' }]}
        badge={
          <Badge variant="outline" className="font-mono text-[10px]">
            Coming in Phase 3
          </Badge>
        }
      />

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} variant="elevated" className={!alert.isAcknowledged ? 'border-amber-700/60' : ''}>
            <div className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <StatusBadge status={alert.severity} />
                  <span className="font-mono text-xs font-semibold text-blue-400">{alert.code}</span>
                  <span className="text-xs text-slate-500 font-mono">
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {alert.isAcknowledged ? (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                      <Check className="h-3.5 w-3.5" />
                      <span>Acknowledged by {alert.acknowledgedBy}</span>
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAcknowledge(alert.id)}
                      className="h-7 text-xs"
                    >
                      Acknowledge Alert
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-100">{alert.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{alert.message}</p>
              </div>

              {alert.recommendedAction && (
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs flex items-start gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-300">Recommended Action: </span>
                    <span className="text-slate-300">{alert.recommendedAction}</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
