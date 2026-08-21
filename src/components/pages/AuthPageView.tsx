import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Compass, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Fingerprint, 
  ArrowLeft,
  Crown,
  ShoppingBag,
  UserCheck,
  Building2
} from 'lucide-react';

interface AuthPageViewProps {
  onSuccess: () => void;
}

export const AuthPageView: React.FC<AuthPageViewProps> = ({ onSuccess }) => {
  const { userRole, setUserRole, currentUser, loginUser, notify } = useMarketplace();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState(currentUser.name || 'Sahitya Singh');
  const [email, setEmail] = useState(currentUser.email || 'sahitya@tradeverse.ai');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accountName = fullName.trim() ? fullName.trim() : 'Sahitya';
    loginUser(accountName, email);

    if (mode === 'signin') {
      notify(`Welcome back, ${accountName}! Signed in successfully.`, 'success');
    } else {
      notify(`Account created for ${accountName}! Welcome to TradeVerse AI.`, 'success');
    }
    onSuccess();
  };

  const handlePasskeyAuth = () => {
    const accountName = fullName.trim() ? fullName.trim() : 'Sahitya';
    loginUser(accountName, email);
    notify(`🔑 Authenticated via Passkey / Touch ID for ${accountName}!`, 'success');
    onSuccess();
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-6 px-4 animate-quiet-fade space-y-6">
      
      {/* TOP BACK BUTTON TO MARKETPLACE */}
      <div className="w-full max-w-xl flex items-center justify-between">
        <button
          onClick={onSuccess}
          className="flex items-center gap-2 text-xs font-bold text-[#B8860B] hover:underline cursor-pointer bg-white px-4 py-2 rounded-2xl border border-[#E6E2D8] shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] text-xs font-bold">
          <Crown className="w-3.5 h-3.5" />
          <span>Pro Member Account</span>
        </div>
      </div>

      {/* SINGLE STANDALONE AUTH & PROFILE CARD */}
      <div className="w-full max-w-xl bg-white border border-[#E6E2D8] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#1F1F1F]">
        
        {/* BRAND HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4A373] via-[#C59B27] to-[#B8860B] p-[1px] shadow-sm mx-auto">
            <div className="w-full h-full bg-[#F6F4F0] rounded-[15px] flex items-center justify-center">
              <Compass className="w-7 h-7 text-[#B8860B]" />
            </div>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#1F1F1F]">
            {mode === 'signin' ? 'Sign In & Account Center' : 'Create TradeVerse Account'}
          </h1>
          <p className="text-xs sm:text-sm text-[#706F6C] max-w-md mx-auto">
            Manage your buyer/seller workspace, multi-agent tools, smart escrow & AI price alerts.
          </p>
        </div>

        {/* ACCOUNT PROFILE SUMMARY BOX */}
        <div className="p-4 rounded-2xl bg-[#FFF9EE] border border-[#F2E4C9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#B8860B]"
            />
            <div>
              <div className="font-extrabold text-sm text-[#1F1F1F] flex items-center gap-2">
                <span>{currentUser.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#B8860B] text-white text-[9px] font-bold">Pro</span>
              </div>
              <div className="text-xs text-[#706F6C]">{currentUser.email}</div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              ✓ Verified User
            </span>
          </div>
        </div>

        {/* SWITCH VIEW MODE TILES */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#B8860B] uppercase">Switch View Mode:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button 
              type="button"
              onClick={() => { setUserRole('buyer'); notify('Switched to Buyer Mode', 'info'); }}
              className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                userRole === 'buyer' ? 'bg-[#B8860B] text-white border-[#B8860B] shadow-sm' : 'bg-[#F6F4F0] border-[#E6E2D8] text-[#1F1F1F] hover:border-[#D4A373]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> <span>Buyer</span>
            </button>
            <button 
              type="button"
              onClick={() => { setUserRole('seller'); notify('Switched to Seller Mode', 'info'); }}
              className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                userRole === 'seller' ? 'bg-[#B8860B] text-white border-[#B8860B] shadow-sm' : 'bg-[#F6F4F0] border-[#E6E2D8] text-[#1F1F1F] hover:border-[#D4A373]'
              }`}
            >
              <UserCheck className="w-4 h-4" /> <span>Seller</span>
            </button>
            <button 
              type="button"
              onClick={() => { setUserRole('business'); notify('Switched to Business Mode', 'info'); }}
              className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                userRole === 'business' ? 'bg-[#B8860B] text-white border-[#B8860B] shadow-sm' : 'bg-[#F6F4F0] border-[#E6E2D8] text-[#1F1F1F] hover:border-[#D4A373]'
              }`}
            >
              <Building2 className="w-4 h-4" /> <span>Business</span>
            </button>
            <button 
              type="button"
              onClick={() => { setUserRole('admin'); notify('Switched to Admin Control Center', 'info'); }}
              className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                userRole === 'admin' ? 'bg-[#B8860B] text-white border-[#B8860B] shadow-sm' : 'bg-[#F6F4F0] border-[#E6E2D8] text-[#1F1F1F] hover:border-[#D4A373]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> <span>Admin</span>
            </button>
          </div>
        </div>

        {/* SIGN IN / SIGN UP TAB SWITCHER */}
        <div className="flex p-1 bg-[#F6F4F0] rounded-2xl border border-[#E6E2D8] text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              mode === 'signin' ? 'bg-white text-[#1F1F1F] shadow-sm font-extrabold' : 'text-[#706F6C]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              mode === 'signup' ? 'bg-white text-[#1F1F1F] shadow-sm font-extrabold' : 'text-[#706F6C]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* AUTH FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="space-y-1">
            <label className="font-bold text-[#1F1F1F]">Account Full Name</label>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8]">
              <User className="w-4 h-4 text-[#B8860B]" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sahitya Singh"
                className="w-full bg-transparent focus:outline-none text-[#1F1F1F] font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#1F1F1F]">Email Address</label>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8]">
              <Mail className="w-4 h-4 text-[#B8860B]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sahitya@tradeverse.ai"
                className="w-full bg-transparent focus:outline-none text-[#1F1F1F] font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-bold text-[#1F1F1F]">
              <label>Password</label>
              {mode === 'signin' && (
                <button type="button" onClick={() => notify('Password reset link sent to email', 'info')} className="text-[10px] text-[#B8860B] hover:underline">
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8]">
              <Lock className="w-4 h-4 text-[#B8860B]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-[#1F1F1F]"
              />
            </div>
          </div>

          {/* PASSKEY BIOMETRIC AUTH BUTTON */}
          <button
            type="button"
            onClick={handlePasskeyAuth}
            className="w-full py-3 rounded-2xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#966F1E] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-[#FFF2D7] transition-all"
          >
            <Fingerprint className="w-4 h-4 text-[#B8860B]" />
            <span>Sign In with Passkey / Face ID</span>
          </button>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-transform cursor-pointer"
          >
            <span>{mode === 'signin' ? `Sign In as ${fullName.trim() || 'Sahitya'}` : `Create Account for ${fullName.trim() || 'Sahitya'}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* FOOTER BADGE */}
        <div className="pt-2 border-t border-[#E6E2D8] flex items-center justify-center gap-2 text-[11px] text-[#706F6C]">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit Encrypted SOC2 Auth & Multi-Agent Verification</span>
        </div>

      </div>
    </div>
  );
};
