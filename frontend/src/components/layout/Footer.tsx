import React from 'react';
import Link from '@/components/common/Link';
import {
  ShieldAlert,
  Send,
  Mail,
  HelpCircle,
  Award,
  BookOpen,
  Building2,
  FileCheck2,
  CheckCircle,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-sm">
      {/* Disclaimer Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3 text-center md:text-left justify-between">
          <div className="flex items-center gap-2.5 text-xs text-slate-400">
            <ShieldAlert className="w-5 h-5 text-saffron-500 shrink-0" />
            <span>
              <strong>Disclaimer & Advisory:</strong> GovtPrep India is an independent informational & educational portal.
              We are not affiliated with any government recruitment board. Candidates are strictly advised to verify all recruitment details on official government portals before applying.
            </span>
          </div>
          <Link
            href="/disclaimer"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline shrink-0"
          >
            Read Full Disclaimer
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-navy-900 text-white flex items-center justify-center font-black text-lg border border-blue-400">
                <span className="text-saffron-500">G</span>P
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                GovtPrep<span className="text-blue-500"> India</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India's premier trusted destination for fast Government Job alerts, Sarkari Results, Admit Cards, Official Answer Keys, Comprehensive Syllabus & Real-time Live Mock Tests for SSC, Railway, Banking, Police & UPSC examinations.
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Join Free Exam Alert Community
              </h4>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Telegram Channel
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 transition-colors"
                >
                  <span>▶</span> YouTube Lectures
                </a>
              </div>
            </div>
          </div>

          {/* Exam Sectors */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Major Exam Sectors
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/exams?category=SSC" className="hover:text-blue-400 transition-colors">
                  SSC Exams (CGL, CHSL, MTS)
                </Link>
              </li>
              <li>
                <Link href="/exams?category=Railways" className="hover:text-blue-400 transition-colors">
                  Railway Recruitment (RRB NTPC/ALP)
                </Link>
              </li>
              <li>
                <Link href="/exams?category=Banking" className="hover:text-blue-400 transition-colors">
                  Banking & Insurance (IBPS/SBI)
                </Link>
              </li>
              <li>
                <Link href="/exams?category=Defence" className="hover:text-blue-400 transition-colors">
                  Defence (NDA, CDS, AFCAT, Navy)
                </Link>
              </li>
              <li>
                <Link href="/exams?category=UPSC" className="hover:text-blue-400 transition-colors">
                  Civil Services (UPSC CSE/IAS)
                </Link>
              </li>
              <li>
                <Link href="/exams?category=Teaching" className="hover:text-blue-400 transition-colors">
                  Teaching & State Police Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Aspirant Tools */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Aspirant Suite & Prep
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resume-builder" className="hover:text-blue-400 transition-colors">
                  AI Resume & Biodata Maker
                </Link>
              </li>
              <li>
                <Link href="/mock-tests" className="hover:text-blue-400 transition-colors">
                  All-India CBT Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/typing-test" className="hover:text-blue-400 transition-colors">
                  Typing Speed Simulator (DEST)
                </Link>
              </li>
              <li>
                <Link href="/study-planner" className="hover:text-blue-400 transition-colors">
                  Smart Syllabus Study Planner
                </Link>
              </li>
              <li>
                <Link href="/flashcards" className="hover:text-blue-400 transition-colors">
                  Daily 3D Spaced Flashcards
                </Link>
              </li>
              <li>
                <Link href="/quiz-battle" className="hover:text-blue-400 transition-colors">
                  1v1 Live Quiz Arena
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Help &amp; Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About GovtPrep India
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Candidate Helpdesk & Contact
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-blue-400 transition-colors">
                  Disclaimer & Official Notice
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  💬 24/7 Aspirant Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} GovtPrep India. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-400">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-400">
              Terms
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-slate-400">
              Disclaimer
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-400">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
