import React, { useState } from 'react';
import { 
  X, Lock, Mail, Phone, User, BookOpen, ShieldCheck, 
  Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [targetExam, setTargetExam] = useState('Railway (ALP/Tech/NTPC)');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Format phone or email to standard Supabase email
  const formatEmail = (input) => {
    const cleaned = input.trim();
    if (cleaned.includes('@')) {
      return cleaned;
    }
    // Clean numeric phone digits
    const digits = cleaned.replace(/\D/g, '');
    return `student_${digits}@timeplus.in`;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const email = formatEmail(phoneOrEmail);

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          setErrorMsg('कृपया अपना पूरा नाम दर्ज करें।');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: fullName.trim(),
              phone: phoneOrEmail.includes('@') ? '+91 9229840686' : phoneOrEmail,
              target_exam: targetExam
            }
          }
        });

        if (error) throw error;

        setSuccessMsg('खाता सफलतापूर्वक बन गया! लॉगिन हो रहे हैं...');
        setTimeout(() => {
          onAuthSuccess(data.user);
          onClose();
        }, 1200);
      } else {
        // Login mode
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('गलत मोबाइल नंबर या पासवर्ड। कृपया पुनः प्रयास करें।');
          }
          throw error;
        }

        setSuccessMsg('लॉगिन सफल! आपका स्वागत है।');
        setTimeout(() => {
          onAuthSuccess(data.user);
          onClose();
        }, 800);
      }
    } catch (err) {
      setErrorMsg(err.message || 'लॉगिन में त्रुटि हुई।');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Login for testing
  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo-student-01',
      email: 'student_9229840686@timeplus.in',
      user_metadata: {
        name: 'अमन शर्मा',
        phone: '+91 9229840686',
        target_exam: 'Railway ALP & Bihar SI'
      }
    };
    setSuccessMsg('डेमो छात्र के रूप में लॉगिन सफल!');
    setTimeout(() => {
      onAuthSuccess(demoUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-white">
            {mode === 'login' ? 'छात्र लॉगिन (Login)' : 'नया खाता बनाएं (Register)'}
          </h3>
          <p className="text-xs text-slate-400">
            {mode === 'login' 
              ? 'धीरज सर की लाइव क्लास और टेस्ट सीरीज़ में जुड़ें' 
              : 'सिर्फ 30 सेकंड में अपना फ्री अकाउंट बनाएं'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'login' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            लॉगिन (Login)
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signup' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            रजिस्ट्रेशन (Sign Up)
          </button>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleAuth} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">पूरा नाम (Full Name)</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input 
                  type="text" 
                  required
                  placeholder="उदा: राहुल कुमार"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              मोबाइल नंबर या ईमेल (Mobile No / Email)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="text" 
                required
                placeholder="उदा: 9229840686"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">लक्ष्य परीक्षा (Target Exam)</label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-amber-300 font-bold"
              >
                <option value="Railway (ALP/Tech/NTPC)">Railway (ALP / Tech / Group D / NTPC)</option>
                <option value="Bihar SI & Constable">Bihar SI (दरोगा) & Police Constable</option>
                <option value="SSC (CGL/CHSL/GD)">SSC (CGL / CHSL / GD General Science)</option>
                <option value="State PCS & Other">State PCS & Other Govt Exams</option>
              </select>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">पासवर्ड (Password)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                minLength="6"
                placeholder="कम से कम 6 अक्षर"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-9 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <span>कृपया प्रतीक्षा करें...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'लॉगिन करें (Sign In)' : 'खाता बनाएं (Create Account)'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Fast Demo Login for Evaluation */}
        <div className="pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-[11px] rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>1-क्लिक टेस्ट लॉगिन (अमन शर्मा)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
