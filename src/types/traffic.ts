import { GeoPoint } from './pothole';

export type CongestionLevel = 'free_flow' | 'moderate' | 'heavy' | 'standstill';
export type IncidentType = 'accident' | 'congestion' | 'roadwork' | 'hazard' | 'closure' | 'weather';

export interface TrafficSegment {
  id: string;
  roadName: string;
  segmentCode: string;
  startPoint: GeoPoint;
  endPoint: GeoPoint;
  currentSpeedKmh: number;
  freeFlowSpeedKmh: number;
  congestionLevel: CongestionLevel;
  delayMinutes: number;
  lastUpdated: string;
}

export interface TrafficIncident {
  id: string;
  title: string;
  type: IncidentType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: {
    address: string;
    coordinates: GeoPoint;
    corridorName: string;
  };
  impactedLanes: number;
  totalLanes: number;
  startTime: string;
  estimatedClearanceTime?: string;
  status: 'active' | 'clearing' | 'resolved';
  description: string;
}

export interface TrafficSummaryMetrics {
  cityCongestionIndex: number; // 0-100%
  activeIncidentsCount: number;
  averageSpeedKmh: number;
  totalDelayHours: number;
  criticalCorridorsCount: number;
}
