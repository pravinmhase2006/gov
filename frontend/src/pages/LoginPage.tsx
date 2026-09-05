import React, { useState } from 'react';
import Link from '@/components/common/Link';
import { useNavigate } from '@/lib/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LogIn,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  UserCheck,
  Award,
  Zap,
  Check,
  Star,
  Users
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [activeRoleFill, setActiveRoleFill] = useState<'admin' | 'user' | null>(null);

  const fillCredentials = (userEmail: string, userPass: string, role: 'admin' | 'user') => {
    setEmail(userEmail);
    setPassword(userPass);
    setActiveRoleFill(role);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setError('Please provide both your email address and password.');
      return;
    }

    setLoading(true);

    try {
      const loggedInUser = await login(cleanEmail, password);
      setSuccessMsg(`Welcome back, ${loggedInUser.name || 'Aspirant'}! Redirecting...`);
      setTimeout(() => {
        if (loggedInUser.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 500);
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || 'Invalid email or password. Please verify your credentials.');
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Empowering 100,000+ Candidates Across India</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
              One platform for all <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">Govt Exams & Tech Careers</span>.
            </h2>
            <p className="text-sm xl:text-base text-slate-300 leading-relaxed">
              Real-time vacancy alerts, official syllabus tracking, high-yield bilingual mock tests, and smart typing assessments tailored for Indian aspirants.
            </p>
          </div>

          {/* Metric Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Real-time</span>
              </div>
              <p className="text-2xl font-black text-white">50K+ Jobs</p>
              <p className="text-xs text-slate-400 mt-0.5">Verified notifications & alerts</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">High Accuracy</span>
              </div>
              <p className="text-2xl font-black text-white">1,500+ Tests</p>
              <p className="text-xs text-slate-400 mt-0.5">Official NTA & SSC pattern</p>
            </div>
          </div>

          {/* Exam Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {['SSC CGL', 'RRB NTPC', 'IBPS PO', 'UPSC CSE', 'State PSC', 'Tech Roles'].map((exam) => (
              <span key={exam} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                {exam}
              </span>
            ))}
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
            <span className="font-medium text-slate-300">Rated 4.9/5 by candidates</span>
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

      {/* RIGHT COLUMN: SIGN IN FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 xl:p-14 bg-slate-950/60 relative">
        {/* Mobile Header */}
        <div className="lg:hidden w-full max-w-md mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
              GP
            </div>
            <span className="font-black text-xl text-white">GovtPrep<span className="text-blue-500">.in</span></span>
          </Link>
          <h1 className="text-2xl font-black text-white">Sign In to GovtPrep</h1>
          <p className="text-xs text-slate-400 mt-1">Access syllabus trackers, bookmarks, and mock tests</p>
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* Top Switcher Tabs */}
          <div className="p-1 bg-slate-900 border border-slate-800 rounded-2xl flex items-center text-xs font-bold">
            <div className="flex-1 py-2.5 text-center rounded-xl bg-blue-600 text-white shadow-sm flex items-center justify-center gap-1.5 cursor-default">
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </div>
            <Link
              to="/register"
              className="flex-1 py-2.5 text-center rounded-xl text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Create Account</span>
            </Link>
          </div>

          {/* Form Container Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="text-xl font-black text-white tracking-tight">Welcome Back</h2>
              <p className="text-xs text-slate-400 mt-1">Enter your email and password to access your account</p>
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
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-white placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please use the verified admin/aspirant credentials below or contact support.'); }} className="text-[11px] text-blue-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
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
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-slate-950"
                  />
                  <span className="text-xs text-slate-400">Remember my session</span>
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
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* QUICK DEMO CREDENTIALS SHORTCUT */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  1-Click Quick Fill Credentials
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => fillCredentials('admin@govtprep.in', 'Admin@123', 'admin')}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    activeRoleFill === 'admin'
                      ? 'bg-purple-950/60 border-purple-500 text-purple-200 ring-1 ring-purple-500'
                      : 'bg-slate-950/80 hover:bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-purple-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Admin Portal</span>
                    </div>
                    {activeRoleFill === 'admin' && <Check className="w-3 h-3 text-purple-400" />}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-1">
                    admin@govtprep.in
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => fillCredentials('aspirant@govtprep.in', 'User@123', 'user')}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    activeRoleFill === 'user'
                      ? 'bg-blue-950/60 border-blue-500 text-blue-200 ring-1 ring-blue-500'
                      : 'bg-slate-950/80 hover:bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-blue-400">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Learner Demo</span>
                    </div>
                    {activeRoleFill === 'user' && <Check className="w-3 h-3 text-blue-400" />}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-1">
                    aspirant@govtprep.in
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-4">
            <Link to="/" className="hover:text-slate-300 transition-colors">
              ← Back to Homepage
            </Link>
            <span>•</span>
            <Link to="/tech-courses" className="hover:text-slate-300 transition-colors">
              Free Tech Courses
            </Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-slate-300 transition-colors">
              Security & Privacy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
