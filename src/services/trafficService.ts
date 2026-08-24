import { mockTrafficIncidents, mockTrafficMetrics, mockTrafficSegments } from '../data/mockTraffic';
import { TrafficIncident, TrafficSegment, TrafficSummaryMetrics } from '../types/traffic';

export interface TrafficQueryParams {
  status?: string;
  type?: string;
  corridor?: string;
}

export const trafficService = {
  async getSegments(): Promise<TrafficSegment[]> {
    return [...mockTrafficSegments];
  },

  async getIncidents(params?: TrafficQueryParams): Promise<TrafficIncident[]> {
    let result = [...mockTrafficIncidents];
    if (params?.status) {
      result = result.filter(i => i.status === params.status);
    }
    if (params?.type) {
      result = result.filter(i => i.type === params.type);
    }
    return result;
  },

  async getMetrics(): Promise<TrafficSummaryMetrics> {
    return { ...mockTrafficMetrics };
  },

  async getIncidentById(id: string): Promise<TrafficIncident | null> {
    const item = mockTrafficIncidents.find(i => i.id === id);
    return item || null;
  },
};
