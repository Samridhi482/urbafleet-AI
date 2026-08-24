import React from 'react';
import { cn } from '../../lib/utils';

export type OperationalStatus = 
  | 'critical' 
  | 'high' 
  | 'medium' 
  | 'low' 
  | 'warning' 
  | 'active' 
  | 'resolved' 
  | 'scheduled' 
  | 'detected' 
  | 'verified' 
  | 'in_progress' 
  | 'emergency' 
  | 'normal';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: OperationalStatus;
  label?: string;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  showDot = true,
  className,
  ...props
}) => {
  const getStyle = (s: OperationalStatus) => {
    switch (s) {
      case 'critical':
      case 'emergency':
        return {
          container: 'bg-rose-950/70 text-rose-300 border border-rose-800/60',
          dot: 'bg-rose-500 animate-pulse',
          defaultLabel: 'Critical',
        };
      case 'high':
      case 'warning':
        return {
          container: 'bg-amber-950/70 text-amber-300 border border-amber-800/60',
          dot: 'bg-amber-500',
          defaultLabel: 'Warning',
        };
      case 'medium':
      case 'in_progress':
      case 'scheduled':
        return {
          container: 'bg-sky-950/70 text-sky-300 border border-sky-800/60',
          dot: 'bg-sky-400',
          defaultLabel: 'In Progress',
        };
      case 'resolved':
      case 'normal':
        return {
          container: 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60',
          dot: 'bg-emerald-400',
          defaultLabel: 'Resolved',
        };
      case 'detected':
      case 'verified':
      case 'active':
        return {
          container: 'bg-blue-950/70 text-blue-300 border border-blue-800/60',
          dot: 'bg-blue-400',
          defaultLabel: 'Active',
        };
      case 'low':
      default:
        return {
          container: 'bg-slate-800 text-slate-300 border border-slate-700/60',
          dot: 'bg-slate-400',
          defaultLabel: 'Low',
        };
    }
  };

  const style = getStyle(status);
  const displayLabel = label || style.defaultLabel;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium tracking-wide uppercase',
        style.container,
        className
      )}
      {...props}
    >
      {showDot && <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} />}
      <span>{displayLabel}</span>
    </span>
  );
};
