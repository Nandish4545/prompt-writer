import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 text-slate-400">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
      <p className="text-sm font-medium animate-pulse">Structuring your idea...</p>
      <p className="text-xs text-slate-500 mt-2">Applying prompt engineering best practices</p>
    </div>
  );
};

export default LoadingState;