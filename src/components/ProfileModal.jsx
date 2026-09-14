import React from 'react';
import { 
  X, User, Phone, Mail, Award, BookOpen, LogOut, 
  ShieldCheck, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function ProfileModal({ isOpen, onClose, user, onLogout }) {
  if (!isOpen || !user) return null;

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Sign out error:', e);
    }
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Profile Card Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 p-0.5 mx-auto shadow-lg shadow-amber-500/20">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xl font-black text-amber-400">
              {user.name ? user.name[0] : 'U'}
            </div>
          </div>

          <div>
            <h3 className="text-base font-black text-white flex items-center justify-center gap-1.5">
              <span>{user.name || 'छात्र'}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            </h3>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              {user.targetExam || 'Railway ALP & Bihar SI'}
            </span>
          </div>
        </div>

        {/* Profile Details Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-400" /> मोबाइल नंबर:
            </span>
            <span className="text-white font-mono font-bold">{user.phone || '+91 9229840686'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" /> स्टूडेंट आईडी:
            </span>
            <span className="text-slate-300 font-mono text-[11px] truncate max-w-[150px]">
              {user.email || 'student@timeplus.in'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> सक्रिय कोर्सेस:
            </span>
            <span className="text-emerald-400 font-bold">1 कोर्स एक्टिव (Master Batch)</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleSignOut}
          className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>लॉगआउट करें (Sign Out)</span>
        </button>
      </div>
    </div>
  );
}
