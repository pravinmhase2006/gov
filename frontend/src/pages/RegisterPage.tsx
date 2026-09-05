import React, { useState } from 'react';
import Link from '@/components/common/Link';
import { useNavigate } from '@/lib/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  Check,
  Shield,
  Star,
  Award,
  Zap,
  LogIn
} from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [targetExam, setTargetExam] = useState('SSC CGL / CHSL');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the platform guidelines to continue.');
      return;
    }

    setLoading(true);

    try {
      const newUser = await register(cleanName, cleanEmail, password, targetExam);
      setSuccessMsg(`Account created successfully for ${newUser.name || 'you'}! Redirecting to your dashboard...`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 600);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Unable to create account. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* LEFT COLUMN: HERO SHOWCASE (Visible on Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 xl:p-16 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 border-r border-slate-800/80 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding Header */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-white text-lg tracking-wider">
                GP
              </div>
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-white">GovtPrep<span className="text-blue-400">.in</span></span>
              <p className="text-[10px] tracking-wider uppercase font-bold text-slate-400">Sarkari & Tech Career Gateway</p>
            </div>
          </Link>
        </div>

        {/* Center Content / Value Props */}
        <div className="relative z-10 my-auto py-8 space-y-8 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Join 100,000+ Aspirants Starting Today</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Start your journey to a <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">Prestigious Career</span>.
            </h2>
            <p className="text-sm xl:text-base text-slate-300 leading-relaxed">
              Create your free aspirant account to unlock personalized mock test tracking, targeted subject quizzes, official exam syllabus milestones, and streak rewards.
            </p>
          </div>

          {/* Membership Benefits List */}
          <div className="space-y-3">
            {[
              'Unlimited Free Mock Tests & Detailed Solutions in Hindi & English',
              'Instant Exam Vacancy Notifications with Direct Online Links',
              'Interactive Typing Speed & Accuracy Assessment Tools',
              'Full-Stack Tech & Computer Knowledge Prep Tracks'
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Verified Guarantee Badge */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Free Aspirant Access</p>
              <p className="text-[11px] text-slate-400">No hidden subscription fees. Study anytime, on any device.</p>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 pt-6 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-slate-950 flex items-center justify-center font-bold text-[10px] text-white">RS</div>
              <div className="w-7 h-7 rounded-full bg-indigo-600 border-2 border-slate-950 flex items-center justify-center font-bold text-[10px] text-white">PK</div>
              <div className="w-7 h-7 rounded-full bg-cyan-600 border-2 border-slate-950 flex items-center justify-center font-bold text-[10px] text-white">AM</div>
            </div>
            <span className="font-medium text-slate-300">100k+ Successful Mock Submissions</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: REGISTER FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 xl:p-14 bg-slate-950/60 relative">
        {/* Mobile Header */}
        <div className="lg:hidden w-full max-w-md mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
              GP
            </div>
            <span className="font-black text-xl text-white">GovtPrep<span className="text-blue-500">.in</span></span>
          </Link>
          <h1 className="text-2xl font-black text-white">Create Your Account</h1>
          <p className="text-xs text-slate-400 mt-1">Join the premier platform for government and tech exam preparation</p>
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* Top Switcher Tabs */}
          <div className="p-1 bg-slate-900 border border-slate-800 rounded-2xl flex items-center text-xs font-bold">
            <Link
              to="/login"
              className="flex-1 py-2.5 text-center rounded-xl text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Sign In</span>
            </Link>
            <div className="flex-1 py-2.5 text-center rounded-xl bg-blue-600 text-white shadow-sm flex items-center justify-center gap-1.5 cursor-default">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </div>
          </div>

          {/* Form Container Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="text-xl font-black text-white tracking-tight">Create Free Account</h2>
              <p className="text-xs text-slate-400 mt-1">Fill in your details to start practicing immediately</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-2xl flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-2xl flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">{successMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-white placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aspirant@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-white placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Primary Target Exam Category
                </label>
                <div className="relative group">
                  <BookOpen className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-white cursor-pointer"
                  >
                    <option value="SSC CGL / CHSL">SSC (CGL, CHSL, CPO, MTS, GD)</option>
                    <option value="RRB NTPC / Group D">Railways (RRB NTPC, Group D, ALP, JE)</option>
                    <option value="IBPS PO / Clerk / SBI">Banking (IBPS PO, Clerk, SBI PO, RBI)</option>
                    <option value="UPSC CSE / CDS / NDA">Civil & Defence (UPSC CSE, CDS, NDA, AFCAT)</option>
                    <option value="State Police / PSC">State PSC & Police Recruitment</option>
                    <option value="Tech & Software Jobs">Software Development & IT Roles</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Create Password (Min 6 chars)
                </label>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-white placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none p-1 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {password.length > 0 && password.length < 6 && (
                  <p className="text-[11px] text-amber-400 mt-1">
                    Password must be at least 6 characters.
                  </p>
                )}
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-slate-950"
                  />
                  <span className="text-xs text-slate-400">
                    I agree to the <Link to="/disclaimer" className="text-blue-400 hover:underline">Terms of Service</Link> & <Link to="/disclaimer" className="text-blue-400 hover:underline">Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.99] cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Register Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Navigation */}
          <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-4">
            <Link to="/" className="hover:text-slate-300 transition-colors">
              ← Back to Homepage
            </Link>
            <span>•</span>
            <Link to="/tech-courses" className="hover:text-slate-300 transition-colors">
              Tech Courses
            </Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-slate-300 transition-colors">
              Disclaimers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
