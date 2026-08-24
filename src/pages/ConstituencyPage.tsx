import React, { useEffect, useState } from 'react';
import { Landmark, TrendingUp, DollarSign, Award } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { constituencyService } from '../services/constituencyService';
import { Constituency } from '../types/constituency';

export const ConstituencyPage: React.FC = () => {
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);

  useEffect(() => {
    constituencyService.getConstituencies().then(setConstituencies);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Constituency-Level Insights"
        description="Ward-level road network health, municipal budget accountability, and elected representative dashboards."
        breadcrumbs={[{ label: 'Constituency' }]}
        badge={
          <Badge variant="outline" className="font-mono text-[10px]">
            Coming in Phase 3
          </Badge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {constituencies.map((c) => (
          <Card key={c.id} variant="elevated">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {c.code}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <span className="text-slate-400">Score:</span>
                  <span
                    className={
                      c.roadHealthScore >= 80
                        ? 'text-emerald-400 font-bold'
                        : c.roadHealthScore >= 60
                        ? 'text-amber-400 font-bold'
                        : 'text-rose-400 font-bold'
                    }
                  >
                    {c.roadHealthScore}/100
                  </span>
                </div>
              </div>
              <CardTitle className="text-sm mt-2">{c.name}</CardTitle>
              <CardDescription>{c.representativeName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Road Network:</span>
                <span className="font-mono text-slate-200">{c.totalRoadKm} km ({c.pavedPercentage}% paved)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Pothole Density:</span>
                <span className="font-mono text-amber-400">{c.potholeDensityPerKm} / km</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Active Reports:</span>
                <span className="font-mono text-slate-200">{c.activeReportsCount} open</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Budget Deployed:</span>
                <span className="font-mono text-emerald-400">
                  ${(c.spentBudgetUsd / 1000).toFixed(0)}k / ${(c.allocatedBudgetUsd / 1000).toFixed(0)}k
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
