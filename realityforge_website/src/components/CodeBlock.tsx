import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { BlinkingCursor } from './BlinkingCursor';

interface CodeBlockProps {
  code: string;
  mobileCode?: string;
  language?: string;
  fileName?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  mobileCode,
  language = 'bash',
  fileName,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Always copy the full complete code
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-[#353750] bg-[#151622] text-slate-100 overflow-hidden shadow-md">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-[#12131D] border-b border-[#2C2E42] text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400 min-w-0">
          <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="font-mono text-[11px] sm:text-xs truncate">{fileName || language}</span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code"
          className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-mono shrink-0 ml-2"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-3 sm:p-5 overflow-x-auto text-[11px] sm:text-[13px] font-mono leading-relaxed text-slate-200">
        <pre className="font-mono m-0 p-0">
          {mobileCode ? (
            <>
              {/* Mobile View: tailored compact layout that fits 100% on phone screens without cutting off */}
              <code className="font-mono block sm:hidden whitespace-pre">
                {mobileCode}
                <BlinkingCursor color="bg-indigo-400 dark:bg-indigo-300" size="sm" />
              </code>
              {/* PC / Desktop View: full expansive layout with complete spacing */}
              <code className="font-mono hidden sm:inline-block whitespace-pre">
                {code}
                <BlinkingCursor color="bg-indigo-400 dark:bg-indigo-300" />
              </code>
            </>
          ) : (
            <code className="font-mono inline-block whitespace-pre">
              {code}
              <BlinkingCursor color="bg-indigo-400 dark:bg-indigo-300" />
            </code>
          )}
        </pre>
      </div>
    </div>
  );
};
