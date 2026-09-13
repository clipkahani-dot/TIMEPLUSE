import React from 'react';
import { Home, Radio, Video, FileCheck, ArrowDownCircle } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab, hasLive = true, downloadCount = 2 }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'live', label: 'Live Class', icon: Radio, isLive: hasLive },
    { id: 'vod', label: 'VOD Courses', icon: Video },
    { id: 'tests', label: 'Tests (CBT)', icon: FileCheck },
    { id: 'downloads', label: 'Downloads', icon: ArrowDownCircle, badge: downloadCount }
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative select-none ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {item.isLive && (
                  <span className="absolute -top-1 -right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
                {item.badge > 0 && !item.isLive && (
                  <span className="absolute -top-1 -right-2 bg-sky-500 text-slate-950 font-extrabold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <div className="w-4 h-0.5 bg-amber-400 rounded-full mt-0.5 shadow-sm shadow-amber-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
