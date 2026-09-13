import React from 'react';

export default function Logo({ size = 'md', showText = true }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`${sizeClasses[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 p-0.5 shadow-lg shadow-amber-500/20`}>
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-sky-500/20 pointer-events-none" />
          <svg viewBox="0 0 40 40" className="w-6 h-6 text-amber-400 fill-current">
            <circle cx="20" cy="22" r="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 1" />
            <line x1="20" y1="22" x2="20" y2="15" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="22" x2="25" y2="22" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 7L8 13L20 19L32 13Z" fill="#f59e0b" />
            <path d="M13 16V22C13 25 27 25 27 22V16" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className={`${textSizes[size]} font-extrabold tracking-wider text-white flex items-center gap-1`}>
            TIME <span className="text-amber-400">PLUS</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold ml-1">APP</span>
          </div>
          <span className="text-[10px] font-semibold text-sky-400 tracking-wide">Science by Dheeraj Sir</span>
        </div>
      )}
    </div>
  );
}
