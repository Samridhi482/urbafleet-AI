import { EvaluatedRoute } from '../types/route';

export const mockEvaluatedRoutes: EvaluatedRoute[] = [
  {
    id: 'route-safe-01',
    name: 'Smart Safe Route (Via Tech Expressway Link)',
    isRecommended: true,
    totalDistanceKm: 14.8,
    estimatedDurationMins: 22,
    overallSafetyScore: 92,
    potholeEncounterCount: 0,
    congestionIndex: 25,
    roadQualityRating: 'A',
    segments: [
      {
        roadName: 'North Access Road',
        distanceMeters: 2400,
        durationSeconds: 240,
        safetyScore: 94,
        hazards: [],
      },
      {
        roadName: 'Tech Expressway Link',
        distanceMeters: 9800,
        durationSeconds: 720,
        safetyScore: 96,
        hazards: [],
      },
      {
        roadName: 'Central Terminal Loop',
        distanceMeters: 2600,
        durationSeconds: 360,
        safetyScore: 88,
        hazards: [],
      },
    ],
    polylinePoints: [
      { lat: 12.985, lng: 77.59 },
      { lat: 12.96, lng: 77.61 },
      { lat: 12.9352, lng: 77.6245 },
    ],
  },
  {
    id: 'route-direct-02',
    name: 'Standard Direct Route (Via Old Heritage Corridor)',
    isRecommended: false,
    totalDistanceKm: 11.2,
    estimatedDurationMins: 34,
    overallSafetyScore: 56,
    potholeEncounterCount: 7,
    congestionIndex: 78,
    roadQualityRating: 'D',
    segments: [
      {
        roadName: 'Heritage Avenue',
        distanceMeters: 5200,
        durationSeconds: 1100,
        safetyScore: 52,
        hazards: [
          {
            id: 'hz-1',
            type: 'pothole',
            severity: 'severe',
            coordinate: { lat: 12.9611, lng: 77.5684 },
            description: 'Severe 14cm pothole near crossroad 4',
          },
          {
            id: 'hz-2',
            type: 'traffic_slowdown',
            severity: 'moderate',
            coordinate: { lat: 12.955, lng: 77.575 },
            description: 'Narrow lane bottleneck',
          },
        ],
      },
      {
        roadName: 'Central Bypass Link',
        distanceMeters: 6000,
        durationSeconds: 940,
        safetyScore: 60,
        hazards: [
          {
            id: 'hz-3',
            type: 'pothole',
            severity: 'moderate',
            coordinate: { lat: 12.965, lng: 77.6 },
            description: 'Cluster of asphalt cracks and potholes',
          },
        ],
      },
    ],
    polylinePoints: [
      { lat: 12.985, lng: 77.59 },
      { lat: 12.9611, lng: 77.5684 },
      { lat: 12.9352, lng: 77.6245 },
    ],
  },
];
