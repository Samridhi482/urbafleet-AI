import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'info' | 'success' | 'warning' | 'danger';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-blue-900/40 text-blue-300 border border-blue-700/50',
      secondary: 'bg-slate-800 text-slate-300 border border-slate-700/60',
      outline: 'text-slate-300 border border-slate-700',
      info: 'bg-sky-950/60 text-sky-400 border border-sky-800/50',
      success: 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50',
      warning: 'bg-amber-950/60 text-amber-400 border border-amber-800/50',
      danger: 'bg-rose-950/60 text-rose-400 border border-rose-800/50',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium tracking-wide whitespace-nowrap',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
