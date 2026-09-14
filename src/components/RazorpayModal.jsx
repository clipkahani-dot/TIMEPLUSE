import React, { useState } from 'react';
import { 
  X, ShieldCheck, CheckCircle2, CreditCard, QrCode, Smartphone, 
  Building, ArrowRight, Download, Sparkles, Check, FileText, Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RazorpayModal({ batch, user, onClose, onPaymentSuccess }) {
  const [activeMethod, setActiveMethod] = useState('upi'); // 'upi', 'card', 'qr', 'netbanking'
  const [upiId, setUpiId] = useState(`${user.phone.replace(/\D/g, '')}@ybl`);
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [processing, setProcessing] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  if (!batch) return null;

  // 18% GST calculation
  const totalAmount = batch.price;
  const basePrice = Math.round((totalAmount / 1.18) * 100) / 100;
  const gstAmount = Math.round((totalAmount - basePrice) * 100) / 100;
  const cgst = Math.round((gstAmount / 2) * 100) / 100;
  const sgst = Math.round((gstAmount / 2) * 100) / 100;

  const handlePay = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setPaidSuccess(true);
      
      const newReceipt = {
        invoiceNo: 'INV-TP-' + Math.floor(100000 + Math.random() * 900000),
        txnId: 'pay_test_' + Date.now().toString(36),
        date: new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        courseTitle: batch.title,
        basePrice,
        cgst,
        sgst,
        totalAmount,
        studentName: user.name,
        studentPhone: user.phone
      };
      setReceiptData(newReceipt);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      onPaymentSuccess(batch);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-black text-xs">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white">Razorpay Secure Checkout</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.2 rounded border border-amber-500/30">
                  SANDBOX TEST MODE
                </span>
              </div>
              <p className="text-[10px] text-slate-400">100% 256-bit Encrypted Payment Gateway</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {paidSuccess && receiptData ? (
          /* Success & Tax Invoice Screen */
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">PAYMENT SUCCESSFUL</span>
              <h3 className="text-base font-black text-white mt-1">कोर्स सफलतापूर्वक अनलॉक हो गया!</h3>
              <p className="text-xs text-slate-300 mt-0.5">अब आप सभी लाइव क्लासेज, नोट्स और टेस्ट दे सकते हैं।</p>
            </div>

            {/* Official GST Invoice Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-mono text-slate-400 text-[10px]">{receiptData.invoiceNo}</span>
                <span className="text-emerald-400 font-bold text-[10px]">PAID • {receiptData.date}</span>
              </div>

              <div className="space-y-1 pt-1 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Student:</span>
                  <span className="text-white font-bold">{receiptData.studentName} ({receiptData.studentPhone})</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Course:</span>
                  <span className="text-white truncate max-w-[200px]">{receiptData.courseTitle}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Base Fee (Course):</span>
                  <span className="text-slate-200 font-mono">₹{receiptData.basePrice}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>CGST (9% HSN 999293):</span>
                  <span className="text-slate-200 font-mono">₹{receiptData.cgst}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>SGST (9%):</span>
                  <span className="text-slate-200 font-mono">₹{receiptData.sgst}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm">
                  <span className="text-white">Total Paid (Inc. 18% GST):</span>
                  <span className="text-amber-400 font-mono">₹{receiptData.totalAmount}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5"
            >
              <span>Start Learning (क्लास शुरू करें)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Payment Selection Form */
          <>
            {/* Batch & Price Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1 pr-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{batch.badge}</span>
                  <h4 className="text-xs font-bold text-white truncate mt-0.5">{batch.title}</h4>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-base font-black text-amber-400">₹{batch.price}</span>
                  <span className="text-[10px] text-slate-500 line-through block">₹{batch.originalPrice}</span>
                </div>
              </div>

              {/* GST Tax Transparency Banner */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>Base: ₹{basePrice} + 18% GST: ₹{gstAmount}</span>
                <span className="text-emerald-400 font-bold">GST Invoice Included ✓</span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveMethod('upi')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeMethod === 'upi' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>UPI ID</span>
              </button>
              <button
                onClick={() => setActiveMethod('qr')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeMethod === 'qr' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>UPI QR</span>
              </button>
              <button
                onClick={() => setActiveMethod('card')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeMethod === 'card' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card</span>
              </button>
            </div>

            {/* UPI Option */}
            {activeMethod === 'upi' && (
              <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-slate-400 block">
                  Enter VPA / UPI ID (PhonePe, GPay, Paytm)
                </label>
                <input 
                  type="text" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  placeholder="e.g. 9229840686@ybl"
                />
                <div className="flex gap-1.5 pt-1">
                  {['@ybl', '@okaxis', '@paytm', '@ibl'].map(suffix => (
                    <button
                      key={suffix}
                      type="button"
                      onClick={() => setUpiId(prev => prev.split('@')[0] + suffix)}
                      className="text-[10px] px-2 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                    >
                      {suffix}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QR Code Option */}
            {activeMethod === 'qr' && (
              <div className="text-center p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-32 h-32 bg-white rounded-xl p-2 mx-auto flex items-center justify-center shadow-inner">
                  {/* Visual QR Simulation */}
                  <div className="w-full h-full border-2 border-slate-900 flex flex-col items-center justify-center p-1 text-slate-900 font-mono text-[8px] text-center font-bold">
                    <span>TIME PLUS UPI</span>
                    <QrCode className="w-16 h-16 my-1 text-slate-950" />
                    <span>SCAN WITH ANY APP</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">Scan using PhonePe, Google Pay, or Paytm</p>
              </div>
            )}

            {/* Card Option */}
            {activeMethod === 'card' && (
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Test Card Number</label>
                  <input 
                    type="text" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Expiry</label>
                    <input 
                      type="text" 
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">CVV</label>
                    <input 
                      type="password" 
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Payment Button */}
            <button
              onClick={handlePay}
              disabled={processing}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying with Bank...</span>
                </span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay ₹{batch.price} (Sandbox Test)</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
