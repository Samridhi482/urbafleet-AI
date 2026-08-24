import React from 'react';
import { Settings, Shield, Sliders, Database, BellRing } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { StatusBadge } from '../components/ui/status-badge';
import { useToast } from '../components/ui/toast';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();

  const handleSave = () => {
    showToast('Settings Saved', 'Local platform preferences updated successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Settings"
        description="Configure GIS telemetry streams, defect detection thresholds, notification dispatchers, and system preferences."
        breadcrumbs={[{ label: 'Settings' }]}
        badge={
          <Badge variant="secondary" className="font-mono text-[10px]">
            System Config
          </Badge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-400" />
              <CardTitle>AI Defect Detection Thresholds</CardTitle>
            </div>
            <CardDescription>Sensitivity tuning for computer vision and telematics models</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Minimum AI Confidence Score</label>
              <Select
                options={[
                  { value: '0.85', label: '85% (High Precision, Fewer False Positives)' },
                  { value: '0.75', label: '75% (Balanced Operational Mode)' },
                  { value: '0.60', label: '60% (High Recall, Max Telemetry Sensitivity)' },
                ]}
                defaultValue="0.85"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Critical Pothole Depth Threshold (cm)</label>
              <Input defaultValue="10.0" type="number" step="0.5" />
            </div>

            <Button variant="secondary" size="sm" onClick={handleSave}>
              Update Thresholds
            </Button>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-400" />
              <CardTitle>Environment & Data Architecture</CardTitle>
            </div>
            <CardDescription>Service architecture mode for Phase 1</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Current Runtime Phase:</span>
              <StatusBadge status="normal" label="Phase 1 Foundation" />
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Service Layer:</span>
              <span className="font-mono text-slate-200">Typed Mock Services (/src/services)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Backend API Ready:</span>
              <span className="font-mono text-emerald-400">Plug-and-Play Async Contract</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Map Rendering Engine:</span>
              <span className="font-mono text-blue-400">Leaflet / MapLibre (Installed)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
