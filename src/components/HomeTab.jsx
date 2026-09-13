import React, { useState } from 'react';
import { 
  Play, Radio, Video, FileCheck, ArrowDownCircle, BookOpen, 
  CheckCircle2, Star, Users, Clock, ShieldCheck, Sparkles, 
  ChevronRight, Award, Flame, Download, CreditCard, Check
} from 'lucide-react';

export default function HomeTab({ batches, liveClasses, vods, tests, pdfs, onSelectTab, onSelectLecture, onSelectTest, user }) {
  const [selectedBatch, setSelectedBatch] = useState(batches[0]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const activeLive = liveClasses.find(l => l.isLive);
  const enrolledBatches = batches.filter(b => b.enrolled);
  const storeBatches = batches.filter(b => !b.enrolled);

  const handleBuyCourse = (batch) => {
    setShowCheckoutModal(batch);
    setPaymentSuccess(false);
  };

  const handleCompletePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      if (showCheckoutModal) {
        showCheckoutModal.enrolled = true;
      }
      setShowCheckoutModal(null);
      setPaymentSuccess(false);
    }, 1800);
  };

  return (
    <div className="pb-24 pt-2 space-y-5">
      {/* Active Live Class Alert Banner */}
      {activeLive && (
        <div 
          onClick={() => onSelectTab('live')}
          className="mx-4 p-3.5 rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900 to-red-950/80 border border-red-500/40 shadow-lg shadow-red-950/40 cursor-pointer flex items-center justify-between group hover:border-red-400 transition-all"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              <div className="w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-red-400 uppercase tracking-wider">LIVE NOW</span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded font-bold">
                  {activeLive.viewers.toLocaleString()} Students Watching
                </span>
              </div>
              <p className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                {activeLive.title}
              </p>
            </div>
          </div>
          <button className="flex-shrink-0 bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md shadow-red-600/30">
            <span>Join</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <div className="mx-4 relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-amber-500/30 p-5 shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-extrabold px-2.5 py-1 rounded-full mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Science Master Class</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
            Welcome back, <span className="text-amber-400">{user.name}</span>!
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xs">
            Prepare for Railway ALP, Bihar SI & SSC with Dheeraj Sir's concept-based notes & live classes.
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            <button 
              onClick={() => onSelectTab('live')}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-extrabold px-4 py-2 rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Join Live Class</span>
            </button>
            <button 
              onClick={() => onSelectTab('tests')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all"
            >
              <FileCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Give CBT Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="mx-4 grid grid-cols-4 gap-2">
        <button 
          onClick={() => onSelectTab('live')}
          className="flex flex-col items-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/40 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
            <Radio className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-200 mt-2">Live Class</span>
          <span className="text-[9px] text-red-400 font-semibold">Active</span>
        </button>

        <button 
          onClick={() => onSelectTab('vod')}
          className="flex flex-col items-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-200 mt-2">VOD Videos</span>
          <span className="text-[9px] text-amber-400 font-semibold">DRM Protected</span>
        </button>

        <button 
          onClick={() => onSelectTab('tests')}
          className="flex flex-col items-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
            <FileCheck className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-200 mt-2">CBT Tests</span>
          <span className="text-[9px] text-sky-400 font-semibold">Instant Score</span>
        </button>

        <button 
          onClick={() => onSelectTab('downloads')}
          className="flex flex-col items-center p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <ArrowDownCircle className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-200 mt-2">Downloads</span>
          <span className="text-[9px] text-emerald-400 font-semibold">Offline Mode</span>
        </button>
      </div>

      {/* Enrolled Course Card */}
      <div className="mx-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">My Enrolled Course</h3>
          <span className="text-xs font-bold text-amber-400">1 Course Active</span>
        </div>

        {enrolledBatches.map(batch => (
          <div key={batch.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {batch.badge}
                </span>
                <h4 className="text-sm font-extrabold text-white mt-1.5">{batch.title}</h4>
                <p className="text-xs text-sky-400 font-medium">{batch.faculty}</p>
              </div>
            </div>

            {/* Course Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>Progress: {batch.completedLectures} of {batch.totalLectures} Lectures</span>
                <span className="text-amber-400 font-bold">{Math.round((batch.completedLectures / batch.totalLectures) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500" 
                  style={{ width: `${(batch.completedLectures / batch.totalLectures) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button 
                onClick={() => onSelectTab('vod')}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1"
              >
                <Play className="w-3.5 h-3.5 text-amber-400 fill-current" />
                <span>Continue Learning</span>
              </button>
              <button 
                onClick={() => onSelectTab('tests')}
                className="py-2 px-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Take Mock Test</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Store / Paid Batches */}
      <div className="mx-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Explore Premium Batches</h3>
          </div>
          <span className="text-[11px] text-amber-400 font-bold">100% Private DRM Video</span>
        </div>

        <div className="space-y-3">
          {storeBatches.map(batch => (
            <div 
              key={batch.id} 
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex gap-3">
                <img 
                  src={batch.banner} 
                  alt={batch.title} 
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-slate-700" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      {batch.badge}
                    </span>
                    <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-current" /> {batch.rating}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1 leading-snug line-clamp-2">{batch.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{batch.studentsCount}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-black text-amber-400">₹{batch.price}</span>
                    <span className="text-xs text-slate-500 line-through">₹{batch.originalPrice}</span>
                    <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {batch.discount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><Video className="w-3 h-3 text-amber-400" /> {batch.totalLectures} VOD</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-emerald-400" /> Notes</span>
                  <span className="flex items-center gap-1"><FileCheck className="w-3 h-3 text-sky-400" /> Tests</span>
                </div>
                <button
                  onClick={() => handleBuyCourse(batch)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-4 py-1.5 rounded-xl shadow-md shadow-amber-500/20"
                >
                  Buy Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            {paymentSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-lg font-black text-white">Enrollment Successful!</h3>
                <p className="text-xs text-slate-300">Welcome to {showCheckoutModal.title}. Enjoy your live classes & notes!</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Fast Checkout</span>
                    <h3 className="text-sm font-black text-white mt-1">{showCheckoutModal.title}</h3>
                  </div>
                  <button onClick={() => setShowCheckoutModal(null)} className="text-slate-400 hover:text-white text-sm">✕</button>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Course Fee:</span>
                    <span className="line-through">₹{showCheckoutModal.originalPrice}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Special Discount:</span>
                    <span>-₹{showCheckoutModal.originalPrice - showCheckoutModal.price}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-white text-sm">
                    <span>Total Payable:</span>
                    <span className="text-amber-400">₹{showCheckoutModal.price}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400">Payment Method</span>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-bold text-white">UPI / PhonePe / GPay / Card</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">Zero Gateway Fee</span>
                  </div>
                </div>

                <button
                  onClick={handleCompletePayment}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay ₹{showCheckoutModal.price} & Start Learning</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
