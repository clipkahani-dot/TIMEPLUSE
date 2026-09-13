import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, Send, Heart, Flame, MessageSquare, Users, ShieldCheck, 
  Volume2, VolumeX, Maximize2, Sparkles, Pin, CheckCircle2, Download
} from 'lucide-react';

export default function LiveTab({ liveClass, messages, onSendMessage, user }) {
  const [inputText, setInputText] = useState('');
  const [likes, setLikes] = useState(384);
  const [hasLiked, setHasLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [simulatedViewers, setSimulatedViewers] = useState(liveClass ? liveClass.viewers : 1482);
  const chatEndRef = useRef(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Viewers fluctuation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedViewers(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: 'msg-' + Date.now(),
      user: user.name,
      phone: user.phone,
      time: 'Just now',
      text: inputText.trim(),
      badge: 'Student'
    };

    onSendMessage(newMsg);
    setInputText('');

    // Teacher simulated instant response
    setTimeout(() => {
      onSendMessage({
        id: 'msg-reply-' + Date.now(),
        user: 'Dheeraj Sir',
        badge: 'Teacher',
        isTeacher: true,
        time: 'Just now',
        text: `हाँ ${user.name}, ध्यान दें! मात्रक तथा विमा का यह नियम हर बार परीक्षा में पूछा जाता है।`
      });
    }, 2500);
  };

  const handleLike = () => {
    setLikes(prev => prev + 1);
    setHasLiked(true);
  };

  if (!liveClass) {
    return (
      <div className="p-8 text-center space-y-4">
        <Radio className="w-12 h-12 text-slate-500 mx-auto" />
        <h3 className="text-base font-bold text-white">No Live Class In Session</h3>
        <p className="text-xs text-slate-400">Check the schedule for upcoming live lectures by Dheeraj Sir.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-125px)] sm:h-[800px] overflow-hidden">
      {/* Top Video Streaming Player Section */}
      <div className="relative bg-black w-full aspect-video flex-shrink-0 flex items-center justify-center overflow-hidden group">
        {/* Anti-piracy Floating Student Watermark */}
        <div className="absolute top-3 right-3 pointer-events-none z-30 opacity-40 select-none">
          <span className="font-mono text-[10px] bg-black/60 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
            {user.name} ({user.phone.slice(-4)})
          </span>
        </div>

        {/* Video simulation with high quality canvas & teacher badge */}
        <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-2 z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400 p-1 mx-auto bg-slate-900/80 shadow-lg shadow-amber-500/20 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                alt="Dheeraj Sir" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">
                🔴 LIVE STREAMING
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold text-white mt-1 line-clamp-1">
                {liveClass.chapter}
              </h3>
              <p className="text-[11px] text-amber-300 font-medium">Dheeraj Sir • Digital Board Setup</p>
            </div>
          </div>

          {/* Sound waves graphic */}
          <div className="absolute bottom-3 left-3 flex items-end gap-1 pointer-events-none opacity-70">
            <span className="w-1 bg-amber-400 h-3 animate-pulse"></span>
            <span className="w-1 bg-amber-400 h-6 animate-pulse delay-75"></span>
            <span className="w-1 bg-amber-400 h-4 animate-pulse delay-150"></span>
            <span className="w-1 bg-amber-400 h-7 animate-pulse delay-100"></span>
          </div>
        </div>

        {/* Video Overlay Top Controls */}
        <div className="absolute top-2 left-2 z-20 flex items-center gap-2">
          <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
            <Radio className="w-3 h-3 animate-ping" /> LIVE
          </span>
          <span className="bg-black/70 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
            <Users className="w-3 h-3 text-sky-400" /> {simulatedViewers.toLocaleString()}
          </span>
          <span className="bg-black/70 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
            1080p Full HD
          </span>
        </div>

        {/* Video Overlay Bottom Controls */}
        <div className="absolute bottom-2 right-2 z-20 flex items-center gap-1.5 opacity-90">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/90 backdrop-blur-sm"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={() => alert('Full screen mode triggered for Live Class')}
            className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/90 backdrop-blur-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Class Information Strip */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="min-w-0 flex-1 pr-2">
          <h4 className="text-xs font-bold text-white truncate">{liveClass.title}</h4>
          <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Private Live Stream • Railway & Bihar SI
          </p>
        </div>

        <button 
          onClick={handleLike}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            hasLiked 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current text-red-500' : ''}`} />
          <span>{likes}</span>
        </button>
      </div>

      {/* Real-Time Live Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-slate-950/60">
        {/* Pinned Teacher Message */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 shadow-sm">
          <Pin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-extrabold text-amber-400">Dheeraj Sir (Pinned): </span>
            <span className="text-slate-200">
              सभी छात्र ध्यान दें, आज का यह लेक्चर अत्यंत महत्वपूर्ण है। क्लास के तुरंत बाद डिजिटल बोर्ड पीडीएफ नोट्स डाउनलोड सेक्शन में मिल जाएगा!
            </span>
          </div>
        </div>

        {/* Chat message bubbles */}
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`p-2.5 rounded-xl border text-xs leading-relaxed ${
              msg.isTeacher 
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-100 shadow-sm' 
                : 'bg-slate-900/90 border-slate-800 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className={`font-bold ${msg.isTeacher ? 'text-amber-400' : 'text-sky-400'}`}>
                  {msg.user}
                </span>
                {msg.badge && (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                    msg.isTeacher ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {msg.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] text-slate-500">{msg.time}</span>
            </div>
            <p className="text-[11px] text-slate-300 font-normal">{msg.text}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Live Chat Input Bar */}
      <form 
        onSubmit={handleSend}
        className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2 flex-shrink-0"
      >
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Dheeraj Sir in live chat..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
        />
        <button 
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
