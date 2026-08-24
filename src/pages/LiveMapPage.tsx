import React from 'react';
import { Map, Layers, Navigation2, Compass, Radio } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { EmptyState } from '../components/ui/empty-state';

export const LiveMapPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Intelligence Map"
        description="Unified real-time GIS visualization of pavement defect telemetry, congestion corridors, and field operations."
        breadcrumbs={[{ label: 'Live Map' }]}
        badge={
          <Badge variant="outline" className="font-mono text-[10px]">
            Coming in Phase 2
          </Badge>
        }
      />

      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>GIS Interactive Viewport</CardTitle>
              <CardDescription>
                Leaflet / MapLibre geospatial rendering layer configured. Phase 2 will bind live telemetry markers.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
                <span>GIS Stream Standby</span>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<Map className="h-8 w-8 text-blue-400" />}
            title="Interactive GIS Map Engine Configured"
            description="The map stack (Leaflet/MapLibre) dependencies and typed GeoPoints are ready in the foundation. Interactive layer overlays, heatmaps, and live GPS trackers will be integrated in Phase 2."
            actionLabel="View Road Intelligence"
            onAction={() => window.location.href = '/roads'}
            className="min-h-96"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-1">
                <Layers className="h-4 w-4 text-blue-400" />
                <span>Layer 1: Road Defects</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Potholes, cracks, and surface degradation markers filtered by AI confidence scores.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-1">
                <Compass className="h-4 w-4 text-amber-400" />
                <span>Layer 2: Flow & Congestion</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Color-coded traffic segments from free flow to severe bottlenecks.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-1">
                <Navigation2 className="h-4 w-4 text-emerald-400" />
                <span>Layer 3: Fleet & Crews</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Active municipal repair units, asphalt hauler positions, and work order sites.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
