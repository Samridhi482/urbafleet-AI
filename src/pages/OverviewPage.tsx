import React from 'react';
import {
  Activity,
  Layers,
  MapPin,
  ShieldCheck,
  Zap,
  TrendingUp,
  AlertTriangle,
  FileCheck2,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/ui/status-badge';
import { mockPotholeMetrics } from '../data/mockPotholes';
import { mockTrafficMetrics } from '../data/mockTraffic';
import { mockOperationsMetrics } from '../data/mockOperations';

export const OverviewPage: React.FC = () => {
  const modules = [
    {
      title: 'Live Intelligence Map',
      path: '/live-map',
      desc: 'Real-time spatial visualization of road surface defects, traffic congestion, and field fleet positions.',
      status: 'Phase 2 Target',
      color: 'blue',
      metrics: 'GIS Layers Ready',
    },
    {
      title: 'Road & Pothole Intelligence',
      path: '/roads',
      desc: 'AI computer vision defect detections, severity scoring, depth analysis, and road degradation indexes.',
      status: 'Phase 2 Target',
      color: 'amber',
      metrics: `${mockPotholeMetrics.totalDetected} Monitored Spots`,
    },
    {
      title: 'Traffic Intelligence',
      path: '/traffic',
      desc: 'Live corridor speeds, congestion bottleneck prediction, delay estimation, and active road incidents.',
      status: 'Phase 2 Target',
      color: 'rose',
      metrics: `${mockTrafficMetrics.cityCongestionIndex}% Congestion Index`,
    },
    {
      title: 'Constituency Insights',
      path: '/constituency',
      desc: 'Ward-level road health scores, budget allocation analytics, and representative jurisdiction metrics.',
      status: 'Phase 3 Target',
      color: 'sky',
      metrics: '3 Key Jurisdictions',
    },
    {
      title: 'Safe Route Comparison',
      path: '/safe-routes',
      desc: 'Multi-criteria route evaluator ranking safety, pothole avoidance, and road surface quality ratings.',
      status: 'Phase 3 Target',
      color: 'emerald',
      metrics: 'Fleet Safety Engine',
    },
    {
      title: 'Road-Fix Operations',
      path: '/operations',
      desc: 'Municipal crew dispatch, asphalt material planning, work orders, and emergency patch tracking.',
      status: 'Phase 3 Target',
      color: 'indigo',
      metrics: `${mockOperationsMetrics.activeCrews} Active Units`,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="UrbanFleet AI Overview"
        description="Unified urban mobility, road health intelligence, and municipal operations command center."
        badge={
          <Badge variant="info" className="font-mono text-[10px]">
            Phase 1 Foundation Active
          </Badge>
        }
        actions={
          <Link to="/assistant">
            <Button variant="primary" size="sm" className="gap-2">
              <Cpu className="h-3.5 w-3.5" />
              <span>Launch AI Assistant</span>
            </Button>
          </Link>
        }
      />

      {/* Top Operational Metrics Bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card variant="default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-medium text-slate-400">Total Potholes Tracked</span>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{mockPotholeMetrics.totalDetected}</div>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
              <span className="text-rose-400 font-semibold flex items-center">
                {mockPotholeMetrics.criticalCount} Critical
              </span>
              <span>•</span>
              <span>{mockPotholeMetrics.resolvedThisMonth} fixed this month</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-medium text-slate-400">City Congestion Index</span>
            <TrendingUp className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{mockTrafficMetrics.cityCongestionIndex}%</div>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
              <span className="text-amber-400 font-semibold">{mockTrafficMetrics.activeIncidentsCount} Active Incidents</span>
              <span>•</span>
              <span>Avg {mockTrafficMetrics.averageSpeedKmh} km/h</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-medium text-slate-400">Active Repair Crews</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{mockOperationsMetrics.activeCrews} Units</div>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
              <span className="text-emerald-400 font-semibold">{mockOperationsMetrics.openWorkOrders} Open Work Orders</span>
              <span>•</span>
              <span>Avg {mockOperationsMetrics.averageResponseTimeHours}h response</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-medium text-slate-400">Platform Status</span>
            <Zap className="h-4 w-4 text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <StatusBadge status="normal" label="Operational" />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Phase 1 Client Foundation loaded. Typed services initialized.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Modular Platform Architecture Map */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Platform Intelligence Modules</CardTitle>
              <CardDescription>
                Explore the modular architecture of UrbanFleet AI. Click any card to navigate to its foundation preview.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="font-mono text-[10px]">
              Phase 1 Foundation
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod) => (
              <Link key={mod.path} to={mod.path} className="group block">
                <div className="h-full p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        <span>{mod.title}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                      </h4>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {mod.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{mod.desc}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">{mod.path}</span>
                    <span className="text-blue-400/90 font-medium">{mod.metrics}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
