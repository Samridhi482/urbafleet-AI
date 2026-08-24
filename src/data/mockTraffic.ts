import { TrafficIncident, TrafficSegment, TrafficSummaryMetrics } from '../types/traffic';

export const mockTrafficSegments: TrafficSegment[] = [
  {
    id: 'seg-101',
    roadName: 'North Metro Highway (Inbound)',
    segmentCode: 'NMH-IN-01',
    startPoint: { lat: 12.985, lng: 77.59 },
    endPoint: { lat: 12.9716, lng: 77.5946 },
    currentSpeedKmh: 14,
    freeFlowSpeedKmh: 60,
    congestionLevel: 'heavy',
    delayMinutes: 24,
    lastUpdated: '2026-08-24T08:35:00Z',
  },
  {
    id: 'seg-102',
    roadName: 'Tech Expressway Outer Arc',
    segmentCode: 'TEO-04',
    startPoint: { lat: 12.9352, lng: 77.6245 },
    endPoint: { lat: 12.92, lng: 77.68 },
    currentSpeedKmh: 42,
    freeFlowSpeedKmh: 70,
    congestionLevel: 'moderate',
    delayMinutes: 8,
    lastUpdated: '2026-08-24T08:36:00Z',
  },
  {
    id: 'seg-103',
    roadName: 'South Ringway Elevated Link',
    segmentCode: 'SRE-02',
    startPoint: { lat: 12.9189, lng: 77.5841 },
    endPoint: { lat: 12.905, lng: 77.57 },
    currentSpeedKmh: 68,
    freeFlowSpeedKmh: 70,
    congestionLevel: 'free_flow',
    delayMinutes: 0,
    lastUpdated: '2026-08-24T08:36:00Z',
  },
];

export const mockTrafficIncidents: TrafficIncident[] = [
  {
    id: 'inc-001',
    title: 'Multi-Vehicle Collision on Central Bypass',
    type: 'accident',
    severity: 'critical',
    location: {
      address: 'Central Bypass Km 12.4',
      coordinates: { lat: 12.965, lng: 77.6 },
      corridorName: 'Central Bypass Corridor',
    },
    impactedLanes: 2,
    totalLanes: 3,
    startTime: '2026-08-24T07:50:00Z',
    estimatedClearanceTime: '2026-08-24T09:30:00Z',
    status: 'active',
    description: 'Emergency response vehicles on scene. 2 right lanes blocked.',
  },
  {
    id: 'inc-002',
    title: 'Emergency Pothole Patching Work',
    type: 'roadwork',
    severity: 'medium',
    location: {
      address: 'Heritage Avenue, Sector 4',
      coordinates: { lat: 12.9611, lng: 77.5684 },
      corridorName: 'Historic West Link',
    },
    impactedLanes: 1,
    totalLanes: 2,
    startTime: '2026-08-24T06:00:00Z',
    estimatedClearanceTime: '2026-08-24T12:00:00Z',
    status: 'active',
    description: 'Municipal asphalt crew performing emergency cold patch repairs.',
  },
];

export const mockTrafficMetrics: TrafficSummaryMetrics = {
  cityCongestionIndex: 48,
  activeIncidentsCount: 14,
  averageSpeedKmh: 31.8,
  totalDelayHours: 420.5,
  criticalCorridorsCount: 3,
};
