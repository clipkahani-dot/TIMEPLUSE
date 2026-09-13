import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, ShieldCheck, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export default function PdfModal({ pdf, onClose, user, onDownload }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  if (!pdf) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col">
      {/* Top Bar */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <h3 className="text-xs sm:text-sm font-bold truncate">{pdf.title}</h3>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setZoom(prev => Math.max(70, prev - 15))}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-300 min-w-[40px] text-center">{zoom}%</span>
          <button 
            onClick={() => setZoom(prev => Math.min(150, prev + 15))}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button 
            onClick={() => onDownload(pdf)}
            className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold ml-1 flex items-center gap-1 text-xs hover:bg-amber-400 transition-colors"
            title="Save for offline viewing"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Save Offline</span>
          </button>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PDF Canvas View Area with Watermark */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 flex items-center justify-center relative select-none">
        {/* Anti-piracy Student Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20 opacity-20">
          <div className="text-amber-400 font-mono text-xl sm:text-3xl font-black rotate-[-25deg] text-center leading-relaxed">
            {user.name} • {user.phone}<br />
            CONFIDENTIAL • TIME PLUS DIGITAL NOTES
          </div>
        </div>

        {/* Slide Document Preview */}
        <div 
          className="bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 max-w-3xl w-full text-slate-100 transition-transform duration-200"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          <div className="border-b border-amber-500/40 pb-3 mb-4 flex items-center justify-between">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">TIME PLUS • DIGITAL BOARD SLIDES</span>
            <span className="text-xs text-sky-400 font-bold">Slide {currentPage} of {pdf.pages}</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-base sm:text-xl font-black text-white text-center">
              अध्याय 01: मात्रक तथा विमा (Unit & Dimension)
            </h2>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs sm:text-sm">
              <p className="text-amber-300 font-bold">🎯 क्लासरूम मुख्य बिंदु (Slide {currentPage}):</p>
              <p className="text-slate-300 leading-relaxed">
                • <strong>भौतिक राशि (Q)</strong> = संख्यात्मक मान (n) × मात्रक (u)<br />
                • <strong>गोल्डन नियम:</strong> n ∝ 1/u (यदि मात्रक बड़ा होगा तो संख्यात्मक मान छोटा होगा)।<br />
                • <strong>मूल मात्रक (7 Fundamental Units):</strong> लंबाई (मीटर), द्रव्यमान (किलोग्राम), समय (सेकंड), विद्युत धारा (एम्पीयर), ताप (केल्विन), ज्योति तीव्रता (कैंडेला), पदार्थ की मात्रा (मोल)।<br />
                • <strong>पूरक मात्रक:</strong> समतल कोण (रेडियन), ठोस कोण (स्टेरेडियन)।
              </p>
            </div>

            <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 text-center">
              💡 यह डिजिटल बोर्ड का संपूर्ण {pdf.pages} स्लाइड्स का हाई-क्वालिटी मास्टर पीडीएफ नोट्स है।
            </div>
          </div>
        </div>
      </div>

      {/* Footer Page Navigation */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>DRM Watermarked Reader ({user.phone})</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="p-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 flex items-center gap-1 font-bold"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="font-bold text-amber-400">Page {currentPage} of {pdf.pages}</span>
          <button 
            disabled={currentPage >= pdf.pages}
            onClick={() => setCurrentPage(prev => Math.min(pdf.pages, prev + 1))}
            className="p-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 flex items-center gap-1 font-bold"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
