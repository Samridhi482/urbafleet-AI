import React, { useEffect, useState } from 'react';
import { Navigation, Shield, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/ui/status-badge';
import { routeService } from '../services/routeService';
import { EvaluatedRoute } from '../types/route';

export const SafeRoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState<EvaluatedRoute[]>([]);

  useEffect(() => {
    routeService.compareRoutes().then(setRoutes);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Safer Route Comparison"
        description="Pothole-aware routing engine comparing transit safety, vehicle wear probability, and surface quality."
        breadcrumbs={[{ label: 'Safe Routes' }]}
        badge={
          <Badge variant="outline" className="font-mono text-[10px]">
            Coming in Phase 3
          </Badge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routes.map((route) => (
          <Card
            key={route.id}
            variant="elevated"
            className={route.isRecommended ? 'border-blue-500/50 bg-blue-950/20' : ''}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                {route.isRecommended ? (
                  <Badge variant="info" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Recommended Fleet Route</span>
                  </Badge>
                ) : (
                  <Badge variant="secondary">Direct / Unoptimized</Badge>
                )}
                <span className="font-mono text-xs text-slate-400">Quality Rating: {route.roadQualityRating}</span>
              </div>
              <CardTitle className="text-base mt-2">{route.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                <div>
                  <div className="text-slate-400 text-[10px]">Safety Score</div>
                  <div className="text-sm font-bold text-blue-400 font-mono">{route.overallSafetyScore}/100</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Distance</div>
                  <div className="text-sm font-bold text-slate-100 font-mono">{route.totalDistanceKm} km</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Est. Time</div>
                  <div className="text-sm font-bold text-slate-100 font-mono">{route.estimatedDurationMins} min</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-slate-400">
                  <span>Potholes Encountered:</span>
                  <span className={route.potholeEncounterCount === 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                    {route.potholeEncounterCount} detected
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Congestion Factor:</span>
                  <span className="font-mono text-slate-200">{route.congestionIndex}%</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-semibold text-slate-300 mb-1">Segments:</div>
                <div className="space-y-1">
                  {route.segments.map((seg, i) => (
                    <div key={i} className="flex justify-between text-[11px] text-slate-400 bg-slate-900/60 px-2 py-1 rounded">
                      <span>{seg.roadName}</span>
                      <span className="font-mono text-slate-300">{seg.distanceMeters / 1000} km</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
