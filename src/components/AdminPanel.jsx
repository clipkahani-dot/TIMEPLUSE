import React, { useState } from 'react';
import { 
  Settings, PlusCircle, Radio, Video, BookOpen, FileCheck, 
  Users, IndianRupee, Eye, ArrowLeft, CheckCircle2, Sparkles, Upload
} from 'lucide-react';

export default function AdminPanel({ onBackToApp, onAddLive, onAddVod, onAddPdf, onAddQuestion }) {
  const [activeAdminTab, setActiveAdminTab] = useState('live'); // 'live', 'vod', 'pdf', 'question'

  // Live Class Form State
  const [liveTitle, setLiveTitle] = useState('');
  const [liveChapter, setLiveChapter] = useState('');
  const [liveViewers, setLiveViewers] = useState(1200);

  // VOD Form State
  const [vodTitle, setVodTitle] = useState('');
  const [vodChapter, setVodChapter] = useState('अध्याय 01: मात्रक तथा विमा');
  const [vodDuration, setVodDuration] = useState('45:00 min');

  // PDF Form State
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfPages, setPdfPages] = useState(30);

  // Question Form State
  const [qText, setQText] = useState('');
  const [qOptA, setQOptA] = useState('');
  const [qOptB, setQOptB] = useState('');
  const [qOptC, setQOptC] = useState('');
  const [qOptD, setQOptD] = useState('');
  const [qAns, setQAns] = useState(0);
  const [qExp, setQExp] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const handleCreateLive = (e) => {
    e.preventDefault();
    onAddLive({
      id: 'live-' + Date.now(),
      batchId: 'b1',
      title: liveTitle,
      faculty: 'Science by Dheeraj Sir',
      isLive: true,
      viewers: Number(liveViewers),
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      chapter: liveChapter || 'General Science'
    });
    setSuccessMsg('Live Class Scheduled & Broadcasted Successfully!');
    setLiveTitle('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleCreateVod = (e) => {
    e.preventDefault();
    onAddVod({
      id: 'vod-' + Date.now(),
      batchId: 'b1',
      chapter: vodChapter,
      title: vodTitle,
      duration: vodDuration,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
      views: '1',
      date: 'Today',
      isDownloaded: false,
      fileSize: '150 MB'
    });
    setSuccessMsg('New VOD Lecture Published to Students!');
    setVodTitle('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleCreatePdf = (e) => {
    e.preventDefault();
    onAddPdf({
      id: 'pdf-' + Date.now(),
      batchId: 'b1',
      title: pdfTitle,
      chapter: 'General Science',
      pages: Number(pdfPages),
      fileSize: '8.4 MB',
      isDownloaded: false
    });
    setSuccessMsg('Master Digital Board PDF Notes Uploaded!');
    setPdfTitle('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    onAddQuestion({
      id: 'q-' + Date.now(),
      question: qText,
      options: [qOptA, qOptB, qOptC, qOptD],
      correctAnswer: Number(qAns),
      explanation: qExp
    });
    setSuccessMsg('New Question Added to CBT Test Engine!');
    setQText('');
    setQOptA('');
    setQOptB('');
    setQOptC('');
    setQOptD('');
    setQExp('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Admin Header with Back to Student App Button */}
      <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBackToApp}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400"
            title="Back to Student App"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-black text-white">Teacher Admin Portal</h2>
            <p className="text-[10px] text-amber-400 font-medium">Dheeraj Sir • Management Dashboard</p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
          LIVE DEMO
        </span>
      </div>

      {/* Quick Statistics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold">Students</span>
            <Users className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <p className="text-base font-black text-white mt-1">18,420+</p>
          <span className="text-[9px] text-emerald-400">+142 this week</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold">Live Viewers</span>
            <Radio className="w-3.5 h-3.5 text-red-400" />
          </div>
          <p className="text-base font-black text-white mt-1">1,482</p>
          <span className="text-[9px] text-red-400">Active right now</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold">Courses Sold</span>
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-base font-black text-white mt-1">₹14.7 L</p>
          <span className="text-[9px] text-emerald-400">Gross revenue</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold">Total Tests</span>
            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-base font-black text-white mt-1">8,930</p>
          <span className="text-[9px] text-sky-400">Submissions</span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Management Action Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800 text-xs">
        <button
          onClick={() => setActiveAdminTab('live')}
          className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
            activeAdminTab === 'live' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Live</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('vod')}
          className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
            activeAdminTab === 'vod' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>VOD</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('pdf')}
          className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
            activeAdminTab === 'pdf' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>PDF Notes</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('question')}
          className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
            activeAdminTab === 'question' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>CBT Question</span>
        </button>
      </div>

      {/* 1. Add Live Class Form */}
      {activeAdminTab === 'live' && (
        <form onSubmit={handleCreateLive} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">Start or Schedule Live Class</h3>
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Live Class Title (उदा: मात्रक तथा विमा - मैराथन)</label>
            <input 
              type="text" 
              required
              placeholder="e.g. अध्याय 02: गति एवं वेग - Live Marathon" 
              value={liveTitle} 
              onChange={(e) => setLiveTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Chapter / Subject</label>
              <input 
                type="text" 
                placeholder="उदा: भौतिकी (Physics)" 
                value={liveChapter} 
                onChange={(e) => setLiveChapter(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Simulated Starting Viewers</label>
              <input 
                type="number" 
                value={liveViewers} 
                onChange={(e) => setLiveViewers(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs rounded-xl shadow-md shadow-red-600/20"
          >
            Start Live Broadcast Now
          </button>
        </form>
      )}

      {/* 2. Add VOD Lecture Form */}
      {activeAdminTab === 'vod' && (
        <form onSubmit={handleCreateVod} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">Publish New VOD Video Lecture</h3>
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Lecture Title</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Class 05: गति के समीकरण (v = u + at)" 
              value={vodTitle} 
              onChange={(e) => setVodTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Chapter</label>
              <input 
                type="text" 
                value={vodChapter} 
                onChange={(e) => setVodChapter(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Duration</label>
              <input 
                type="text" 
                value={vodDuration} 
                onChange={(e) => setVodDuration(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md shadow-amber-500/20"
          >
            Publish VOD Video (DRM Encrypted)
          </button>
        </form>
      )}

      {/* 3. Add PDF Notes Form */}
      {activeAdminTab === 'pdf' && (
        <form onSubmit={handleCreatePdf} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">Upload Digital Board PDF Notes</h3>
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">PDF Notes Title</label>
            <input 
              type="text" 
              required
              placeholder="e.g. अध्याय 02: गति एवं वेग - संपूर्ण 30 स्लाइड्स मास्टर नोट्स" 
              value={pdfTitle} 
              onChange={(e) => setPdfTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Number of Digital Board Slides</label>
            <input 
              type="number" 
              value={pdfPages} 
              onChange={(e) => setPdfPages(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md shadow-emerald-500/20"
          >
            Upload & Encrypt PDF Notes
          </button>
        </form>
      )}

      {/* 4. Add CBT Question Form */}
      {activeAdminTab === 'question' && (
        <form onSubmit={handleCreateQuestion} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">Add Question to CBT Test</h3>
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Question Text (in Hindi)</label>
            <textarea 
              required
              rows="2"
              placeholder="उदा: प्रकाश वर्ष (Light Year) निम्नलिखित में से किसका मात्रक है?" 
              value={qText} 
              onChange={(e) => setQText(e.target.value)}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text" 
              required
              placeholder="Option A (उदा: समय का)" 
              value={qOptA} 
              onChange={(e) => setQOptA(e.target.value)}
              className="p-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
            />
            <input 
              type="text" 
              required
              placeholder="Option B (उदा: दूरी का)" 
              value={qOptB} 
              onChange={(e) => setQOptB(e.target.value)}
              className="p-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
            />
            <input 
              type="text" 
              required
              placeholder="Option C (उदा: प्रकाश तीव्रता)" 
              value={qOptC} 
              onChange={(e) => setQOptC(e.target.value)}
              className="p-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
            />
            <input 
              type="text" 
              required
              placeholder="Option D (उदा: ऊर्जा का)" 
              value={qOptD} 
              onChange={(e) => setQOptD(e.target.value)}
              className="p-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Correct Answer</label>
              <select 
                value={qAns} 
                onChange={(e) => setQAns(e.target.value)}
                className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-amber-400 font-bold"
              >
                <option value={0}>Option A is Correct</option>
                <option value={1}>Option B is Correct</option>
                <option value={2}>Option C is Correct</option>
                <option value={3}>Option D is Correct</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Explanation (व्याख्या)</label>
              <input 
                type="text" 
                placeholder="1 Light Year = 9.46 x 10^15 m" 
                value={qExp} 
                onChange={(e) => setQExp(e.target.value)}
                className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md shadow-sky-500/20"
          >
            Add Question to Live Test
          </button>
        </form>
      )}
    </div>
  );
}
