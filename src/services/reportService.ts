import { mockCitizenReports } from '../data/mockReports';
import { CitizenReport, ReportFilterOptions, ReportStatus } from '../types/report';

export const reportService = {
  async getReports(filter?: ReportFilterOptions): Promise<CitizenReport[]> {
    let result = [...mockCitizenReports];
    if (filter?.status && filter.status.length > 0) {
      result = result.filter(r => filter.status!.includes(r.status));
    }
    if (filter?.category && filter.category.length > 0) {
      result = result.filter(r => filter.category!.includes(r.category));
    }
    if (filter?.constituencyId) {
      result = result.filter(r => r.location.constituencyId === filter.constituencyId);
    }
    if (filter?.searchTerm) {
      const q = filter.searchTerm.toLowerCase();
      result = result.filter(
        r => r.trackingNumber.toLowerCase().includes(q) ||
             r.title.toLowerCase().includes(q) ||
             r.location.address.toLowerCase().includes(q)
      );
    }
    return result;
  },

  async getReportById(id: string): Promise<CitizenReport | null> {
    const item = mockCitizenReports.find(r => r.id === id);
    return item || null;
  },

  async updateReportStatus(id: string, status: ReportStatus): Promise<CitizenReport> {
    const item = mockCitizenReports.find(r => r.id === id);
    if (!item) throw new Error(`Report ${id} not found`);
    item.status = status;
    item.lastUpdatedAt = new Date().toISOString();
    return { ...item };
  },
};
