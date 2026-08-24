import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { OverviewPage } from '../pages/OverviewPage';
import { LiveMapPage } from '../pages/LiveMapPage';
import { RoadsPage } from '../pages/RoadsPage';
import { TrafficPage } from '../pages/TrafficPage';
import { ConstituencyPage } from '../pages/ConstituencyPage';
import { SafeRoutesPage } from '../pages/SafeRoutesPage';
import { ReportsPage } from '../pages/ReportsPage';
import { AlertsPage } from '../pages/AlertsPage';
import { OperationsPage } from '../pages/OperationsPage';
import { AssistantPage } from '../pages/AssistantPage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/live-map" element={<LiveMapPage />} />
        <Route path="/roads" element={<RoadsPage />} />
        <Route path="/traffic" element={<TrafficPage />} />
        <Route path="/constituency" element={<ConstituencyPage />} />
        <Route path="/safe-routes" element={<SafeRoutesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/operations" element={<OperationsPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
