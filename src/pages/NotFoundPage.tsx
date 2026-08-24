import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-6 space-y-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-400">
        <ShieldAlert className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-bold text-slate-100">404 - Module Not Found</h2>
      <p className="text-xs text-slate-400 max-w-md">
        The requested urban mobility route does not exist in the UrbanFleet platform navigation schema.
      </p>
      <Link to="/overview">
        <Button variant="primary" size="sm" className="gap-2 mt-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Overview</span>
        </Button>
      </Link>
    </div>
  );
};
