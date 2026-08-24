import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'warning' | 'critical' | 'success';
  title?: string;
  onDismiss?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, children, onDismiss, ...props }, ref) => {
    const variants = {
      info: {
        container: 'bg-sky-950/40 border-sky-800/60 text-sky-200',
        icon: <Info className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />,
      },
      warning: {
        container: 'bg-amber-950/40 border-amber-800/60 text-amber-200',
        icon: <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />,
      },
      critical: {
        container: 'bg-rose-950/40 border-rose-800/60 text-rose-200',
        icon: <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />,
      },
      success: {
        container: 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200',
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />,
      },
    };

    const currentVariant = variants[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex items-start gap-3 rounded-lg border p-3.5 text-xs shadow-xs transition-all',
          currentVariant.container,
          className
        )}
        {...props}
      >
        {currentVariant.icon}
        <div className="flex-1 space-y-0.5">
          {title && <h5 className="font-semibold leading-none tracking-tight">{title}</h5>}
          <div className="text-slate-300 opacity-90 leading-relaxed">{children}</div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-slate-200 transition-colors p-0.5 rounded cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';
