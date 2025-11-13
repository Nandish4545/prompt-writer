import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LoadingState from './components/LoadingState';
import OutputDisplay from './components/OutputDisplay';
import { optimizePrompt } from './services/geminiService';
import { OptimizationStatus } from './types';
import { ArrowRight, Wand2, Lightbulb } from 'lucide-react';

const App: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [status, setStatus] = useState<OptimizationStatus>(OptimizationStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!idea.trim()) return;

    setStatus(OptimizationStatus.LOADING);
    setError(null);

    try {
      const result = await optimizePrompt(idea);
      setOptimizedPrompt(result);
      setStatus(OptimizationStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "Failed to optimize prompt. Please try again.");
      setStatus(OptimizationStatus.ERROR);
    }
  };

  const handleReset = useCallback(() => {
    setStatus(OptimizationStatus.IDLE);
    setOptimizedPrompt('');
    // We intentionally keep the idea text so the user can tweak it if they want, 
    // unless they manually clear it.
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleOptimize();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-indigo-500/30">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Panel: Input */}
        <div className={`flex-1 flex flex-col transition-all duration-500 ${status === OptimizationStatus.SUCCESS ? 'lg:w-1/3' : 'lg:w-1/2 lg:mx-auto'}`}>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col h-full shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-semibold text-white">Your Rough Idea</h2>
                </div>
                
                <div className="relative flex-1">
                    <textarea
                        className="w-full h-full min-h-[300px] bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 resize-none transition-all font-normal leading-relaxed"
                        placeholder="e.g., I want a python script that scrapes stock data..."
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={status === OptimizationStatus.LOADING}
                    />
                     <div className="absolute bottom-4 right-4 text-xs text-slate-500 pointer-events-none bg-slate-900/80 px-2 py-1 rounded">
                        {idea.length} chars
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs text-slate-500 hidden sm:block">
                        Pro tip: Press <kbd className="font-mono bg-slate-700 px-1 rounded text-slate-300">Cmd + Enter</kbd> to optimize
                    </p>
                    <button
                        onClick={handleOptimize}
                        disabled={!idea.trim() || status === OptimizationStatus.LOADING}
                        className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            !idea.trim() 
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5'
                        }`}
                    >
                        {status === OptimizationStatus.LOADING ? (
                            <>Processing...</>
                        ) : (
                            <>
                                <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                Optimize Prompt
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
                
                {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}
            </div>
        </div>

        {/* Right Panel: Output */}
        {/* Only show right panel if we have a status other than IDLE, or on mobile keep it stacked */}
        {(status === OptimizationStatus.LOADING || status === OptimizationStatus.SUCCESS) && (
             <div className="flex-1 lg:h-auto min-h-[400px] animate-in slide-in-from-right-10 duration-500 fade-in">
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full shadow-xl backdrop-blur-sm flex flex-col relative overflow-hidden">
                    {/* Background decorative gradient */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
                    
                    {status === OptimizationStatus.LOADING ? (
                        <LoadingState />
                    ) : (
                        <OutputDisplay content={optimizedPrompt} onReset={handleReset} />
                    )}
                </div>
            </div>
        )}

      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-slate-600 text-sm">
        <p>Build better inputs for better outputs.</p>
      </footer>
    </div>
  );
};

export default App;