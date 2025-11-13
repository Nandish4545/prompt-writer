import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface OutputDisplayProps {
  content: string;
  onReset: () => void;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ content, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col animate-in fade-in zoom-in duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
           <div className="p-1.5 bg-emerald-500/10 rounded-md">
             <Zap className="w-4 h-4 text-emerald-400" />
           </div>
           <h2 className="text-lg font-semibold text-slate-100">Optimized Prompt</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors rounded-md hover:bg-slate-800"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            New Idea
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all rounded-md border ${
              copied 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-transparent shadow-lg shadow-indigo-500/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Prompt
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950 rounded-xl border border-slate-800 p-6 shadow-inner">
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
                h1: ({node, ...props}) => <h1 className="text-xl font-bold text-indigo-300 mb-4 border-b border-slate-800 pb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-semibold text-indigo-200 mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-md font-semibold text-slate-200 mt-4 mb-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-1 text-slate-300" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                strong: ({node, ...props}) => <strong className="text-indigo-100 font-bold" {...props} />,
                p: ({node, ...props}) => <p className="leading-relaxed text-slate-300 mb-4" {...props} />,
                code: ({node, ...props}) => <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-200 font-mono text-xs" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500">
            This output is ready to be pasted into ChatGPT, Gemini, Claude, or your codebase.
        </p>
      </div>
    </div>
  );
};

export default OutputDisplay;