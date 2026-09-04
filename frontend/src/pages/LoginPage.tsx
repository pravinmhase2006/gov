import React, { useState } from 'react';
import Link from '@/components/common/Link';
import { useNavigate } from '@/lib/navigation';
import { authService } from '@/services/api';
import { LogIn, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock/Real login handler
    setTimeout(() => {
      if (email === 'admin@govtprep.in' && password === 'Admin@123') {
        authService.setUser(
          { id: 'usr-admin', name: 'GovtPrep Administrator', email, role: 'ADMIN' },
          'mock_jwt_token_admin_2026'
        );
        navigate('/admin');
      } else if (email && password) {
        authService.setUser(
          { id: 'usr-aspirant', name: 'Aspirant Rahul', email, role: 'USER' },
          'mock_jwt_token_aspirant_2026'
        );
        navigate('/dashboard');
      } else {
        setError('Please enter valid credentials.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 font-black text-2xl text-slate-900 dark:text-white">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
            GP
          </div>
          <span>GovtPrep.in</span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Sign In to Your Aspirant Account
        </h2>
        <p className="text-xs text-slate-500">
          Access your saved jobs, personalized mock tests, notes, and streak tracking.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl rounded-3xl border border-slate-200 dark:border-slate-800 sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aspirant@govtprep.in"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Tip */}
          <div className="mt-6 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
            <p className="font-bold text-slate-700 dark:text-slate-300">🔑 Demo Access Credentials:</p>
            <p>Candidate: <code className="text-blue-600 font-bold">aspirant@govtprep.in</code> / <code className="text-blue-600 font-bold">User@123</code></p>
            <p>Admin: <code className="text-purple-600 font-bold">admin@govtprep.in</code> / <code className="text-purple-600 font-bold">Admin@123</code></p>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don’t have an account?{' '}
            <Link to="/register" className="font-bold text-blue-600 hover:underline">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
