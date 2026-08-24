import { GeoPoint } from './pothole';

export type OperationStatus = 'pending_dispatch' | 'in_transit' | 'on_site' | 'completed' | 'on_hold';
export type WorkOrderPriority = 'routine' | 'elevated' | 'high' | 'emergency';

export interface RepairCrew {
  id: string;
  name: string;
  supervisor: string;
  contactNumber: string;
  equipmentType: string;
  currentStatus: 'available' | 'deployed' | 'maintenance' | 'off_duty';
  assignedZone: string;
}

export interface WorkOrder {
  id: string;
  workOrderNumber: string;
  title: string;
  description: string;
  priority: WorkOrderPriority;
  status: OperationStatus;
  location: {
    address: string;
    constituencyName: string;
    coordinates: GeoPoint;
  };
  assignedCrewId?: string;
  assignedCrewName?: string;
  estimatedHours: number;
  materialEstimatedTons: number;
  scheduledDate: string;
  completedDate?: string;
  linkedPotholeIds: string[];
  linkedReportIds: string[];
}

export interface OperationsMetrics {
  activeCrews: number;
  openWorkOrders: number;
  repairsCompletedToday: number;
  averageResponseTimeHours: number;
  materialsUsedTons: number;
}
