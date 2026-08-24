import { GeoPoint } from './pothole';

export type ReportCategory = 'pothole' | 'street_light' | 'drainage_cover' | 'road_debris' | 'traffic_signal' | 'damaged_sign';
export type ReportStatus = 'submitted' | 'triaged' | 'in_investigation' | 'scheduled' | 'resolved' | 'dismissed';

export interface CitizenReport {
  id: string;
  trackingNumber: string;
  category: ReportCategory;
  title: string;
  description: string;
  location: {
    address: string;
    landmark?: string;
    constituencyId: string;
    constituencyName: string;
    coordinates: GeoPoint;
  };
  reporter: {
    name: string;
    isAnonymous: boolean;
    contactPhone?: string;
  };
  status: ReportStatus;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  upvotes: number;
  submittedAt: string;
  lastUpdatedAt: string;
  assignedWorkOrderId?: string;
  imageUrl?: string;
  adminNotes?: string;
}

export interface ReportFilterOptions {
  status?: ReportStatus[];
  category?: ReportCategory[];
  constituencyId?: string;
  urgency?: string;
  searchTerm?: string;
}
