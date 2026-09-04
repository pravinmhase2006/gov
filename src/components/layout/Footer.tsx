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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
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
              <div className="flex items-center gap-3 text-xs">
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

          {/* Qualification Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Jobs By Qualification
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/qualification/10th-pass" className="hover:text-blue-400 transition-colors">
                  10th Pass Govt Jobs (MTS/GD)
                </Link>
              </li>
              <li>
                <Link href="/qualification/12th-pass" className="hover:text-blue-400 transition-colors">
                  12th Pass Jobs (CHSL/Constable)
                </Link>
              </li>
              <li>
                <Link href="/qualification/graduate" className="hover:text-blue-400 transition-colors">
                  Graduate Jobs (CGL/PO/State PSC)
                </Link>
              </li>
              <li>
                <Link href="/qualification/diploma" className="hover:text-blue-400 transition-colors">
                  Diploma Poly Technical Jobs
                </Link>
              </li>
              <li>
                <Link href="/qualification/iti" className="hover:text-blue-400 transition-colors">
                  ITI Trade & Apprentice Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-blue-400 transition-colors">
                  All Central & State Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Exam Sectors */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Top Exam Directories
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/exams/ssc-cgl" className="hover:text-blue-400 transition-colors">
                  SSC CGL & CHSL 2026
                </Link>
              </li>
              <li>
                <Link href="/exams/rrb-ntpc" className="hover:text-blue-400 transition-colors">
                  Railway RRB NTPC & ALP
                </Link>
              </li>
              <li>
                <Link href="/exams/ibps-po" className="hover:text-blue-400 transition-colors">
                  IBPS & SBI Banking Exams
                </Link>
              </li>
              <li>
                <Link href="/exams/upsc-cse" className="hover:text-blue-400 transition-colors">
                  UPSC Civil Services IAS
                </Link>
              </li>
              <li>
                <Link href="/jobs?category=defence-police" className="hover:text-blue-400 transition-colors">
                  Police & Armed Forces Rally
                </Link>
              </li>
              <li>
                <Link href="/exams" className="text-blue-400 font-semibold hover:underline">
                  All 150+ Govt Exams →
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Prep & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/mock-tests" className="hover:text-blue-400 transition-colors">
                  Free Live Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/current-affairs" className="hover:text-blue-400 transition-colors">
                  Daily Current Affairs Capsules
                </Link>
              </li>
              <li>
                <Link href="/previous-papers" className="hover:text-blue-400 transition-colors">
                  Previous Year Papers & PDF
                </Link>
              </li>
              <li>
                <Link href="/syllabus" className="hover:text-blue-400 transition-colors">
                  Topic-wise Syllabus
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
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
                <Link href="/api-docs" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1">
                  ⚡ Swagger API Docs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GovtPrep India. All rights reserved.</p>
          <div className="flex items-center gap-4">
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
              Contact Editorial
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
