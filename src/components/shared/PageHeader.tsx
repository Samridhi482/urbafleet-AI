import React from 'react';
import { cn } from '../../lib/utils';
import { BreadcrumbItem, Breadcrumbs } from './Breadcrumbs';

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  badge,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-3 pb-5 border-b border-slate-800/80 mb-6', className)}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-0.5" />}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">{title}</h1>
            {badge}
          </div>
          {description && <p className="text-xs text-slate-400 sm:text-sm max-w-3xl">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
