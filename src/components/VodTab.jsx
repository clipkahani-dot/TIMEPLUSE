import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, 
  Settings, CheckCircle2, Download, BookOpen, Clock, ShieldCheck, 
  Sparkles, Lock, ArrowDownCircle, ChevronRight
} from 'lucide-react';

export default function VodTab({ vods, pdfs, onSelectPdf, user }) {
  const [selectedVod, setSelectedVod] = useState(vods[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [videoQuality, setVideoQuality] = useState('720p HD');
  const [showSettings, setShowSettings] = useState(false);
  const [progress, setProgress] = useState(35);
  const [watermarkPos, setWatermarkPos] = useState({ top: 20, left: 30 });

  // Floating anti-piracy DRM watermark animation
  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 60) + 15;
      const left = Math.floor(Math.random() * 55) + 10;
      setWatermarkPos({ top, left });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
  const qualities = ['360p', '480p', '720p HD', '1080p Full HD'];

  const handleDownload = (vod, e) => {
    e.stopPropagation();
    vod.isDownloaded = true;
    alert(`📥 "${vod.title}" has been saved to your Offline Downloads!`);
  };

  return (
    <div className="pb-24 pt-2 space-y-4">
      {/* Video Player Section */}
      <div className="mx-4 rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl relative select-none">
        {/* Anti-Piracy DRM Floating Dynamic Watermark */}
        <div 
          className="absolute z-30 pointer-events-none transition-all duration-1000 ease-in-out opacity-40 font-mono text-[10px] sm:text-xs text-amber-300 bg-black/70 px-2 py-1 rounded border border-amber-500/40"
          style={{ top: `${watermarkPos.top}%`, left: `${watermarkPos.left}%` }}
        >
          {user.name} • {user.phone}<br />
          TIME PLUS DRM PROTECTED
        </div>

        {/* Video Canvas / Display */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <img 
            src={selectedVod.thumbnail} 
            alt={selectedVod.title} 
            className="w-full h-full object-cover opacity-60"
          />

          {/* Center Play/Pause Big Button */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 transition-transform active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>

          {/* Playing Status Badge */}
          {isPlaying && (
            <div className="absolute top-3 left-3 z-20 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              PLAYING ({playbackSpeed}x • {videoQuality})
            </div>
          )}

          {/* Settings Menu Popup */}
          {showSettings && (
            <div className="absolute top-10 right-3 z-40 bg-slate-900/95 border border-slate-700 rounded-2xl p-3 shadow-2xl space-y-3 w-48 text-xs backdrop-blur-md">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Speed</label>
                <div className="grid grid-cols-3 gap-1">
                  {speeds.map(spd => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`py-1 rounded text-center font-bold text-[11px] ${
                        playbackSpeed === spd ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Quality</label>
                <div className="space-y-1">
                  {qualities.map(q => (
                    <button
                      key={q}
                      onClick={() => setVideoQuality(q)}
                      className={`w-full py-1 px-2 text-left rounded font-bold text-[11px] flex items-center justify-between ${
                        videoQuality === q ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{q}</span>
                      {videoQuality === q && <span className="text-amber-400 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Control Scrub Bar */}
        <div className="bg-slate-950 p-3 border-t border-slate-800 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400">14:48</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress} 
              onChange={(e) => setProgress(e.target.value)}
              className="flex-1 accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-mono text-slate-400">{selectedVod.duration}</span>
          </div>

          <div className="flex items-center justify-between pt-1 text-slate-300">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 hover:text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setProgress(prev => Math.max(0, Number(prev) - 10))}
                className="p-1.5 hover:text-white text-xs font-mono"
                title="Rewind 10s"
              >
                -10s
              </button>
              <button 
                onClick={() => setProgress(prev => Math.min(100, Number(prev) + 10))}
                className="p-1.5 hover:text-white text-xs font-mono"
                title="Forward 10s"
              >
                +10s
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-lg flex items-center gap-1 text-xs font-bold ${
                  showSettings ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{playbackSpeed}x</span>
              </button>
              <button 
                onClick={() => alert('Full screen mode simulation')}
                className="p-1.5 hover:text-white"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Video Details Banner */}
      <div className="mx-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">{selectedVod.chapter}</span>
            <h2 className="text-sm font-black text-white mt-1 leading-snug">{selectedVod.title}</h2>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-extrabold flex-shrink-0">
            DRM Encrypted
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> {selectedVod.duration}</span>
          <span>•</span>
          <span>{selectedVod.views} Views</span>
          <span>•</span>
          <span>Faculty: Dheeraj Sir</span>
        </div>

        {/* Quick Action Buttons: Lecture Notes & Offline Download */}
        <div className="flex gap-2 pt-1 border-t border-slate-800">
          <button 
            onClick={() => {
              const matchingPdf = pdfs.find(p => p.id === selectedVod.pdfId) || pdfs[0];
              onSelectPdf(matchingPdf);
            }}
            className="flex-1 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Class PDF Notes</span>
          </button>
          <button 
            onClick={(e) => handleDownload(selectedVod, e)}
            className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{selectedVod.isDownloaded ? 'Downloaded' : 'Download'}</span>
          </button>
        </div>
      </div>

      {/* Playlist / Chapter Lectures */}
      <div className="mx-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider">
            All Lectures in this Batch ({vods.length})
          </h3>
          <span className="text-[11px] text-amber-400 font-bold">Science Special</span>
        </div>

        <div className="space-y-2.5">
          {vods.map((vod, idx) => {
            const isCurrent = vod.id === selectedVod.id;
            return (
              <div 
                key={vod.id}
                onClick={() => {
                  setSelectedVod(vod);
                  setIsPlaying(true);
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center ${
                  isCurrent 
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-md' 
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Thumbnail with overlay icon */}
                <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-950 border border-slate-800">
                  <img src={vod.thumbnail} alt={vod.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    {isCurrent && isPlaying ? (
                      <span className="w-3 h-3 bg-amber-400 rounded-full animate-ping"></span>
                    ) : (
                      <Play className="w-4 h-4 text-white fill-current opacity-90" />
                    )}
                  </div>
                  <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-white font-mono text-[9px] px-1 rounded">
                    {vod.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-amber-400">Class {idx + 1}</span>
                    {vod.isDownloaded && (
                      <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1 rounded font-bold">Saved Offline</span>
                    )}
                  </div>
                  <h4 className={`text-xs font-bold line-clamp-1 mt-0.5 ${isCurrent ? 'text-amber-300 font-black' : 'text-slate-200'}`}>
                    {vod.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{vod.views} views • {vod.date}</p>
                </div>

                <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isCurrent ? 'text-amber-400' : 'text-slate-600'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
