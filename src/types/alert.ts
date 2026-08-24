import { GeoPoint } from './pothole';

export type AlertSeverity = 'info' | 'warning' | 'critical';
export type AlertCategory = 'pothole_cluster' | 'traffic_gridlock' | 'rapid_road_degradation' | 'citizen_surge' | 'weather_risk' | 'crew_delay';

export interface SystemAlert {
  id: string;
  code: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  category: AlertCategory;
  timestamp: string;
  isRead: boolean;
  isAcknowledged: boolean;
  acknowledgedBy?: string;
  targetLocation?: {
    name: string;
    coordinates?: GeoPoint;
    constituency?: string;
  };
  recommendedAction?: string;
  relatedEntityId?: string;
}

export interface AlertSummary {
  unreadCount: number;
  criticalCount: number;
  warningCount: number;
  totalActive: number;
}
