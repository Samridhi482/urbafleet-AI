export type PotholeSeverity = 'low' | 'medium' | 'high' | 'critical';
export type PotholeStatus = 'detected' | 'verified' | 'scheduled' | 'repaired' | 'dismissed';

export interface GeoPoint {
  lat: number;
  lng: number;
  altitude?: number;
}

export interface Pothole {
  id: string;
  code: string;
  location: {
    address: string;
    streetName: string;
    constituencyId: string;
    constituencyName: string;
    coordinates: GeoPoint;
  };
  severity: PotholeSeverity;
  status: PotholeStatus;
  depthCm: number;
  widthCm: number;
  estimatedSurfaceAreaM2: number;
  detectionSource: 'ai_camera' | 'telematics' | 'citizen_report' | 'patrol_unit';
  confidenceScore: number;
  firstDetectedAt: string;
  lastUpdatedAt: string;
  assignedWorkOrderId?: string;
  imageUrl?: string;
  assignedPriorityScore: number; // 0 - 100
}

export interface PotholeSummaryMetrics {
  totalDetected: number;
  criticalCount: number;
  highCount: number;
  scheduledForRepair: number;
  resolvedThisMonth: number;
  avgResolutionTimeHours: number;
}
