import { mockOperationsMetrics, mockRepairCrews, mockWorkOrders } from '../data/mockOperations';
import { OperationsMetrics, RepairCrew, WorkOrder } from '../types/operation';

export const operationService = {
  async getWorkOrders(): Promise<WorkOrder[]> {
    return [...mockWorkOrders];
  },

  async getWorkOrderById(id: string): Promise<WorkOrder | null> {
    const wo = mockWorkOrders.find(w => w.id === id);
    return wo || null;
  },

  async getCrews(): Promise<RepairCrew[]> {
    return [...mockRepairCrews];
  },

  async getMetrics(): Promise<OperationsMetrics> {
    return { ...mockOperationsMetrics };
  },
};
