import React, { useState } from 'react';
import { 
  ArrowDownCircle, Video, BookOpen, Trash2, HardDrive, 
  Wifi, WifiOff, Play, ShieldCheck, CheckCircle2, FileText
} from 'lucide-react';

export default function DownloadsTab({ vods, pdfs, onSelectLecture, onSelectPdf, user }) {
  const [offlineMode, setOfflineMode] = useState(false);
  const [localVods, setLocalVods] = useState(vods);
  const [localPdfs, setLocalPdfs] = useState(pdfs);

  const downloadedVods = localVods.filter(v => v.isDownloaded);
  const downloadedPdfs = localPdfs.filter(p => p.isDownloaded);

  const handleDeleteVod = (id, e) => {
    e.stopPropagation();
    setLocalVods(prev => prev.map(v => v.id === id ? { ...v, isDownloaded: false } : v));
  };

  const handleDeletePdf = (id, e) => {
    e.stopPropagation();
    setLocalPdfs(prev => prev.map(p => p.id === id ? { ...p, isDownloaded: false } : p));
  };

  return (
    <div className="pb-24 pt-2 mx-4 space-y-4">
      {/* Offline Mode Simulation Card */}
      <div className={`p-4 rounded-2xl border transition-all space-y-2 ${
        offlineMode 
          ? 'bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-950/40' 
          : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {offlineMode ? (
              <WifiOff className="w-5 h-5 text-amber-400" />
            ) : (
              <Wifi className="w-5 h-5 text-emerald-400" />
            )}
            <div>
              <h3 className="text-xs font-black text-white">Simulate Offline Mode</h3>
              <p className="text-[10px] text-slate-400">Test app without internet connection</p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => setOfflineMode(!offlineMode)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              offlineMode ? 'bg-amber-500' : 'bg-slate-800'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
              offlineMode ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {offlineMode && (
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Offline Mode Active: Streaming disabled. Only downloaded content is accessible.</span>
          </div>
        )}
      </div>

      {/* Storage Used Indicator */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold">
            <HardDrive className="w-4 h-4 text-sky-400" />
            <span>App Offline Storage</span>
          </div>
          <span className="text-amber-400 font-mono font-bold">348 MB / 64 GB</span>
        </div>

        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-amber-400 rounded-full" style={{ width: '18%' }} />
        </div>

        <div className="flex justify-between text-[10px] text-slate-400 pt-1">
          <span>{downloadedVods.length} DRM Video(s)</span>
          <span>{downloadedPdfs.length} PDF Note(s)</span>
        </div>
      </div>

      {/* Downloaded Videos Section */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Video className="w-4 h-4 text-amber-400" />
          <span>Downloaded Private Videos ({downloadedVods.length})</span>
        </h3>

        {downloadedVods.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
            No videos saved yet. Download any lecture from the VOD section!
          </div>
        ) : (
          downloadedVods.map(vod => (
            <div 
              key={vod.id}
              onClick={() => onSelectLecture(vod)}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center gap-3"
            >
              <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0">
                <img src={vod.thumbnail} alt={vod.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-current" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{vod.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{vod.duration} • {vod.fileSize || '148 MB'}</p>
              </div>

              <button 
                onClick={(e) => handleDeleteVod(vod.id, e)}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                title="Delete from offline storage"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Downloaded PDF Notes Section */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Downloaded Digital Board Notes ({downloadedPdfs.length})</span>
        </h3>

        {downloadedPdfs.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
            No notes saved yet. Open any PDF note and click "Save Offline".
          </div>
        ) : (
          downloadedPdfs.map(pdf => (
            <div 
              key={pdf.id}
              onClick={() => onSelectPdf(pdf)}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                <FileText className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{pdf.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{pdf.pages} Slides • {pdf.fileSize}</p>
              </div>

              <button 
                onClick={(e) => handleDeletePdf(pdf.id, e)}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                title="Delete from offline storage"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
