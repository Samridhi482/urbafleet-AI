import { mockEvaluatedRoutes } from '../data/mockRoutes';
import { EvaluatedRoute, SafeRouteQuery } from '../types/route';

export const routeService = {
  async compareRoutes(query?: SafeRouteQuery): Promise<EvaluatedRoute[]> {
    // In Phase 1, return the mock evaluated routes representing the comparison
    return [...mockEvaluatedRoutes];
  },

  async getRouteById(id: string): Promise<EvaluatedRoute | null> {
    const route = mockEvaluatedRoutes.find(r => r.id === id);
    return route || null;
  },
};
