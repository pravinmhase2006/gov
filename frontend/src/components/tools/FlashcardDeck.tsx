'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Lightbulb, 
  Zap, 
  Award,
  Filter,
  Volume2
} from 'lucide-react';

interface Flashcard {
  id: string;
  category: 'Polity' | 'Static GK' | 'Quant Tricks' | 'Current Affairs' | 'Tech Core';
  subCategory: string;
  front: {
    title: string;
    question: string;
    hint?: string;
  };
  back: {
    answer: string;
    keyPoints: string[];
    mnemonic?: string;
    examRelevance: string;
  };
}

const SAMPLE_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Polity',
    subCategory: 'Constitutional Articles',
    front: {
      title: 'Article 32 & Constitutional Remedies',
      question: 'Why did Dr. B.R. Ambedkar call Article 32 the "Heart and Soul" of the Indian Constitution, and which 5 writs can the Supreme Court issue?',
      hint: 'Deals with the Right to Constitutional Remedies under Part III.'
    },
    back: {
      answer: 'Article 32 guarantees the right to move the Supreme Court by appropriate proceedings for the enforcement of Fundamental Rights.',
      keyPoints: [
        'Habeas Corpus (To have the body)',
        'Mandamus (We command)',
        'Prohibition (To forbid)',
        'Certiorari (To be certified/informed)',
        'Quo-Warranto (By what authority)'
      ],
      mnemonic: 'H-M-P-C-Q (How Many People Can Question)',
      examRelevance: 'Repeated 15+ times in UPSC Prelims, SSC CGL & State PSC exams.'
    }
  },
  {
    id: 'fc-2',
    category: 'Polity',
    subCategory: 'Fundamental Duties',
    front: {
      title: '42nd Amendment & Fundamental Duties',
      question: 'Which constitutional amendment added Fundamental Duties, on the recommendation of which committee, and how many are there today?',
      hint: 'Added in 1976 under Part IV-A (Article 51A).'
    },
    back: {
      answer: 'Added by the 42nd Constitutional Amendment Act, 1976 upon the recommendation of the Swaran Singh Committee.',
      keyPoints: [
        'Originally 10 duties were added under Article 51A.',
        'The 11th duty (Right to Education for 6-14 years) was added by the 86th Amendment Act, 2002.',
        'Enforceable? No, they are non-justiciable in court.'
      ],
      mnemonic: 'Duty 11 = 86th Amendment (8+6=14 yrs age)',
      examRelevance: 'SSC CGL Tier 1/2, CDS, NDA, State PCS.'
    }
  },
  {
    id: 'fc-3',
    category: 'Static GK',
    subCategory: 'National Parks & Biospheres',
    front: {
      title: 'Floating National Park of the World',
      question: 'Name the only floating national park in the world, the lake it is situated on, and the endangered deer species found exclusively there.',
      hint: 'Located in Northeast India (Manipur).'
    },
    back: {
      answer: 'Keibul Lamjao National Park on Loktak Lake in Bishnupur district, Manipur.',
      keyPoints: [
        'World\'s only floating national park composed of phumdis (floating decomposed biomass).',
        'Last natural refuge of the endangered Sangai (Dancing Deer) of Manipur.',
        'Loktak Lake is also a Ramsar Wetland of International Importance and under Montreux Record.'
      ],
      mnemonic: 'Loktak = Look at the Floating Deer (Sangai)',
      examRelevance: 'UPSC CSE, SSC CGL, RRB NTPC, AFCAT.'
    }
  },
  {
    id: 'fc-4',
    category: 'Quant Tricks',
    subCategory: 'Speed Mathematics',
    front: {
      title: 'Successive Percentage Formula & Profit/Loss',
      question: 'What is the master shortcut formula for two successive percentage changes of +a% and +b%, and how do you calculate a single discount equivalent for 20% and 10%?',
      hint: 'Net change = a + b + (ab/100)'
    },
    back: {
      answer: 'Net % Change = a + b + (a × b) / 100',
      keyPoints: [
        'For discounts (-20% and -10%): -20 - 10 + [(-20)(-10)/100] = -30 + 2 = -28% effective discount.',
        'If price increases by 25%, consumption must be reduced by [25/(100+25)] × 100 = 20% to keep expenditure constant.',
        'Rule of 100: If A is x% more than B, B is [x/(100+x)] × 100% less than A.'
      ],
      mnemonic: 'Discount Shortcut: (A + B) - (A × B / 100)',
      examRelevance: 'SSC CGL Quant (saves 45 seconds per question), IBPS PO, CAT.'
    }
  },
  {
    id: 'fc-5',
    category: 'Current Affairs',
    subCategory: 'Science & Defence Tech',
    front: {
      title: 'India\'s Gaganyaan & Samudrayaan Missions',
      question: 'What are the target objectives and key vehicle components of India\'s Gaganyaan Human Spaceflight Mission and Samudrayaan Deep Ocean Mission?',
      hint: 'ISRO handles Gaganyaan; NIOT/MoES handles Samudrayaan with MATSYA 6000.'
    },
    back: {
      answer: 'Gaganyaan aims to demonstrate human spaceflight to LEO (400 km) with a 3-member crew. Samudrayaan explores deep-sea minerals at 6,000m depth.',
      keyPoints: [
        'Gaganyaan Launch Vehicle: LVM3 (GSLV Mk-III) with CE-20 cryogenic stage.',
        'Samudrayaan submersible: MATSYA 6000 developed by NIOT Chennai.',
        'Human humanoid robot tested by ISRO: Vyommitra (Half-humanoid).',
        'Crew astronauts designated: Group Captains Prashanth Nair, Ajit Krishnan, Angad Pratap, Shubhanshu Shukla.'
      ],
      mnemonic: 'Vyom = Sky (Gaganyaan), Matsya = Fish (Samudrayaan)',
      examRelevance: 'UPSC CSE 2024-2026, State PCS, SSC CGL Current Affairs.'
    }
  },
  {
    id: 'fc-6',
    category: 'Tech Core',
    subCategory: 'DBMS & SQL Transactions',
    front: {
      title: 'ACID Properties in Databases',
      question: 'What do the 4 ACID properties stand for in Relational Database Systems, and how does Isolation Level prevent "Dirty Reads"?',
      hint: 'Atomicity, Consistency, Isolation, Durability.'
    },
    back: {
      answer: 'ACID guarantees database transaction reliability despite errors, power failures, or concurrent access.',
      keyPoints: [
        'Atomicity: "All or Nothing" transaction commit.',
        'Consistency: Database moves from one valid state to another satisfying constraints.',
        'Isolation: Concurrent transactions do not interfere (Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable).',
        'Durability: Committed transactions persist permanently in non-volatile storage.',
        'Dirty Read: A transaction reads uncommitted data of another concurrent transaction (prevented in Read Committed & above).'
      ],
      mnemonic: 'ACID = Safe Database Recipe',
      examRelevance: 'SDE-1/2 Technical Interviews (Google, Amazon, Microsoft, TCS Digital).'
    }
  },
  {
    id: 'fc-7',
    category: 'Tech Core',
    subCategory: 'System Design & OS',
    front: {
      title: 'Process vs Thread & Context Switching',
      question: 'What are the primary differences between a Process and a Thread in operating systems regarding memory sharing, overhead, and IPC?',
      hint: 'A process is an execution environment; threads share the heap and code segment.'
    },
    back: {
      answer: 'A Process is an independent executing program with its own address space, whereas a Thread is a lightweight execution unit within a process.',
      keyPoints: [
        'Memory: Threads share text segment, data segment, heap, and OS resources; each thread has its own private Stack and Register set.',
        'Context Switching: Thread switching is significantly faster because virtual memory page tables don\'t need reloading.',
        'Inter-Communication: Threads communicate via shared memory; processes require OS IPC (Pipes, Sockets, Shared Memory).',
        'Crash Impact: If one thread segfaults, the entire process terminates; separate processes isolate failures.'
      ],
      mnemonic: 'Process = Apartment Building, Threads = Roommates sharing kitchen/hall',
      examRelevance: 'Software Engineering Core Subjects (Gate CSE, FAANG, ISRO Scientist SC).'
    }
  }
];

export default function FlashcardDeck() {
  const [cards, setCards] = useState<Flashcard[]>(SAMPLE_FLASHCARDS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteryState, setMasteryState] = useState<Record<string, 'mastered' | 'review' | 'learning'>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('govtprep_flashcards_mastery');
      if (saved) {
        setMasteryState(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const categories = ['All', 'Polity', 'Static GK', 'Quant Tricks', 'Current Affairs', 'Tech Core'];

  const filteredCards = selectedCategory === 'All' 
    ? cards 
    : cards.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const handleRateCard = (status: 'mastered' | 'review' | 'learning') => {
    if (!currentCard) return;
    const next = { ...masteryState, [currentCard.id]: status };
    setMasteryState(next);
    try {
      localStorage.setItem('govtprep_flashcards_mastery', JSON.stringify(next));
    } catch {
      // Ignore
    }
    // Auto advance
    setTimeout(() => {
      handleNext();
    }, 200);
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const totalMastered = Object.values(masteryState).filter(s => s === 'mastered').length;
  const totalReviewed = Object.keys(masteryState).length;
  const masteryPercentage = cards.length > 0 ? Math.round((totalMastered / cards.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold border border-purple-400/20">
              <Sparkles className="w-3.5 h-3.5" /> High-Yield Revision Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Daily 3D Flashcards & Formula Deck
            </h1>
            <p className="text-purple-100/80 text-sm max-w-xl">
              Retain 300% more exam syllabus with active recall and spaced repetition for Static GK, Indian Polity Articles, Math Shortcuts, and Tech Core Concepts.
            </p>
          </div>

          {/* Quick Mastery Stat */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 w-full md:w-auto justify-around">
            <div className="text-center">
              <div className="text-2xl font-black text-amber-300">{masteryPercentage}%</div>
              <div className="text-xs text-purple-200">Mastery Rate</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-300">{totalMastered}/{cards.length}</div>
              <div className="text-xs text-purple-200">Cards Mastered</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-purple-300 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-indigo-950 font-bold shadow-md shadow-purple-950/20'
                  : 'bg-white/10 hover:bg-white/20 text-purple-200'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={handleShuffle}
            className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-xs font-semibold border border-purple-400/20 transition-all shrink-0"
            title="Shuffle deck"
          >
            <Shuffle className="w-3.5 h-3.5" /> Shuffle
          </button>
        </div>
      </div>

      {/* Main Flashcard Arena */}
      {currentCard ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Card Meta Top Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-semibold rounded-md border border-indigo-100">
                {currentCard.category}
              </span>
              <span className="text-slate-400">•</span>
              <span>{currentCard.subCategory}</span>
            </div>
            <div>
              Card {currentIndex + 1} of {filteredCards.length}
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div 
            onClick={handleFlip}
            className="relative h-96 sm:h-[420px] w-full cursor-pointer perspective-1000 select-none group"
          >
            <div 
              className={`w-full h-full duration-500 transform-style-preserve-3d transition-transform relative rounded-3xl shadow-xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front Face */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      Q
                    </span>
                    <h3 className="font-bold text-slate-800 text-base sm:text-lg">
                      {currentCard.front.title}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(currentCard.front.question);
                    }}
                    className="p-2 text-slate-400 hover:text-indigo-600 rounded-full hover:bg-slate-100 transition-colors"
                    title="Pronounce Question"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="my-auto py-4">
                  <p className="text-slate-800 text-lg sm:text-xl font-semibold leading-relaxed text-center">
                    "{currentCard.front.question}"
                  </p>
                  {currentCard.front.hint && (
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-amber-700 bg-amber-50 rounded-xl py-2 px-3 border border-amber-100 max-w-md mx-auto">
                      <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                      <span><strong>Hint:</strong> {currentCard.front.hint}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> Click anywhere to reveal answer
                  </span>
                  <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Flip Card <RotateCw className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Back Face */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-indigo-900/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
                      A
                    </span>
                    <h3 className="font-bold text-indigo-200 text-base sm:text-lg">
                      Answer & Explanation
                    </h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(currentCard.back.answer + '. ' + currentCard.back.keyPoints.join('. '));
                    }}
                    className="p-2 text-slate-400 hover:text-emerald-400 rounded-full hover:bg-white/10 transition-colors"
                    title="Pronounce Answer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-y-auto max-h-56 pr-2 my-auto space-y-3">
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    {currentCard.back.answer}
                  </p>

                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Key Takeaways:</div>
                    <ul className="space-y-1">
                      {currentCard.back.keyPoints.map((pt, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2">
                          <span className="text-emerald-400 shrink-0">✔</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {currentCard.back.mnemonic && (
                    <div className="bg-purple-900/40 border border-purple-500/30 rounded-xl p-2.5 text-xs text-purple-200 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-300 shrink-0" />
                      <span><strong>Mnemonic Trick:</strong> {currentCard.back.mnemonic}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-amber-300/90 font-medium truncate max-w-[280px]">
                    🎯 {currentCard.back.examRelevance}
                  </span>
                  <span className="text-purple-300">Click to flip back</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action & Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            {/* Nav Arrows */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                onClick={handleFlip}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" /> Flip Card
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Confidence Rating Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={() => handleRateCard('review')}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  masteryState[currentCard.id] === 'review'
                    ? 'bg-rose-50 border-rose-300 text-rose-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
                }`}
              >
                <XCircle className="w-3.5 h-3.5 text-rose-500" /> Needs Review
              </button>

              <button
                onClick={() => handleRateCard('learning')}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  masteryState[currentCard.id] === 'learning'
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Got It
              </button>

              <button
                onClick={() => handleRateCard('mastered')}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  masteryState[currentCard.id] === 'mastered'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Mastered
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500">No flashcards found for this category.</p>
        </div>
      )}
    </div>
  );
}
