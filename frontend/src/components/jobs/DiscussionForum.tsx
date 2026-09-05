'use client';

import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, User, Award, CheckCircle2, BarChart3 } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  category: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface DiscussionForumProps {
  jobId?: string;
  itemTitle?: string;
  itemType?: 'job' | 'exam';
}

export default function DiscussionForum({ jobId, itemTitle = 'Community Discussion', itemType = 'job' }: DiscussionForumProps) {
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pollVotes, setPollVotes] = useState({
    opt1: 24, // < 120 Marks
    opt2: 68, // 120 - 135 Marks
    opt3: 112, // 135 - 148 Marks
    opt4: 42, // 148+ Marks
  });

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Aman Sharma',
      category: 'General (UR)',
      text: 'Anyone having issues with the server on the final payment gateway? Does SBI e-pay work better than NetBanking?',
      timestamp: '2 hours ago',
      likes: 8,
    },
    {
      id: '2',
      author: 'Pooja Verma',
      category: 'OBC-NCL',
      text: 'Make sure your OBC-NCL certificate is issued within the crucial date mentioned in clause 7.2 of notification!',
      timestamp: '5 hours ago',
      likes: 19,
    },
  ]);

  const [authorInput, setAuthorInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('General (UR)');

  const totalVotes = pollVotes.opt1 + pollVotes.opt2 + pollVotes.opt3 + pollVotes.opt4;

  const handleVote = (opt: 'opt1' | 'opt2' | 'opt3' | 'opt4') => {
    if (hasVoted) return;
    setPollVotes((prev) => ({ ...prev, [opt]: prev[opt] + 1 }));
    setSelectedPoll(opt);
    setHasVoted(true);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || !authorInput.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: authorInput,
      category: categoryInput,
      text: textInput,
      timestamp: 'Just now',
      likes: 0,
    };

    setComments((prev) => [newComment, ...prev]);
    setTextInput('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-8 my-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Aspirant Community &amp; Discussion</h3>
            <p className="text-xs text-slate-500">Live doubt resolution &amp; expected cutoff predictions</p>
          </div>
        </div>
        <span className="text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">
          {comments.length} Discussion Posts
        </span>
      </div>

      {/* Live Expected Cutoff Poll */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-saffron-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-400">
              Community Cutoff Prediction Poll
            </h4>
          </div>
          <span className="text-[10px] text-slate-300">{totalVotes} Aspirants Voted</span>
        </div>

        <p className="text-xs text-slate-200 font-semibold">
          What is your expected Tier-1 / Screening cutoff for this recruitment?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {[
            { key: 'opt1', label: 'Below 120 Marks', votes: pollVotes.opt1 },
            { key: 'opt2', label: '120 – 135 Marks', votes: pollVotes.opt2 },
            { key: 'opt3', label: '135 – 148 Marks (Most Voted)', votes: pollVotes.opt3 },
            { key: 'opt4', label: 'Above 148+ Marks', votes: pollVotes.opt4 },
          ].map((item) => {
            const pct = Math.round((item.votes / totalVotes) * 100);
            return (
              <button
                key={item.key}
                onClick={() => handleVote(item.key as any)}
                disabled={hasVoted}
                className={`p-3 rounded-xl border text-left relative overflow-hidden transition-all ${
                  selectedPoll === item.key
                    ? 'border-emerald-400 bg-emerald-950/40 text-white'
                    : 'border-slate-700 hover:border-slate-500 bg-slate-800/60 text-slate-200'
                }`}
              >
                {/* Progress bar fill */}
                {hasVoted && (
                  <div
                    className="absolute inset-0 bg-blue-600/30 rounded-xl"
                    style={{ width: `${pct}%` }}
                  ></div>
                )}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-semibold text-xs">{item.label}</span>
                  {hasVoted && <span className="font-bold text-xs">{pct}%</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Doubt / Discussion Form */}
      <form onSubmit={handleAddComment} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
        <span className="font-bold text-slate-800 block">Post your doubt, query, or exam center tip:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Your Name / Nickname *"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <select
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="General (UR)">General (UR)</option>
            <option value="OBC-NCL">OBC-NCL</option>
            <option value="EWS">EWS</option>
            <option value="SC / ST">SC / ST</option>
            <option value="Ex-Servicemen">Ex-Servicemen</option>
          </select>
        </div>

        <textarea
          rows={3}
          placeholder="Ask a question about syllabus, age relaxation, exam shift difficulty..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        ></textarea>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Discussion</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-colors space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                  {c.author.charAt(0)}
                </div>
                <span className="font-bold text-slate-900">{c.author}</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                  {c.category}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">{c.timestamp}</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed pl-8">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
