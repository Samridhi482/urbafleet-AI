import { mockAlerts } from '../data/mockAlerts';
import { AlertSummary, SystemAlert } from '../types/alert';

export const alertService = {
  async getAlerts(): Promise<SystemAlert[]> {
    return [...mockAlerts];
  },

  async getAlertSummary(): Promise<AlertSummary> {
    const unread = mockAlerts.filter(a => !a.isRead).length;
    const critical = mockAlerts.filter(a => a.severity === 'critical').length;
    const warning = mockAlerts.filter(a => a.severity === 'warning').length;
    return {
      unreadCount: unread,
      criticalCount: critical,
      warningCount: warning,
      totalActive: mockAlerts.length,
    };
  },

  async acknowledgeAlert(id: string, operatorName: string): Promise<SystemAlert> {
    const item = mockAlerts.find(a => a.id === id);
    if (!item) throw new Error(`Alert ${id} not found`);
    item.isAcknowledged = true;
    item.acknowledgedBy = operatorName;
    item.isRead = true;
    return { ...item };
  },

  async markAsRead(id: string): Promise<SystemAlert> {
    const item = mockAlerts.find(a => a.id === id);
    if (!item) throw new Error(`Alert ${id} not found`);
    item.isRead = true;
    return { ...item };
  },
};
