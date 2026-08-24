import { GeoPoint } from './pothole';

export interface WardInfo {
  id: string;
  number: number;
  name: string;
  roadNetworkKm: number;
  openPotholes: number;
  healthScore: number; // 0 - 100
}

export interface Constituency {
  id: string;
  code: string;
  name: string;
  district: string;
  representativeName: string;
  totalPopulation: number;
  totalRoadKm: number;
  pavedPercentage: number;
  roadHealthScore: number; // 0 - 100
  potholeDensityPerKm: number;
  activeReportsCount: number;
  resolvedReportsCount: number;
  allocatedBudgetUsd: number;
  spentBudgetUsd: number;
  boundaryCenter: GeoPoint;
  wards: WardInfo[];
  priorityRank: number;
}

export interface ConstituencyComparison {
  constituencies: Constituency[];
  averageHealthScore: number;
  topPerforming: string;
  mostCritical: string;
}
