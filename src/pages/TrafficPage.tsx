import React, { useEffect, useState } from 'react';
import { Activity, Gauge, AlertCircle } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { StatusBadge } from '../components/ui/status-badge';
import { trafficService } from '../services/trafficService';
import { TrafficIncident, TrafficSegment } from '../types/traffic';

export const TrafficPage: React.FC = () => {
  const [segments, setSegments] = useState<TrafficSegment[]>([]);
  const [incidents, setIncidents] = useState<TrafficIncident[]>([]);

  useEffect(() => {
    trafficService.getSegments().then(setSegments);
    trafficService.getIncidents().then(setIncidents);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Traffic Intelligence"
        description="Real-time corridor speed tracking, congestion analysis, and active traffic incident monitoring."
        breadcrumbs={[{ label: 'Traffic Intelligence' }]}
        badge={
          <Badge variant="outline" className="font-mono text-[10px]">
            Coming in Phase 2
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monitored Corridors */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Key Monitored Corridors</CardTitle>
            <CardDescription>Corridor speed vs free-flow baseline speed</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Corridor</TableHead>
                  <TableHead>Speed</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Delay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {segments.map((seg) => (
                  <TableRow key={seg.id}>
                    <TableCell>
                      <div className="font-medium text-slate-200">{seg.roadName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{seg.segmentCode}</div>
                    </TableCell>
                    <TableCell className="font-mono">
                      <span className="text-slate-100 font-semibold">{seg.currentSpeedKmh}</span>
                      <span className="text-slate-500 text-[11px]"> / {seg.freeFlowSpeedKmh} km/h</span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={seg.congestionLevel === 'heavy' ? 'critical' : seg.congestionLevel === 'moderate' ? 'warning' : 'normal'}
                        label={seg.congestionLevel.replace('_', ' ')}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-slate-300">
                      {seg.delayMinutes > 0 ? `+${seg.delayMinutes} min` : 'None'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Active Incidents */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Active Traffic Incidents</CardTitle>
            <CardDescription>Accidents, lane closures, and roadway hazards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {incidents.map((inc) => (
              <div key={inc.id} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200">{inc.title}</span>
                  <StatusBadge status={inc.severity} />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{inc.description}</p>
                <div className="flex items-center justify-between pt-2 text-[10px] text-slate-500 border-t border-slate-800/80">
                  <span>{inc.location.address}</span>
                  <span className="font-mono text-amber-400">
                    Lanes: {inc.impactedLanes}/{inc.totalLanes} Blocked
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
