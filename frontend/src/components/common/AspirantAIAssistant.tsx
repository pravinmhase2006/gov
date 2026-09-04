'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, HelpCircle, ChevronRight, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  options?: string[];
}

const QUICK_PROMPTS = [
  '🎯 Check my Govt & IT Job Eligibility',
  '📚 SSC CGL 2026 Complete Syllabus & Pattern',
  '💻 ISRO Scientist IT vs NIC Scientist-B',
  '💰 Highest Paying Government Jobs in India',
  '⚡ Quantitative Aptitude Speed Calculation Tricks',
];

const KNOWLEDGE_RESPONSES: Record<string, string> = {
  eligibility: `🎓 **Eligibility Quick Advisor:**
- **10th Pass:** SSC MTS, Railway Group D, Post Office GDS, State Police Constable.
- **12th Pass:** SSC CHSL, NDA, RRB NTPC (Clerk/Typist), DRDO CEPTAM, Indian Air Force Agniveer.
- **Graduates (Any stream):** UPSC Civil Services (IAS/IPS), SSC CGL (Income Tax/CBI), IBPS PO/Clerk, SBI PO, State PCS, RBI Grade B.
- **Engineering / IT (B.Tech/BCA/MCA):** ISRO Scientist-SC, NIC Scientist-B, CDAC, DRDO, PSU GATE roles, and Software SDE-1 MNC jobs (TCS, Infosys, Zomato, Swiggy).`,

  ssc: `📚 **SSC CGL 2026 Exam Pattern:**
1. **Tier 1 (Qualifying):** 100 Qs / 200 Marks (60 Mins)
   - Reasoning (25 Qs), General Awareness (25 Qs), Quant (25 Qs), English (25 Qs). Negative marking: 0.50 marks.
2. **Tier 2 (Merit):**
   - Section 1: Mathematical Abilities (30 Qs) + Reasoning (30 Qs) = 180 Marks
   - Section 2: English Language (45 Qs) + General Awareness (25 Qs) = 210 Marks
   - Section 3: Computer Knowledge (20 Qs) + Data Entry Speed Test (DEST)`,

  isro: `💻 **ISRO vs NIC Scientist Comparison:**
- **ISRO Scientist-SC (IT/CS):** Level 10 Pay Matrix (₹56,100 Base + HRA/DA ~ ₹95,000/mo). Focuses on Spacecraft Satellite telemetry systems, Mission AI algorithms, and Embedded C/Rust.
- **NIC Scientist-B:** Group-A Gazetted Post (Level 10 Pay Matrix). Works on National Digital Infrastructure, Cyber Security, Aadhaar & Digital India Cloud Architecture.
- *Both allow engineers with 65%+ or 6.84+ CGPA to apply!*`,

  highest_paying: `💰 **Top 5 Highest Paying Govt Roles in India (2026):**
1. **Reserve Bank of India (RBI) Grade-B Officer:** ~₹1,16,000/month + premium accommodation & perks.
2. **UPSC IAS / IPS / IFS Officers:** Level 10 (Starting ₹56,100 to ₹2,50,000 as Cabinet Secretary) + Govt Bungalow & Vehicle.
3. **SEBI Grade-A Assistant Manager:** ~₹1,40,000/month CTC.
4. **ISRO & DRDO Scientist-SC:** ~₹95,000/month + Research grants & satellite launch bonuses.
5. **State Bank of India (SBI) PO:** ~₹75,000/month + Lease rental allowance up to ₹35,000.`,

  quant: `⚡ **Top 3 Quant Speed Tricks for SSC & Banking:**
1. **Multiplication by 11:** Write first and last digits, add adjacent digits in between (e.g., $35 \\times 11 = 3 [3+5] 5 = 385$).
2. **Squaring numbers ending in 5:** Multiply the tens digit by $(N+1)$ and append 25 (e.g., $65^2 = (6 \\times 7)25 = 4225$).
3. **Percentage Fraction Equivalents:**
   - $1/6 = 16.66\\%$, $1/7 = 14.28\\%$, $1/8 = 12.5\\%$, $1/9 = 11.11\\%$, $1/12 = 8.33\\%$. Memorize these to solve SI/CI & Profit/Loss in under 10 seconds!`,
};

export default function AspirantAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! 🙏 I am **Aspirant AI**, your 24/7 personal career & exam preparation mentor. How can I help you ace your preparation today?',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('eligib') || lower.includes('age') || lower.includes('pass') || lower.includes('qualification')) {
        botReply = KNOWLEDGE_RESPONSES.eligibility;
      } else if (lower.includes('ssc') || lower.includes('cgl') || lower.includes('pattern') || lower.includes('syllabus')) {
        botReply = KNOWLEDGE_RESPONSES.ssc;
      } else if (lower.includes('isro') || lower.includes('nic') || lower.includes('scientist')) {
        botReply = KNOWLEDGE_RESPONSES.isro;
      } else if (lower.includes('salary') || lower.includes('highest') || lower.includes('pay') || lower.includes('money')) {
        botReply = KNOWLEDGE_RESPONSES.highest_paying;
      } else if (lower.includes('trick') || lower.includes('quant') || lower.includes('math') || lower.includes('speed')) {
        botReply = KNOWLEDGE_RESPONSES.quant;
      } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('namaste')) {
        botReply = `Hello Aspirant! 😊 Ask me anything about:
- **Government Jobs (SSC, UPSC, Railways, Banking, Defence)**
- **IT & Tech Careers (SDE, AI/ML, Cloud DevOps, Internships)**
- **Exam Syllabus, Free Mock Tests, Cutoffs & Study Materials**`;
      } else {
        botReply = `Great question! Based on **GovtPrep India** verified database:
- Ensure you review the official notification PDF before applying.
- Practice our **Free Online Mock Tests** daily to build accuracy and speed.
- Try our **Eligibility Calculator** tool to calculate your exact age relaxations for General, OBC, SC, ST & EWS categories!`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-sm rounded-full shadow-2xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all ${
          isOpen ? 'hidden' : 'flex animate-bounce'
        }`}
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <Bot className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></span>
        </div>
        <span>Ask Aspirant AI</span>
        <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">
          FREE
        </span>
      </button>

      {/* Interactive Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-4 flex items-center justify-between border-b border-blue-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">Aspirant AI</h3>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] px-1.5 py-0.2 rounded font-semibold">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Career &amp; Exam Mentor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-slate-50 border-b border-slate-100 p-2 overflow-x-auto flex gap-1.5 no-scrollbar text-xs">
            {QUICK_PROMPTS.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-700 transition-colors shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 leading-relaxed shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-[11px] font-medium text-slate-500">Aspirant AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Govt jobs, syllabus, tricks..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
