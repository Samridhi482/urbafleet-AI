import { GeoPoint } from './pothole';

export interface RouteHazard {
  id: string;
  type: 'pothole' | 'flooding' | 'construction' | 'traffic_slowdown' | 'unlit_road';
  severity: 'minor' | 'moderate' | 'severe';
  coordinate: GeoPoint;
  description: string;
}

export interface RouteSegment {
  distanceMeters: number;
  durationSeconds: number;
  roadName: string;
  safetyScore: number; // 0 - 100
  hazards: RouteHazard[];
}

export interface EvaluatedRoute {
  id: string;
  name: string;
  isRecommended: boolean;
  totalDistanceKm: number;
  estimatedDurationMins: number;
  overallSafetyScore: number; // 0 - 100
  potholeEncounterCount: number;
  congestionIndex: number;
  roadQualityRating: 'A' | 'B' | 'C' | 'D' | 'F';
  segments: RouteSegment[];
  polylinePoints: GeoPoint[];
}

export interface SafeRouteQuery {
  originAddress: string;
  originCoords: GeoPoint;
  destinationAddress: string;
  destinationCoords: GeoPoint;
  vehicleType: 'car' | 'heavy_truck' | 'two_wheeler' | 'ambulance' | 'bus';
  optimizeFor: 'safety' | 'speed' | 'road_quality';
}
