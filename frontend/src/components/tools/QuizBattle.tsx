'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Swords, 
  Flame, 
  Trophy, 
  Sparkles, 
  Clock, 
  Bot, 
  User, 
  RotateCcw, 
  Zap, 
  Award,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BattleQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const BATTLE_QUESTIONS: BattleQuestion[] = [
  {
    id: 'bq-1',
    topic: 'Indian Polity',
    question: 'Under which Article of the Indian Constitution is the Comptroller and Auditor General (CAG) of India appointed?',
    options: ['Article 148', 'Article 280', 'Article 324', 'Article 76'],
    correct: 0,
    explanation: 'Article 148 provides for an independent office of the CAG of India.'
  },
  {
    id: 'bq-2',
    topic: 'Modern History',
    question: 'Who founded the "Satya Shodhak Samaj" in Maharashtra in 1873 to fight caste discrimination?',
    options: ['Dr. B.R. Ambedkar', 'Jyotirao Phule', 'Gopal Krishna Gokhale', 'Bal Gangadhar Tilak'],
    correct: 1,
    explanation: 'Mahatma Jyotirao Phule founded Satya Shodhak Samaj in Pune in 1873.'
  },
  {
    id: 'bq-3',
    topic: 'Speed Math',
    question: 'What is 15% of 240 + 25% of 360?',
    options: ['120', '126', '132', '118'],
    correct: 1,
    explanation: '15% of 240 = 36. 25% of 360 = 90. 36 + 90 = 126.'
  },
  {
    id: 'bq-4',
    topic: 'General Science',
    question: 'Which enzyme in human saliva begins the chemical digestion of carbohydrates?',
    options: ['Pepsin', 'Salivary Amylase (Ptyalin)', 'Trypsin', 'Lipase'],
    correct: 1,
    explanation: 'Salivary amylase (ptyalin) breaks down complex starches into maltose in the mouth.'
  },
  {
    id: 'bq-5',
    topic: 'Geography',
    question: 'Which river is known as the "Dakshin Ganga" (Ganga of the South) due to its size and length in peninsular India?',
    options: ['Krishna', 'Cauvery', 'Godavari', 'Mahanadi'],
    correct: 2,
    explanation: 'Godavari is the longest peninsular river (1,465 km), known as Dakshin Ganga.'
  },
  {
    id: 'bq-6',
    topic: 'Tech & CS',
    question: 'In computer networking, what is the default port number for secure HTTPS communication?',
    options: ['Port 80', 'Port 443', 'Port 22', 'Port 8080'],
    correct: 1,
    explanation: 'HTTPS defaults to port 443, whereas unencrypted HTTP uses port 80.'
  },
  {
    id: 'bq-7',
    topic: 'Current Affairs',
    question: 'Where is the headquarters of the Indian Space Research Organisation (ISRO) located?',
    options: ['New Delhi', 'Hyderabad', 'Bengaluru', 'Thiruvananthapuram'],
    correct: 2,
    explanation: 'ISRO headquarters is located at Antariksh Bhavan, Bengaluru, Karnataka.'
  }
];

import { dataService } from '@/services/dataService';

export default function QuizBattle() {
  const [questions, setQuestions] = useState<BattleQuestion[]>(BATTLE_QUESTIONS);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'ended'>('lobby');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [userStreak, setUserStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [opponentName, setOpponentName] = useState('AspirantBot AI (Rank 14)');

  useEffect(() => {
    async function loadDynamicQuestions() {
      const apiQuestions = await dataService.getQuizQuestions();
      if (apiQuestions && apiQuestions.length > 0) {
        const mapped: BattleQuestion[] = apiQuestions.map((q: any) => ({
          id: q.id,
          topic: q.subject || 'General Knowledge',
          question: q.question,
          options: q.options,
          correct: q.correctIndex !== undefined ? q.correctIndex : 0,
          explanation: `Correct Answer: ${q.options[q.correctIndex || 0]}`,
        }));
        setQuestions(mapped);
      }
    }
    loadDynamicQuestions();
  }, []);

  const currentQuestion = questions[currentQIndex] || questions[0];

  // Game countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Bot Answer Simulation
  useEffect(() => {
    if (gameState !== 'playing' || isAnswerRevealed) return;

    // Bot answers within 2.5 to 5 seconds
    const botDelay = Math.random() * 2500 + 2000;
    const botTimeout = setTimeout(() => {
      // 80% bot accuracy
      const isBotCorrect = Math.random() > 0.2;
      if (isBotCorrect) {
        setBotScore(prev => prev + 10);
      }
    }, botDelay);

    return () => clearTimeout(botTimeout);
  }, [currentQIndex, gameState, isAnswerRevealed]);

  const startBattle = () => {
    setGameState('playing');
    setCurrentQIndex(0);
    setTimeLeft(60);
    setUserScore(0);
    setBotScore(0);
    setUserStreak(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerRevealed || gameState !== 'playing') return;

    setSelectedOption(index);
    setIsAnswerRevealed(true);

    const isCorrect = index === currentQuestion.correct;

    if (isCorrect) {
      const streakMultiplier = userStreak >= 2 ? 1.5 : 1;
      const points = Math.round(10 * streakMultiplier);
      setUserScore(prev => prev + points);
      setUserStreak(prev => prev + 1);
    } else {
      setUserStreak(0);
    }

    // Auto advance after 1.2s
    setTimeout(() => {
      if (currentQIndex + 1 < BATTLE_QUESTIONS.length) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswerRevealed(false);
      } else {
        endGame();
      }
    }, 1200);
  };

  const endGame = () => {
    setGameState('ended');
    setIsAnswerRevealed(true);
    if (userScore >= botScore) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Arena Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold border border-red-400/20">
              <Swords className="w-3.5 h-3.5" /> 1v1 Real-Time Quiz Duel Arena
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Speed Battle: 60-Second Aspirant Duel
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Challenge live peers or an adaptive AI in rapid-fire GK, Reasoning & Quant. Test your speed under real-time exam pressure.
            </p>
          </div>

          {gameState === 'playing' && (
            <div className="flex items-center gap-3 bg-red-500/20 border border-red-400/30 px-5 py-3 rounded-2xl">
              <Clock className="w-6 h-6 text-red-400 animate-spin" />
              <div>
                <div className="text-xs text-red-200 uppercase tracking-wider font-bold">Time Left</div>
                <div className="text-2xl font-black text-white">{timeLeft}s</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Game Interface */}
      {gameState === 'lobby' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg space-y-6 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-inner">
            <Swords className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Ready for a Speed Showdown?</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Answer fast to trigger combo multipliers (1.5x score). 10 points per correct answer. 60 seconds on the clock!
            </p>
          </div>

          {/* Opponent Selector */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-800">{opponentName}</div>
                <div className="text-[10px] text-emerald-600 font-semibold">● Ready to Battle</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-600">
              AI Challenger
            </span>
          </div>

          <button
            onClick={startBattle}
            className="w-full max-w-md py-4 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700 text-white font-black text-base rounded-2xl shadow-xl shadow-red-950/20 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Zap className="w-5 h-5 text-amber-300" /> Start 1v1 Battle Now
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Live Split Scorebar */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md grid grid-cols-2 gap-4 relative overflow-hidden">
            {/* User Score */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold">You</div>
                <div className="text-2xl font-black text-blue-600">{userScore} pts</div>
                {userStreak >= 2 && (
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    <Flame className="w-3 h-3 text-amber-500 fill-amber-500" /> {userStreak}x Combo Streak (1.5x Pts)
                  </div>
                )}
              </div>
            </div>

            {/* Opponent Score */}
            <div className="flex items-center justify-end gap-3 text-right">
              <div>
                <div className="text-xs text-slate-400 font-semibold">Opponent</div>
                <div className="text-2xl font-black text-red-600">{botScore} pts</div>
                <div className="text-[10px] text-slate-400 font-medium">{opponentName}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black text-lg shrink-0">
                <Bot className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold pb-2 border-b border-slate-100">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                {currentQuestion.topic}
              </span>
              <span>Question {currentQIndex + 1} of {BATTLE_QUESTIONS.length}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correct;
                
                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300';
                if (isAnswerRevealed) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold ring-2 ring-emerald-500/20';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 font-bold';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerRevealed}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-2xl border text-sm text-left font-medium transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswerRevealed && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerRevealed && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswerRevealed && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed animate-fade-in">
                <strong>💡 Explanation:</strong> {currentQuestion.explanation}
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === 'ended' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-xl space-y-6 max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
              Match Concluded
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {userScore > botScore ? '🏆 Victory! You Won the Duel!' : userScore === botScore ? '🤝 Match Tied!' : '⚡ Good Effort! Duel Finished'}
            </h2>
            <p className="text-xs text-slate-500">
              {userScore > botScore ? 'You outperformed your opponent in speed and accuracy.' : 'Practice again to boost your speed and win streak!'}
            </p>
          </div>

          {/* Score Comparison */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <div className="text-xs text-slate-400 font-semibold">Your Score</div>
              <div className="text-3xl font-black text-blue-600">{userScore} pts</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold">Opponent Score</div>
              <div className="text-3xl font-black text-red-600">{botScore} pts</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={startBattle}
              className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Rematch
            </button>
            <button
              onClick={() => setGameState('lobby')}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Back to Arena Lobby
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
