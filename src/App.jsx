import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeTab from './components/HomeTab';
import LiveTab from './components/LiveTab';
import VodTab from './components/VodTab';
import TestsTab from './components/TestsTab';
import DownloadsTab from './components/DownloadsTab';
import AdminPanel from './components/AdminPanel';
import PdfModal from './components/PdfModal';

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

  // App Central State
  const [user, setUser] = useState(INITIAL_USER);
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [liveClasses, setLiveClasses] = useState(INITIAL_LIVE_CLASSES);
  const [vods, setVods] = useState(INITIAL_VOD_LECTURES);
  const [pdfs, setPdfs] = useState(INITIAL_PDFS);
  const [tests, setTests] = useState(INITIAL_TESTS);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [activePdf, setActivePdf] = useState(null);

  // Handlers for Admin additions
  const handleAddLive = (newLive) => {
    setLiveClasses(prev => [newLive, ...prev]);
  };

  const handleAddVod = (newVod) => {
    setVods(prev => [newVod, ...prev]);
  };

  const handleAddPdf = (newPdf) => {
    setPdfs(prev => [newPdf, ...prev]);
  };

  const handleAddQuestion = (newQ) => {
    setTests(prev => {
      const copy = [...prev];
      copy[0].questions.push(newQ);
      copy[0].totalQuestions += 1;
      copy[0].totalMarks += 2;
      return copy;
    });
  };

  const handleSendMessage = (newMsg) => {
    setChatMessages(prev => [...prev, newMsg]);
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
