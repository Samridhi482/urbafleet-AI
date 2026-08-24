import React, { useEffect, useState } from 'react';
import { Wrench, Users, Truck, Calendar } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { StatusBadge } from '../components/ui/status-badge';
import { operationService } from '../services/operationService';
import { RepairCrew, WorkOrder } from '../types/operation';

export const OperationsPage: React.FC = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [crews, setCrews] = useState<RepairCrew[]>([]);

  useEffect(() => {
    operationService.getWorkOrders().then(setWorkOrders);
    operationService.getCrews().then(setCrews);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Road-Fix Operations"
        description="Field repair crew management, work order dispatching, and asphalt resurfacing workflows."
        breadcrumbs={[{ label: 'Operations' }]}
        badge={
          <Badge variant="outline" className="font-mono text-[10px]">
            Coming in Phase 3
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work Orders List */}
        <div className="lg:col-span-2 space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Active Municipal Work Orders</CardTitle>
              <CardDescription>Scheduled and on-site pothole patching orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Location / Task</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Crew</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workOrders.map((wo) => (
                    <TableRow key={wo.id}>
                      <TableCell className="font-mono text-blue-400 font-semibold">{wo.workOrderNumber}</TableCell>
                      <TableCell>
                        <div className="font-medium text-slate-200">{wo.title}</div>
                        <div className="text-[10px] text-slate-500">{wo.location.address}</div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={wo.priority === 'emergency' ? 'emergency' : wo.priority === 'high' ? 'high' : 'low'}
                          label={wo.priority}
                        />
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={wo.status === 'on_site' ? 'in_progress' : wo.status === 'completed' ? 'resolved' : 'scheduled'}
                          label={wo.status.replace('_', ' ')}
                        />
                      </TableCell>
                      <TableCell className="text-xs text-slate-300">
                        {wo.assignedCrewName || 'Unassigned'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Repair Crews */}
        <div className="space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Municipal Field Crews</CardTitle>
              <CardDescription>Equipment and unit availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {crews.map((crew) => (
                <div key={crew.id} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-200">{crew.name}</span>
                    <StatusBadge
                      status={crew.currentStatus === 'deployed' ? 'in_progress' : crew.currentStatus === 'available' ? 'normal' : 'low'}
                      label={crew.currentStatus}
                    />
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Lead: </span>{crew.supervisor} • {crew.assignedZone}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {crew.equipmentType}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
