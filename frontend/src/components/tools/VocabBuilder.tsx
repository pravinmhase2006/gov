'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Lightbulb, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Award,
  Zap,
  Calendar,
  Flame
} from 'lucide-react';

interface VocabItem {
  id: string;
  word: string;
  partOfSpeech: string;
  hindiMeaning: string;
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example: string;
  mnemonic: string;
  rootWord?: string;
}

const DAILY_VOCAB: Record<number, VocabItem[]> = {
  1: [
    {
      id: 'v1',
      word: 'Magnanimous',
      partOfSpeech: 'Adjective',
      hindiMeaning: 'उदार, दयालु, विशाल हृदय वाला',
      definition: 'Generous or forgiving, especially toward a rival or less powerful person.',
      synonyms: ['Generous', 'Benevolent', 'Altruistic', 'Munificent'],
      antonyms: ['Petty', 'Mean-spirited', 'Vindictive', 'Spiteful'],
      example: 'The judge was magnanimous in granting bail to the first-time offender.',
      mnemonic: 'Magna (Magnificent/Big) + Animus (Mind/Soul) = Big-hearted person.',
      rootWord: 'Magnus (Great/Large)'
    },
    {
      id: 'v2',
      word: 'Cacophony',
      partOfSpeech: 'Noun',
      hindiMeaning: 'कर्कश ध्वनि, कोलाहल',
      definition: 'A harsh, discordant mixture of sounds.',
      synonyms: ['Dissonance', 'Clamor', 'Racket', 'Din'],
      antonyms: ['Euphony', 'Harmony', 'Symphony', 'Melody'],
      example: 'The cacophony of traffic horns filled the morning rush hour in Mumbai.',
      mnemonic: 'Caco (Bad) + Phono (Sound) = Bad/Harsh sound.',
      rootWord: 'Kakós (Bad) + Phōnē (Sound)'
    },
    {
      id: 'v3',
      word: 'Ephemeral',
      partOfSpeech: 'Adjective',
      hindiMeaning: 'क्षणभंगुर, अल्पकालिक',
      definition: 'Lasting for a very short time; transient.',
      synonyms: ['Transient', 'Fleeting', 'Evane-scent', 'Short-lived'],
      antonyms: ['Permanent', 'Perennial', 'Enduring', 'Everlasting'],
      example: 'Social media fame is often ephemeral, fading within weeks.',
      mnemonic: 'Sounds like "E-Phone" battery — lasts for very short time.',
      rootWord: 'Ephemeros (Lasting a day)'
    },
    {
      id: 'v4',
      word: 'Ubiquitous',
      partOfSpeech: 'Adjective',
      hindiMeaning: 'सर्वव्यापी, जो हर जगह मौजूद हो',
      definition: 'Present, appearing, or found everywhere simultaneously.',
      synonyms: ['Omnipresent', 'Pervasive', 'Universal', 'All-around'],
      antonyms: ['Rare', 'Scarce', 'Infrequent', 'Uncommon'],
      example: 'UPI QR codes have become ubiquitous across tea stalls and malls in India.',
      mnemonic: 'U-B-Quit-Us: Mosquitoes are everywhere, you cannot quit them.',
      rootWord: 'Ubique (Everywhere)'
    }
  ],
  2: [
    {
      id: 'v5',
      word: 'Abnegation',
      partOfSpeech: 'Noun',
      hindiMeaning: 'त्याग, आत्म-संयम',
      definition: 'The act of renouncing or rejecting something desired.',
      synonyms: ['Renunciation', 'Self-denial', 'Abstinence', 'Surrender'],
      antonyms: ['Self-indulgence', 'Acceptance', 'Gratification'],
      example: 'His abnegation of political power surprised the entire parliament.',
      mnemonic: 'Ab + Negation = Saying "NO" to worldly desires.',
      rootWord: 'Abnegare (To refuse)'
    },
    {
      id: 'v6',
      word: 'Vociferous',
      partOfSpeech: 'Adjective',
      hindiMeaning: 'मुखर, चिल्लाने वाला, शोरगुल से भरा',
      definition: 'Expressing feelings or opinions in a very loud or forceful way.',
      synonyms: ['Clamorous', 'Vehement', 'Outspoken', 'Loud-mouthed'],
      antonyms: ['Quiet', 'Reticent', 'Subdued', 'Silent'],
      example: 'The students were vociferous in their protest against examination delays.',
      mnemonic: 'Voice + Furious = Loud, angry shouting.',
      rootWord: 'Vox (Voice) + Ferre (To carry)'
    }
  ]
};

export default function VocabBuilder() {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [activeWordIdx, setActiveWordIdx] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(14);

  const dayWords = DAILY_VOCAB[activeDay] || DAILY_VOCAB[1];
  const currentWord = dayWords[activeWordIdx] || dayWords[0];

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/20">
              <Sparkles className="w-3.5 h-3.5" /> High-Frequency Exam Vocabulary Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              30-Day Word Power & Idioms Builder
            </h1>
            <p className="text-emerald-100/80 text-xs sm:text-sm max-w-xl">
              Master 300+ root words, synonyms, antonyms, and mnemonic memory shortcuts asked frequently in SSC CGL, Bank PO, and CDS English papers.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-xl font-black text-amber-300">{streakCount} Days</div>
              <div className="text-[10px] text-emerald-200">Vocab Mastery Streak</div>
            </div>
          </div>
        </div>

        {/* 30 Days Horizontal Carousel */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => {
                setActiveDay(day);
                setActiveWordIdx(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeDay === day
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/20'
                  : 'bg-white/10 hover:bg-white/20 text-emerald-200'
              }`}
            >
              Day {day}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Words List for Today */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Day {activeDay} Vocabulary List</span>
            </h3>
            <span className="text-xs text-slate-400">{dayWords.length} Words</span>
          </div>

          <div className="space-y-2">
            {dayWords.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveWordIdx(idx)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  activeWordIdx === idx
                    ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.word}</h4>
                  <div className="text-xs text-emerald-700 font-medium">{item.hindiMeaning}</div>
                </div>
                <span className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-500">
                  {item.partOfSpeech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Deep Word Analysis Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Word Header & Audio */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {currentWord.word}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                    {currentWord.partOfSpeech}
                  </span>
                </div>
                <div className="text-base font-semibold text-emerald-700">
                  {currentWord.hindiMeaning}
                </div>
              </div>

              <button
                onClick={() => speakText(currentWord.word)}
                className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                title="Pronounce Word"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Definition */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">English Definition:</div>
              <p className="text-slate-800 text-base font-medium leading-relaxed">
                "{currentWord.definition}"
              </p>
            </div>

            {/* Synonyms & Antonyms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Synonyms
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentWord.synonyms.map(s => (
                    <span key={s} className="px-2.5 py-1 bg-white rounded-lg text-xs font-semibold text-emerald-900 border border-emerald-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 space-y-2">
                <div className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-rose-600" /> Antonyms
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentWord.antonyms.map(a => (
                    <span key={a} className="px-2.5 py-1 bg-white rounded-lg text-xs font-semibold text-rose-900 border border-rose-200">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mnemonic Trick Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Mnemonic Memory Trick:</strong> {currentWord.mnemonic}
              </div>
            </div>

            {/* Example Sentence */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed">
              <strong>Example in Sentence:</strong> <em>{currentWord.example}</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
