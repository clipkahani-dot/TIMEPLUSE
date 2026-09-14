import React from 'react';
import { Bell, ShieldCheck, ChevronDown, Sparkles, User, Settings, Smartphone, Monitor, LogIn } from 'lucide-react';
import Logo from './Logo';

export default function Header({ user, isAdmin, onToggleAdmin, isMobileFrame, onToggleFrame, onOpenAuth, onOpenProfile }) {
  const isLoggedIn = user && user.id;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      <Logo size="sm" />

      <div className="flex items-center gap-2">
        {/* Mobile / Full Screen Preview Switcher */}
        <button
          onClick={onToggleFrame}
          className="hidden sm:flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          title="Toggle Mobile Screen Frame / Full Screen View"
        >
          {isMobileFrame ? <Monitor className="w-3.5 h-3.5 text-sky-400" /> : <Smartphone className="w-3.5 h-3.5 text-amber-400" />}
          <span>{isMobileFrame ? 'Full Screen' : 'Phone Frame'}</span>
        </button>

        {/* Admin Mode Switcher */}
        <button
          onClick={onToggleAdmin}
          className={`text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
            isAdmin
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
          }`}
          title="Switch between Student App & Teacher Admin Dashboard"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{isAdmin ? 'Teacher Admin' : 'Admin Panel'}</span>
        </button>

        {/* Notification Bell */}
        <div className="relative p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white cursor-pointer border border-slate-700">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>

        {/* Student Profile Pill or Login Button */}
        {isLoggedIn ? (
          <button 
            onClick={onOpenProfile}
            className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 pl-1.5 pr-2.5 py-1 rounded-full border border-slate-700 transition-all cursor-pointer"
            title="View Profile & Account"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-[11px] font-bold text-slate-950">
              {user.name ? user.name[0] : 'U'}
            </div>
            <span className="text-xs font-medium text-slate-200 hidden sm:inline max-w-[80px] truncate">{user.name}</span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1.5 rounded-full shadow-md shadow-amber-500/20 transition-all"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>लॉगिन</span>
          </button>
        )}
      </div>
    </header>
  );
}
