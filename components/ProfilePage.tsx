
import React, { useState } from 'react';
import { 
  ArrowLeft, Camera, User, Phone, Send, Shield, Bell, 
  CheckCircle, ChevronRight, LogOut, FileText, Share2, 
  Lock, UserCheck, Smartphone, Mail, Globe, Sparkles
} from 'lucide-react';

type ProfileView = 'menu' | 'identity' | 'security' | 'kyc' | 'notifications';

const ProfilePage: React.FC = () => {
  const [activeView, setActiveView] = useState<ProfileView>('menu');

  // Common Back Button Component
  const BackHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <header className="px-4 py-6 border-b border-white/5 sticky top-0 bg-[#050505]/80 backdrop-blur-md z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setActiveView('menu')}
          className="p-2 -ml-2 text-white hover:bg-zinc-800 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">
            {subtitle || 'Profile'}
          </p>
          <h2 className="text-xl font-black text-white tracking-tight leading-none">
            {title}
          </h2>
        </div>
      </div>
    </header>
  );

  // --- SUB-VIEWS ---

  const IdentityForm = () => (
    <div className="animate-in slide-in-from-right duration-300">
      <BackHeader title="Personal information" subtitle="Identity" />
      <div className="p-4 space-y-6">
        <p className="text-sm text-zinc-500 font-medium leading-relaxed">
          Keep your personal information aligned with the new dashboard aesthetic. Directly stored on secure nodes.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 px-4 text-sm font-bold text-white focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Email</label>
            <input 
              type="email" 
              defaultValue="tommygreymassey@yahoo.com" 
              className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 px-4 text-sm font-bold text-zinc-400 focus:outline-none focus:border-emerald-500/50 transition-all cursor-not-allowed"
              disabled
            />
            <p className="text-[10px] font-bold text-zinc-600 italic">Email changes require support</p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Phone Number</label>
            <input 
              type="tel" 
              placeholder="Enter your phone number" 
              className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 px-4 text-sm font-bold text-white focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Telegram Username</label>
            <input 
              type="text" 
              placeholder="@username" 
              className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 px-4 text-sm font-bold text-white focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>
        </div>

        <button className="w-full py-4 bg-[#10b981] hover:bg-[#059669] text-black font-black rounded-xl uppercase tracking-widest text-sm transition-all shadow-xl active:scale-[0.98] mt-4">
          Save changes
        </button>
      </div>
    </div>
  );

  const SecurityForm = () => (
    <div className="animate-in slide-in-from-right duration-300">
      <BackHeader title="Password & protection" subtitle="Security" />
      <div className="p-4 space-y-6">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-start gap-4">
          <Shield className="text-emerald-500 shrink-0" size={20} />
          <p className="text-sm font-bold text-zinc-300">
            2FA (Two-Factor Authentication) coming soon to EliteAlgoX.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Current Password</label>
            <input 
              type="password" 
              placeholder="Enter current password" 
              className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 px-4 text-sm font-bold text-white focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">New Password</label>
            <input 
              type="password" 
              placeholder="Enter new password" 
              className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 px-4 text-sm font-bold text-white focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>
        </div>

        <button className="w-full py-4 bg-[#10b981] hover:bg-[#059669] text-black font-black rounded-xl uppercase tracking-widest text-sm transition-all shadow-xl active:scale-[0.98]">
          Update Password
        </button>
      </div>
    </div>
  );

  const KYCOverview = () => (
    <div className="animate-in slide-in-from-right duration-300">
      <BackHeader title="Verification overview" subtitle="KYC" />
      <div className="p-4 space-y-6">
        <div className="bg-[#0c1a12] border border-emerald-500/20 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="text-emerald-500" size={24} />
          </div>
          <p className="text-sm font-black text-white leading-relaxed">
            All documents submitted - pending review
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-4">
            <div>
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Identity</p>
              <h4 className="text-lg font-black text-white">Government ID</h4>
              <div className="flex items-center gap-1.5 mt-1 text-emerald-500">
                <CheckCircle size={14} />
                <span className="text-xs font-black uppercase tracking-widest">Verified</span>
              </div>
            </div>
            <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-zinc-500 font-bold text-sm flex items-center justify-center gap-2 hover:border-emerald-500/40 hover:text-emerald-500 transition-all">
              <Camera size={18} /> Upload ID document
            </button>
          </div>

          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-4">
            <div>
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Address</p>
              <h4 className="text-lg font-black text-white">Proof of residence</h4>
              <div className="flex items-center gap-1.5 mt-1 text-emerald-500">
                <CheckCircle size={14} />
                <span className="text-xs font-black uppercase tracking-widest">Verified</span>
              </div>
            </div>
            <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-zinc-500 font-bold text-sm flex items-center justify-center gap-2 hover:border-emerald-500/40 hover:text-emerald-500 transition-all">
              <Globe size={18} /> Upload residence proof
            </button>
          </div>
        </div>

        <button className="w-full py-4 border border-zinc-800 text-zinc-400 font-black rounded-xl uppercase tracking-widest text-sm hover:text-white transition-all">
          View submitted documents
        </button>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="animate-in slide-in-from-right duration-300">
      <BackHeader title="Stay in the loop" subtitle="Notifications" />
      <div className="p-4 space-y-6">
        <p className="text-sm text-zinc-500 font-medium">Customize how we reach you.</p>

        <div className="space-y-3">
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
            <div className="pr-4">
              <h4 className="text-base font-black text-white">Email notifications</h4>
              <p className="text-xs text-zinc-500 font-bold mt-1">Approvals, transfers, and account changes.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
            <div className="pr-4">
              <h4 className="text-base font-black text-white">Push notifications</h4>
              <p className="text-xs text-zinc-500 font-bold mt-1">Trades, wallets, and alerts inside the app.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  // --- MAIN MENU VIEW ---

  if (activeView === 'identity') return <IdentityForm />;
  if (activeView === 'security') return <SecurityForm />;
  if (activeView === 'kyc') return <KYCOverview />;
  if (activeView === 'notifications') return <NotificationSettings />;

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <header className="p-6 pb-2">
        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Profile</p>
        <h2 className="text-3xl font-black text-white tracking-tight">Account preferences</h2>
      </header>

      <div className="px-6 space-y-8">
        {/* User Card */}
        <div className="flex flex-col items-center py-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-emerald-500/20 flex items-center justify-center text-4xl font-black text-white">
              F
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#050505] text-black hover:scale-110 transition-transform">
              <Camera size={14} strokeWidth={3} />
            </button>
          </div>
          <h3 className="text-2xl font-black text-white">Franklin</h3>
          <p className="text-sm text-zinc-500 font-bold mb-3">tommygreymassey@yahoo.com</p>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-1 rounded-full flex items-center gap-2">
            <Sparkles size={12} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Free member</span>
          </div>
          <p className="text-[10px] font-black text-zinc-700 mt-4 tabular-nums uppercase tracking-tighter">
            ID: #504b4baf-3e2f-4e0f-9e99-9b7b6ee19153
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-[#121212] border border-white/5 rounded-[24px] overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Member since</span>
            <span className="text-sm font-black text-white">Oct 2025</span>
          </div>
          <div className="flex items-center justify-between p-5">
            <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Last login</span>
            <span className="text-sm font-black text-white">Dec 31, 2025</span>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="space-y-8">
          {/* Identity & Contact */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">Identity & Contact</h4>
            <div className="grid gap-3">
              <button 
                onClick={() => setActiveView('identity')}
                className="w-full bg-[#121212] border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <User size={18} className="text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-sm font-black text-white">Personal Information</h5>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">Edit Profile</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-zinc-700" />
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex items-center gap-3 group">
                  <Phone size={16} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                  <div className="text-left">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Phone</p>
                    <p className="text-[11px] font-black text-zinc-700 uppercase">Not set</p>
                  </div>
                </button>
                <button className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex items-center gap-3 group">
                  <Send size={16} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                  <div className="text-left">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Telegram</p>
                    <p className="text-[11px] font-black text-zinc-700 uppercase">Not connected</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Security & Verification */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">Security & Trust</h4>
            <div className="grid gap-3">
              <button 
                onClick={() => setActiveView('security')}
                className="w-full bg-[#121212] border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Lock size={18} className="text-orange-500" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-sm font-black text-white">Password & 2FA</h5>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">Secure your account</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-zinc-700" />
              </button>

              <button 
                onClick={() => setActiveView('kyc')}
                className="w-full bg-[#121212] border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <UserCheck size={18} className="text-blue-500" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-sm font-black text-white">KYC Verification</h5>
                    <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-0.5">Pending Review</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-zinc-700" />
              </button>
            </div>
          </div>

          {/* Settings & Actions */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">Settings & Quick Moves</h4>
            <div className="grid gap-3">
              <button 
                onClick={() => setActiveView('notifications')}
                className="w-full bg-[#121212] border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Bell size={18} className="text-purple-500" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-sm font-black text-white">Notifications</h5>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">App & Email alerts</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-zinc-700" />
              </button>

              <div className="grid grid-cols-1 gap-3">
                <button className="w-full bg-[#121212] border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                      <FileText size={18} className="text-zinc-400" />
                    </div>
                    <h5 className="text-sm font-black text-white">Transaction history</h5>
                  </div>
                  <ChevronRight size={18} className="text-zinc-700" />
                </button>
                <button className="w-full bg-[#121212] border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                      <Share2 size={18} className="text-zinc-400" />
                    </div>
                    <h5 className="text-sm font-black text-white">Referrals</h5>
                  </div>
                  <ChevronRight size={18} className="text-zinc-700" />
                </button>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 font-black rounded-2xl uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-red-500/20 transition-all mt-6">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
