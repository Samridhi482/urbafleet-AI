import React from 'react';
import { cn } from '../../lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'busy' | 'offline';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  status,
  className,
  ...props
}) => {
  const sizes = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-11 w-11 text-base',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-rose-500',
    offline: 'bg-slate-500',
  };

  return (
    <div className={cn('relative inline-block select-none', className)} {...props}>
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-200 font-semibold overflow-hidden',
          sizes[size]
        )}
      >
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <span>{fallback}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-slate-900',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
