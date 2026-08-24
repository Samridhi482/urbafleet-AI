import React, { useEffect, useState } from 'react';
import { FileSpreadsheet, ThumbsUp, Filter } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { StatusBadge } from '../components/ui/status-badge';
import { reportService } from '../services/reportService';
import { CitizenReport } from '../types/report';

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<CitizenReport[]>([]);

  useEffect(() => {
    reportService.getReports().then(setReports);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Citizen Reports & Triage"
        description="Public reporting intake, civic verification pipeline, and automated deduplication."
        breadcrumbs={[{ label: 'Reports' }]}
        badge={
          <Badge variant="outline" className="font-mono text-[10px]">
            Coming in Phase 3
          </Badge>
        }
      />

      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Citizen Ingest Queue</CardTitle>
              <CardDescription>Verified community submissions awaiting crew dispatch</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking #</TableHead>
                <TableHead>Category / Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Upvotes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-blue-400 font-semibold">{r.trackingNumber}</TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-200">{r.title}</div>
                    <div className="text-[10px] text-slate-500 capitalize">{r.category.replace('_', ' ')}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-slate-300">{r.location.address}</div>
                    <div className="text-[10px] text-slate-500">{r.location.constituencyName}</div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.urgency === 'urgent' ? 'critical' : r.urgency === 'high' ? 'warning' : 'medium'} label={r.urgency} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.status === 'in_investigation' ? 'in_progress' : r.status === 'triaged' ? 'detected' : 'scheduled'} label={r.status.replace('_', ' ')} />
                  </TableCell>
                  <TableCell className="font-mono text-slate-300">
                    <span className="flex items-center gap-1 text-slate-400">
                      <ThumbsUp className="h-3 w-3 text-blue-400" />
                      <span>{r.upvotes}</span>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
