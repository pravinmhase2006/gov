'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  MessageSquare, 
  Mail, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Smartphone,
  Check
} from 'lucide-react';

interface JobAlertModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  triggerButton?: boolean;
}

export default function JobAlertModal({ isOpen: controlledIsOpen, onClose, triggerButton = true }: JobAlertModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [channel, setChannel] = useState<'whatsapp' | 'telegram' | 'email'>('whatsapp');
  const [contact, setContact] = useState('');
  const [selectedExams, setSelectedExams] = useState<string[]>(['SSC & Central Govt', 'Tech SDE & Internships']);
  const [frequency, setFrequency] = useState<'instant' | 'daily'>('instant');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  const handleOpen = () => setInternalOpen(true);
  const handleClose = () => {
    if (onClose) onClose();
    setInternalOpen(false);
    setIsSubmitted(false);
  };

  const examOptions = [
    'SSC & Central Govt (CGL/CHSL)',
    'UPSC CSE & State PCS',
    'Railways & RRB (NTPC/ALP)',
    'Banking & Insurance (IBPS/SBI)',
    'Defence & Police (CDS/NDA/SI)',
    'Tech SDE & Tech Internships'
  ];

  const toggleExam = (exam: string) => {
    if (selectedExams.includes(exam)) {
      setSelectedExams(selectedExams.filter(e => e !== exam));
    } else {
      setSelectedExams([...selectedExams, exam]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    try {
      await fetch('/api/job-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel,
          contact: contact.trim(),
          exams: selectedExams,
          frequency,
        }),
      });
    } catch {
      // Graceful fallback
    }

    setIsSubmitted(true);
  };

  return (
    <>
      {triggerButton && (
        <button
          onClick={handleOpen}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs shadow-md shadow-emerald-950/20 transition-all cursor-pointer"
        >
          <Bell className="w-3.5 h-3.5 animate-bounce" />
          <span>Get Free WhatsApp / Telegram Alerts</span>
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1.5 pr-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/20">
                  <Sparkles className="w-3.5 h-3.5" /> Instant Notification Bot
                </div>
                <h3 className="text-xl font-bold">100% Free WhatsApp & Telegram Alerts</h3>
                <p className="text-xs text-emerald-100/80">
                  Receive admit card releases, result declarations, new vacancies & syllabus changes 30 minutes before official traffic crashes!
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {isSubmitted ? (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-800">Alert Subscription Active!</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      You are now subscribed for <strong>{selectedExams.length} categories</strong> via <strong>{channel.toUpperCase()}</strong> ({contact}).
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-xs text-emerald-800 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Zero spam guarantee. 1-click unsubscribe anytime.</span>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors"
                  >
                    Done & Return to Site
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Channel Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      1. Choose Alert Delivery Channel
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setChannel('whatsapp')}
                        className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                          channel === 'whatsapp'
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-2 ring-emerald-500/20 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        <span>WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setChannel('telegram')}
                        className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                          channel === 'telegram'
                            ? 'bg-sky-50 border-sky-400 text-sky-800 ring-2 ring-sky-500/20 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Send className="w-4 h-4 text-sky-600" />
                        <span>Telegram</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setChannel('email')}
                        className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                          channel === 'email'
                            ? 'bg-indigo-50 border-indigo-400 text-indigo-800 ring-2 ring-indigo-500/20 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Mail className="w-4 h-4 text-indigo-600" />
                        <span>Email Digest</span>
                      </button>
                    </div>
                  </div>

                  {/* Input field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      {channel === 'whatsapp' ? 'WhatsApp Mobile Number' : channel === 'telegram' ? 'Telegram Handle or Mobile' : 'Email Address'}
                    </label>
                    <input
                      type={channel === 'email' ? 'email' : 'text'}
                      required
                      placeholder={
                        channel === 'whatsapp' 
                          ? '+91 98765 43210' 
                          : channel === 'telegram' 
                          ? '@username or +91...' 
                          : 'your.name@gmail.com'
                      }
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Exam Targets Checkboxes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      2. Select Your Target Exams
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {examOptions.map((opt) => {
                        const isSelected = selectedExams.includes(opt);
                        return (
                          <div
                            key={opt}
                            onClick={() => toggleExam(opt)}
                            className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span className="truncate pr-1">{opt}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Frequency Option */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span className="font-semibold text-slate-700">Alert Timing:</span>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="frequency"
                          checked={frequency === 'instant'}
                          onChange={() => setFrequency('instant')}
                          className="accent-emerald-600"
                        />
                        <span>⚡ Real-time</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="frequency"
                          checked={frequency === 'daily'}
                          onChange={() => setFrequency('daily')}
                          className="accent-emerald-600"
                        />
                        <span>📅 8 PM Daily</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Bell className="w-4 h-4" /> Start Receiving Free Alerts
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
