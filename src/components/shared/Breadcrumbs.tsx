import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav className={cn('flex items-center space-x-1.5 text-xs text-slate-400', className)} aria-label="Breadcrumb">
      <Link
        to="/overview"
        className="flex items-center text-slate-400 hover:text-slate-200 transition-colors p-0.5"
        title="UrbanFleet Overview"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3 w-3 text-slate-600 shrink-0" />
            {item.href && !isLast ? (
              <Link to={item.href} className="hover:text-slate-200 transition-colors truncate max-w-40">
                {item.label}
              </Link>
            ) : (
              <span className={cn('truncate max-w-48', isLast ? 'text-slate-200 font-medium' : 'text-slate-400')}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
