'use client';

import React, { useState } from 'react';
import { Flame, CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const dailyQuestion = {
  id: 'daily-q1',
  date: 'Today\'s Daily Quiz',
  subject: 'General Awareness & Indian Polity',
  question: 'Under which Article of the Indian Constitution is the Finance Commission of India constituted by the President?',
  options: [
    { key: 'A', text: 'Article 265' },
    { key: 'B', text: 'Article 280' },
    { key: 'C', text: 'Article 312' },
    { key: 'D', text: 'Article 324' },
  ],
  correctAnswer: 'B',
  explanation: 'Article 280 of the Constitution of India provides for the establishment of a Finance Commission every five years to recommend the distribution of net tax proceeds between the Union and the States.',
};

export default function QuestionOfTheDay() {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(4);

  const handleSelect = (key: string) => {
    if (revealed) return;
    setSelected(key);
    setRevealed(true);

    if (key === dailyQuestion.correctAnswer) {
      setStreak((prev) => prev + 1);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const isCorrect = selected === dailyQuestion.correctAnswer;

  return (
    <div className="bg-gradient-to-br from-navy-900 via-blue-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-800/60 shadow-xl space-y-5 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-blue-800/40 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-saffron-500 text-white flex items-center justify-center font-bold text-sm shadow">
            💡
          </span>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">
              Daily Question of the Day
            </h3>
            <span className="text-[11px] text-blue-300">{dailyQuestion.subject}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-saffron-500/20 text-saffron-400 border border-saffron-500/40 px-3 py-1 rounded-full text-xs font-bold">
          <Flame className="w-4 h-4 fill-current text-saffron-500" />
          <span>{streak} Days Streak</span>
        </div>
      </div>

      <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
        {dailyQuestion.question}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
        {dailyQuestion.options.map((opt) => {
          let style = 'bg-slate-900/80 border-slate-800 hover:border-blue-500 text-slate-200';
          if (revealed) {
            if (opt.key === dailyQuestion.correctAnswer) {
              style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
            } else if (opt.key === selected) {
              style = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
            }
          }

          return (
            <button
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${style}`}
            >
              <span className="w-6 h-6 rounded-lg bg-blue-900/60 border border-blue-700/50 flex items-center justify-center font-bold text-xs shrink-0">
                {opt.key}
              </span>
              <span className="flex-1 leading-snug">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div
          className={`p-4 rounded-2xl border text-xs space-y-1.5 animate-in fade-in ${
            isCorrect
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Correct Answer! Streak increased to {streak} days 🔥</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Incorrect. The correct answer is Option {dailyQuestion.correctAnswer}.</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
            <strong>Explanation:</strong> {dailyQuestion.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
