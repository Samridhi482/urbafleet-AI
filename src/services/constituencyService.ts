import { mockConstituencies } from '../data/mockConstituencies';
import { Constituency, ConstituencyComparison } from '../types/constituency';

export const constituencyService = {
  async getConstituencies(): Promise<Constituency[]> {
    return [...mockConstituencies];
  },

  async getConstituencyById(id: string): Promise<Constituency | null> {
    const item = mockConstituencies.find(c => c.id === id);
    return item || null;
  },

  async getComparison(): Promise<ConstituencyComparison> {
    const avg = mockConstituencies.reduce((acc, c) => acc + c.roadHealthScore, 0) / (mockConstituencies.length || 1);
    const sorted = [...mockConstituencies].sort((a, b) => b.roadHealthScore - a.roadHealthScore);
    return {
      constituencies: mockConstituencies,
      averageHealthScore: Math.round(avg),
      topPerforming: sorted[0]?.name || 'N/A',
      mostCritical: sorted[sorted.length - 1]?.name || 'N/A',
    };
  },
};
