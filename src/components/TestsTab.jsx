import React, { useState, useEffect } from 'react';
import { 
  FileCheck, Clock, Award, CheckCircle2, XCircle, AlertCircle, 
  RotateCcw, Sparkles, ChevronLeft, ChevronRight, ShieldCheck, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TestsTab({ testData }) {
  const [testState, setTestState] = useState('intro'); // 'intro', 'active', 'result'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(testData.durationMinutes * 60);

  // Timer countdown
  useEffect(() => {
    let timer;
    if (testState === 'active' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testState, timeLeft]);

  const handleStartTest = () => {
    setSelectedAnswers({});
    setMarkedForReview({});
    setCurrentIndex(0);
    setTimeLeft(testData.durationMinutes * 60);
    setTestState('active');
  };

  const handleSelectOption = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleClearAnswer = (qId) => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleToggleReview = (qId) => {
    setMarkedForReview(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleSubmitTest = () => {
    setTestState('result');
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  // Format time MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Score Calculation
  const currentQ = testData.questions[currentIndex];
  const totalQuestions = testData.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;

  if (testState === 'result') {
    testData.questions.forEach(q => {
      const userAns = selectedAnswers[q.id];
      if (userAns !== undefined) {
        if (userAns === q.correctAnswer) {
          score += 2;
          correctCount += 1;
        } else {
          score -= 0.5;
          wrongCount += 1;
        }
      }
    });
  }

  // --------------------------------------------------
  // Screen 1: Test Intro / Instructions
  // --------------------------------------------------
  if (testState === 'intro') {
    return (
      <div className="pb-24 pt-2 mx-4 space-y-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-1.5 bg-sky-500/20 border border-sky-500/30 text-sky-300 text-[11px] font-extrabold px-3 py-1 rounded-full">
            <FileCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Online CBT Test Engine</span>
          </div>

          <h2 className="text-base sm:text-lg font-black text-white leading-snug">
            {testData.title}
          </h2>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-bold">Questions</span>
              <span className="text-sm font-black text-amber-400">{totalQuestions} Qs</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-bold">Total Marks</span>
              <span className="text-sm font-black text-emerald-400">{testData.totalMarks} Marks</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-bold">Duration</span>
              <span className="text-sm font-black text-sky-400">{testData.durationMinutes} Mins</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> परीक्षा निर्देश (Exam Marking Rules):
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400 leading-relaxed">
              <li>प्रत्येक सही उत्तर के लिए <strong>+2 अंक</strong> दिए जाएंगे।</li>
              <li>प्रत्येक गलत उत्तर के लिए <strong>-0.5 अंक (Negative Marking)</strong> काटा जाएगा।</li>
              <li>अनअटेम्प्टेड प्रश्नों के लिए कोई अंक नहीं कटेगा।</li>
              <li>सबमिट करने पर तुरंत परिणाम और हिंदी व्याख्या (Explanation) दिखेगी।</li>
            </ul>
          </div>

          <button
            onClick={handleStartTest}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <span>Start Test Now (शुरू करें)</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Screen 2: Active CBT Exam Interface
  // --------------------------------------------------
  if (testState === 'active') {
    return (
      <div className="flex flex-col h-[calc(100vh-130px)] sm:h-[800px] bg-slate-950 select-none">
        {/* Exam Header Strip with Live Timer */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">CBT EXAM PORTAL</span>
            <h3 className="text-xs font-bold text-white truncate max-w-[180px] sm:max-w-xs">{testData.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono font-black text-xs border ${
              timeLeft < 120 
                ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse' 
                : 'bg-slate-800 text-amber-300 border-slate-700'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleSubmitTest}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-md shadow-emerald-600/20"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Question Palette Strip */}
        <div className="bg-slate-900/60 px-3 py-2 border-b border-slate-800 overflow-x-auto flex items-center gap-2 scrollbar-none">
          {testData.questions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isReview = markedForReview[q.id];
            const isCurrent = idx === currentIndex;

            let badgeColor = 'bg-slate-800 text-slate-400 border-slate-700';
            if (isCurrent) {
              badgeColor = 'ring-2 ring-amber-400 font-black';
            }
            if (isAnswered) {
              badgeColor += ' bg-emerald-600 text-white border-emerald-500';
            } else if (isReview) {
              badgeColor += ' bg-purple-600 text-white border-purple-500';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold flex-shrink-0 flex items-center justify-center border transition-all ${badgeColor}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Active Question Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-sky-400">Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="font-bold text-emerald-400">+2.0 / -0.5</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 space-y-2">
            <p className="text-sm font-bold leading-relaxed">{currentQ.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected 
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-md' 
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                    isSelected 
                      ? 'bg-amber-400 text-slate-950 border-amber-400' 
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {optionLetters[optIdx]}
                  </div>
                  <span className="text-xs sm:text-sm font-medium flex-1">{opt}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exam Navigation Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleClearAnswer(currentQ.id)}
              className="text-[11px] font-bold text-slate-400 hover:text-white px-2 py-1"
            >
              Clear
            </button>
            <button
              onClick={() => handleToggleReview(currentQ.id)}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                markedForReview[currentQ.id] 
                  ? 'bg-purple-600/30 text-purple-300 border-purple-500' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {markedForReview[currentQ.id] ? 'Marked ★' : 'Review'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentIndex <= 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (currentIndex < totalQuestions - 1) {
                  setCurrentIndex(prev => prev + 1);
                } else {
                  handleSubmitTest();
                }
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md shadow-amber-500/20"
            >
              <span>{currentIndex < totalQuestions - 1 ? 'Save & Next' : 'Submit Exam'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Screen 3: Instant Result & Detailed Hindi Solutions
  // --------------------------------------------------
  return (
    <div className="pb-24 pt-2 mx-4 space-y-4">
      {/* Score Summary Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/40 text-center space-y-3 shadow-2xl relative overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
          <Award className="w-6 h-6" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">CBT TEST RESULT</span>
          <h2 className="text-2xl font-black text-white mt-1">{score.toFixed(1)} / {testData.totalMarks}</h2>
          <p className="text-xs text-slate-300 font-medium">Great effort! Review your solutions below.</p>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 text-center">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-emerald-400 font-bold block">Correct (+2)</span>
            <span className="text-sm font-black text-white">{correctCount}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-red-400 font-bold block">Wrong (-0.5)</span>
            <span className="text-sm font-black text-white">{wrongCount}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block">Unattempted</span>
            <span className="text-sm font-black text-white">{totalQuestions - answeredCount}</span>
          </div>
        </div>

        <button
          onClick={handleStartTest}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 mt-2"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Retake Mock Test</span>
        </button>
      </div>

      {/* Detailed Solutions & Explanations List */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          <span>Detailed Solutions & Hindi Explanations ({totalQuestions})</span>
        </h3>

        {testData.questions.map((q, idx) => {
          const userAns = selectedAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;
          const isAttempted = userAns !== undefined;

          return (
            <div key={q.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-black text-amber-400">Q{idx + 1}.</span>
                <p className="text-xs font-bold text-white flex-1">{q.question}</p>
                {isAttempted ? (
                  isCorrect ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex-shrink-0">
                      +2.0 Marks
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 flex-shrink-0">
                      -0.5 Marks
                    </span>
                  )
                ) : (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded flex-shrink-0">
                    Skipped
                  </span>
                )}
              </div>

              {/* Options status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                {q.options.map((opt, optIdx) => {
                  const isThisCorrect = optIdx === q.correctAnswer;
                  const isThisUser = optIdx === userAns;

                  let optClass = 'bg-slate-950 text-slate-400 border-slate-800';
                  if (isThisCorrect) {
                    optClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold';
                  } else if (isThisUser && !isThisCorrect) {
                    optClass = 'bg-red-500/20 text-red-300 border-red-500/50 line-through';
                  }

                  return (
                    <div key={optIdx} className={`p-2 rounded-xl border text-[11px] flex items-center justify-between ${optClass}`}>
                      <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                      {isThisCorrect && <span className="text-emerald-400 font-extrabold text-xs">✓ Correct</span>}
                      {isThisUser && !isThisCorrect && <span className="text-red-400 font-extrabold text-xs">✗ Selected</span>}
                    </div>
                  );
                })}
              </div>

              {/* Hindi Explanation Box */}
              <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 text-xs space-y-1">
                <span className="font-extrabold text-amber-400 block text-[11px]">💡 व्याख्या (Concept Explanation):</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
