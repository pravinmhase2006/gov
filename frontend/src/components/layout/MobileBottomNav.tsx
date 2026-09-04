import React, { useState } from 'react';
import Link from '@/components/common/Link';
import { usePathname } from '@/lib/navigation';
import { 
  Home, 
  Briefcase, 
  Award, 
  Layers, 
  User, 
  X, 
  Swords, 
  Calculator, 
  BookOpen, 
  FileLock, 
  Keyboard, 
  Sparkles,
  Calendar
} from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Govt Jobs', href: '/jobs', icon: Briefcase },
    { label: 'Mock Tests', href: '/mock-tests', icon: Award },
    { label: 'Tools', action: () => setToolsOpen(true), icon: Layers, isAction: true },
    { label: 'Profile', href: '/dashboard', icon: User },
  ];

  const toolsList = [
    { label: '1v1 Quiz Battle', href: '/quiz-battle', icon: Swords, color: 'text-rose-600 bg-rose-50' },
    { label: 'Cutoff Predictor', href: '/cutoff-predictor', icon: Calculator, color: 'text-sky-600 bg-sky-50' },
    { label: '30-Day Vocab', href: '/vocab-builder', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Document Locker', href: '/document-vault', icon: FileLock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Typing Test', href: '/typing-test', icon: Keyboard, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Study Planner', href: '/study-planner', icon: Calendar, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <>
      {/* Floating Bottom Nav Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 px-2 py-1 shadow-2xl safe-area-pb">
        <div className="flex items-center justify-around">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = !item.isAction && Boolean(item.href) && (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href || '')));

            if (item.isAction) {
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center py-1.5 px-3 text-slate-500 hover:text-blue-600 transition-colors relative group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center -mt-3 shadow-md border border-blue-200">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold mt-0.5 text-blue-600">
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href!}
                className={`flex flex-col items-center justify-center py-1.5 px-3 transition-colors ${
                  isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Tools Quick Drawer Modal */}
      {toolsOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex flex-col justify-end animate-fade-in"
          onClick={() => setToolsOpen(false)}
        >
          <div 
            className="bg-white rounded-t-3xl p-6 space-y-4 shadow-2xl border-t border-slate-200 max-h-[80vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Candidate Preparation & Career Tools</span>
              </div>
              <button 
                onClick={() => setToolsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {toolsList.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setToolsOpen(false)}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all flex flex-col justify-between space-y-2"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${tool.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {tool.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
