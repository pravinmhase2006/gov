'use client';

import React, { useState } from 'react';
import { Share2, Send, Copy, Check, X } from 'lucide-react';

interface JobShareModalProps {
  title: string;
  organization: string;
  vacancies: string;
  qualification: string;
  lastDate: string;
  slug: string;
}

export default function JobShareModal({
  title,
  organization,
  vacancies,
  qualification,
  lastDate,
  slug,
}: JobShareModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const jobUrl = typeof window !== 'undefined' ? `${window.location.origin}/jobs/${slug}` : `https://govtprep.in/jobs/${slug}`;

  const shareText = `🚨 *NEW GOVT JOB RECRUITMENT 2026* 🚨

🏢 *Organization:* ${organization}
📋 *Post:* ${title}
👥 *Total Vacancies:* ${vacancies}
🎓 *Qualification:* ${qualification}
⏳ *Last Date to Apply:* ${lastDate}

🔗 *Direct Apply & Details:*
${jobUrl}

_Shared via GovtPrep India (Official Govt Jobs Portal)_`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareOnTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(jobUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
      >
        <Share2 className="w-3.5 h-3.5 text-blue-600" /> Share Notification
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600" /> Share Recruitment Notice
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-slate-700">Pre-formatted Share Card</label>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 font-mono text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {shareText}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={shareOnWhatsApp}
                className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Share WhatsApp</span>
              </button>
              <button
                onClick={shareOnTelegram}
                className="py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Telegram
              </button>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Text Card
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
