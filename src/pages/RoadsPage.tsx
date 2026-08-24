import React, { useEffect, useState } from 'react';
import { Construction, Sparkles, Filter } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { StatusBadge } from '../components/ui/status-badge';
import { potholeService } from '../services/potholeService';
import { Pothole } from '../types/pothole';

export const RoadsPage: React.FC = () => {
  const [potholes, setPotholes] = useState<Pothole[]>([]);

  useEffect(() => {
    potholeService.getPotholes().then(setPotholes);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Road & Pothole Intelligence"
        description="Computer-vision defect telemetry, automated severity classification, and degradation analytics."
        breadcrumbs={[{ label: 'Road Intelligence' }]}
        badge={
          <Badge variant="outline" className="font-mono text-[10px]">
            Coming in Phase 2
          </Badge>
        }
      />

      <Card variant="elevated">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle>Pothole Telemetry Records</CardTitle>
              <CardDescription>
                Phase 1 Typed Service Preview. Live table filters and AI inspection viewer will activate in Phase 2.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Filter className="h-3.5 w-3.5" />
                <span>Filters</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Defect ID</TableHead>
                <TableHead>Location / Corridor</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Depth / Width</TableHead>
                <TableHead>Detection Source</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {potholes.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-blue-400 font-semibold">{p.code}</TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-200">{p.location.address}</div>
                    <div className="text-[11px] text-slate-500">{p.location.constituencyName}</div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={p.severity} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="font-mono text-slate-300">
                    {p.depthCm} cm / {p.widthCm} cm
                  </TableCell>
                  <TableCell>
                    <span className="capitalize text-slate-400">{p.detectionSource.replace('_', ' ')}</span>
                  </TableCell>
                  <TableCell className="font-mono text-emerald-400">
                    {(p.confidenceScore * 100).toFixed(0)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-center text-xs text-slate-500">
            Phase 1 Foundation: Service layer connected to <code className="font-mono text-slate-400">potholeService.ts</code>. Full inspection modal and imagery viewer ready for Phase 2.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
