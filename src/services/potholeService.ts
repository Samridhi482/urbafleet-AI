import { mockPotholeMetrics, mockPotholes } from '../data/mockPotholes';
import { Pothole, PotholeSeverity, PotholeStatus, PotholeSummaryMetrics } from '../types/pothole';

export interface PotholeQueryParams {
  severity?: PotholeSeverity;
  status?: PotholeStatus;
  constituencyId?: string;
  search?: string;
  limit?: number;
}

export const potholeService = {
  async getPotholes(params?: PotholeQueryParams): Promise<Pothole[]> {
    let result = [...mockPotholes];
    if (params?.severity) {
      result = result.filter(p => p.severity === params.severity);
    }
    if (params?.status) {
      result = result.filter(p => p.status === params.status);
    }
    if (params?.constituencyId) {
      result = result.filter(p => p.location.constituencyId === params.constituencyId);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(p => p.code.toLowerCase().includes(q) || p.location.address.toLowerCase().includes(q));
    }
    if (params?.limit) {
      result = result.slice(0, params.limit);
    }
    return result;
  },

  async getPotholeById(id: string): Promise<Pothole | null> {
    const item = mockPotholes.find(p => p.id === id);
    return item || null;
  },

  async getMetrics(): Promise<PotholeSummaryMetrics> {
    return { ...mockPotholeMetrics };
  },

  async updatePotholeStatus(id: string, status: PotholeStatus): Promise<Pothole> {
    const item = mockPotholes.find(p => p.id === id);
    if (!item) throw new Error(`Pothole ${id} not found`);
    item.status = status;
    item.lastUpdatedAt = new Date().toISOString();
    return { ...item };
  },
};
