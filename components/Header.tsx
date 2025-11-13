import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Prompt Architect</h1>
            <p className="text-xs text-slate-400 font-medium">AI-Powered Prompt Optimizer</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
          <Terminal className="w-4 h-4" />
          <span>Powered by Gemini 2.5 Flash</span>
        </div>
      </div>
    </header>
  );
};

export default Header;