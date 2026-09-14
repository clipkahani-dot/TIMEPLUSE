import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeTab from './components/HomeTab';
import LiveTab from './components/LiveTab';
import VodTab from './components/VodTab';
import TestsTab from './components/TestsTab';
import DownloadsTab from './components/DownloadsTab';
import AdminPanel from './components/AdminPanel';
import PdfModal from './components/PdfModal';
import { supabase } from './supabaseClient';

import { 
  INITIAL_USER, 
  INITIAL_BATCHES, 
  INITIAL_LIVE_CLASSES, 
  INITIAL_VOD_LECTURES, 
  INITIAL_PDFS, 
  INITIAL_TESTS, 
  INITIAL_CHAT_MESSAGES 
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [isCloudConnected, setIsCloudConnected] = useState(false);

  // App Central State
  const [user, setUser] = useState(INITIAL_USER);
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [liveClasses, setLiveClasses] = useState(INITIAL_LIVE_CLASSES);
  const [vods, setVods] = useState(INITIAL_VOD_LECTURES);
  const [pdfs, setPdfs] = useState(INITIAL_PDFS);
  const [tests, setTests] = useState(INITIAL_TESTS);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [activePdf, setActivePdf] = useState(null);

  // -------------------------------------------------------------
  // Live Cloud Sync with Supabase
  // -------------------------------------------------------------
  useEffect(() => {
    async function syncWithSupabase() {
      try {
        // 1. Fetch Batches from Supabase
        const { data: dbBatches } = await supabase.from('batches').select('*');
        if (dbBatches && dbBatches.length > 0) {
          setBatches(dbBatches.map(b => ({
            ...b,
            studentsCount: b.students_count || b.studentsCount || '18,420+ Students',
            totalLectures: b.total_lectures || b.totalLectures || 48,
            completedLectures: 14,
            originalPrice: b.original_price || b.originalPrice || 1999,
            enrolled: b.id === 'b1'
          })));
        }

        // 2. Fetch Live Classes from Supabase
        const { data: dbLive } = await supabase.from('live_classes').select('*');
        if (dbLive && dbLive.length > 0) {
          setLiveClasses(dbLive.map(l => ({
            ...l,
            isLive: l.is_live,
            streamUrl: l.stream_url
          })));
        }

        // 3. Fetch Tests & Questions from Supabase
        const { data: dbTests } = await supabase.from('tests').select('*');
        const { data: dbQuestions } = await supabase.from('questions').select('*');
        if (dbTests && dbTests.length > 0) {
          const testWithQs = {
            ...dbTests[0],
            durationMinutes: dbTests[0].duration_minutes || 15,
            totalMarks: dbTests[0].total_marks || 14,
            questions: (dbQuestions && dbQuestions.length > 0)
              ? dbQuestions.map(q => ({
                  id: q.id,
                  question: q.question,
                  options: Array.isArray(q.options) ? q.options : JSON.parse(q.options),
                  correctAnswer: q.correct_answer,
                  explanation: q.explanation
                }))
              : INITIAL_TESTS[0].questions
          };
          setTests([testWithQs]);
        }

        // 4. Fetch Live Chat Messages
        const { data: dbChat } = await supabase.from('live_chat').select('*').order('created_at', { ascending: true });
        if (dbChat && dbChat.length > 0) {
          setChatMessages(dbChat.map(c => ({
            id: 'c-' + c.id,
            user: c.user_name,
            phone: c.user_phone,
            time: 'Live',
            text: c.text,
            badge: c.badge,
            isTeacher: c.is_teacher
          })));
        }

        setIsCloudConnected(true);
      } catch (err) {
        console.warn('Supabase sync warning (using local fallback):', err);
      }
    }

    syncWithSupabase();
  }, []);

  // Handlers for Admin additions (Synchronized to Supabase in real-time)
  const handleAddLive = async (newLive) => {
    setLiveClasses(prev => [newLive, ...prev]);
    try {
      await supabase.from('live_classes').insert({
        id: newLive.id,
        batch_id: newLive.batchId || 'b1',
        title: newLive.title,
        faculty: newLive.faculty,
        is_live: true,
        viewers: newLive.viewers,
        stream_url: newLive.streamUrl,
        thumbnail: newLive.thumbnail,
        chapter: newLive.chapter
      });
    } catch (err) {
      console.warn('Supabase live class insert error:', err);
    }
  };

  const handleAddVod = async (newVod) => {
    setVods(prev => [newVod, ...prev]);
    try {
      await supabase.from('vod_lectures').insert({
        id: newVod.id,
        batch_id: newVod.batchId || 'b1',
        chapter: newVod.chapter,
        title: newVod.title,
        duration: newVod.duration,
        video_url: newVod.videoUrl,
        thumbnail: newVod.thumbnail,
        views: newVod.views,
        date: newVod.date,
        file_size: newVod.fileSize
      });
    } catch (err) {
      console.warn('Supabase vod insert error:', err);
    }
  };

  const handleAddPdf = async (newPdf) => {
    setPdfs(prev => [newPdf, ...prev]);
    try {
      await supabase.from('pdf_notes').insert({
        id: newPdf.id,
        batch_id: newPdf.batchId || 'b1',
        title: newPdf.title,
        chapter: newPdf.chapter,
        pages: newPdf.pages,
        file_size: newPdf.fileSize
      });
    } catch (err) {
      console.warn('Supabase pdf insert error:', err);
    }
  };

  const handleAddQuestion = async (newQ) => {
    setTests(prev => {
      const copy = [...prev];
      copy[0].questions.push(newQ);
      copy[0].totalQuestions = copy[0].questions.length;
      copy[0].totalMarks += 2;
      return copy;
    });

    try {
      await supabase.from('questions').insert({
        id: newQ.id,
        test_id: 'test-1',
        question: newQ.question,
        options: newQ.options,
        correct_answer: newQ.correctAnswer,
        explanation: newQ.explanation
      });
    } catch (err) {
      console.warn('Supabase question insert error:', err);
    }
  };

  const handleSendMessage = async (newMsg) => {
    setChatMessages(prev => [...prev, newMsg]);
    try {
      await supabase.from('live_chat').insert({
        live_class_id: 'live-1',
        user_name: newMsg.user,
        user_phone: newMsg.phone,
        badge: newMsg.badge || 'Student',
        is_teacher: !!newMsg.isTeacher,
        text: newMsg.text
      });
    } catch (err) {
      console.warn('Supabase chat insert error:', err);
    }
  };

  const handleSelectLecture = (lec) => {
    setActiveTab('vod');
  };

  const handleSelectPdf = (pdf) => {
    setActivePdf(pdf);
  };

  const handleDownloadPdf = (pdf) => {
    setPdfs(prev => prev.map(p => p.id === pdf.id ? { ...p, isDownloaded: true } : p));
    alert('✅ ' + pdf.title + ' saved for offline viewing!');
  };

  const hasLiveClass = liveClasses.some(l => l.isLive);
  const downloadCount = vods.filter(v => v.isDownloaded).length + pdfs.filter(p => p.isDownloaded).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-0 sm:p-4">
      {/* Cloud Status Indicator Ribbon */}
      <div className="w-full max-w-md sm:max-w-5xl mb-2 px-2 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isCloudConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
          <span className="font-bold text-slate-300">
            {isCloudConnected ? '⚡ Supabase Cloud Connected (Mumbai Server)' : 'Connecting to Cloud...'}
          </span>
        </div>
        <span className="text-amber-400 font-bold hidden sm:inline">
          TIME PLUS Official Platform
        </span>
      </div>

      {/* Container: Smartphone Frame on Desktop, full screen on mobile */}
      <div 
        className={`w-full transition-all duration-300 flex flex-col bg-slate-950 relative ${
          isMobileFrame 
            ? 'max-w-md sm:h-[880px] sm:rounded-[36px] sm:border-[8px] sm:border-slate-800 sm:shadow-2xl sm:overflow-hidden sm:ring-1 sm:ring-slate-700' 
            : 'max-w-5xl min-h-screen sm:rounded-2xl sm:border sm:border-slate-800'
        }`}
      >
        {/* Header */}
        <Header 
          user={user} 
          isAdmin={isAdmin} 
          onToggleAdmin={() => setIsAdmin(!isAdmin)}
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {isAdmin ? (
            <AdminPanel 
              onBackToApp={() => setIsAdmin(false)}
              onAddLive={handleAddLive}
              onAddVod={handleAddVod}
              onAddPdf={handleAddPdf}
              onAddQuestion={handleAddQuestion}
            />
          ) : (
            <>
              {activeTab === 'home' && (
                <HomeTab 
                  batches={batches}
                  liveClasses={liveClasses}
                  vods={vods}
                  tests={tests}
                  pdfs={pdfs}
                  onSelectTab={setActiveTab}
                  onSelectLecture={handleSelectLecture}
                  onSelectTest={() => setActiveTab('tests')}
                  user={user}
                />
              )}

              {activeTab === 'live' && (
                <LiveTab 
                  liveClass={liveClasses[0]}
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                  user={user}
                />
              )}

              {activeTab === 'vod' && (
                <VodTab 
                  vods={vods}
                  pdfs={pdfs}
                  onSelectPdf={handleSelectPdf}
                  user={user}
                />
              )}

              {activeTab === 'tests' && (
                <TestsTab 
                  testData={tests[0]}
                />
              )}

              {activeTab === 'downloads' && (
                <DownloadsTab 
                  vods={vods}
                  pdfs={pdfs}
                  onSelectLecture={handleSelectLecture}
                  onSelectPdf={handleSelectPdf}
                  user={user}
                />
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation */}
        {!isAdmin && (
          <BottomNav 
            activeTab={activeTab} 
            onSelectTab={setActiveTab}
            hasLive={hasLiveClass}
            downloadCount={downloadCount}
          />
        )}

        {/* PDF Modal Viewer */}
        {activePdf && (
          <PdfModal 
            pdf={activePdf}
            onClose={() => setActivePdf(null)}
            user={user}
            onDownload={handleDownloadPdf}
          />
        )}
      </div>
    </div>
  );
}
