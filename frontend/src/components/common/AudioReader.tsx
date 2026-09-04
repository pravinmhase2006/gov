'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, FastForward, Radio } from 'lucide-react';

interface AudioReaderProps {
  title: string;
  content: string;
  lang?: 'en-IN' | 'hi-IN';
}

export default function AudioReader({ title, content, lang = 'en-IN' }: AudioReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [selectedLang, setSelectedLang] = useState(lang);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();

      const cleanText = `${title}. ${content.replace(/<[^>]*>?/gm, '').replace(/[*_#]/g, '')}`;
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = selectedLang;
      utterance.rate = rate;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = () => {
    const rates = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (rates.indexOf(rate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setRate(nextRate);

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-lg border border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4 my-6">
      
      {/* Audio Info */}
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
          <Radio className={`w-5 h-5 ${isPlaying ? 'animate-pulse text-emerald-400' : ''}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">Daily Audio Capsule</span>
            <span className="bg-blue-500/20 text-blue-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-400/20">
              Listen &amp; Learn
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            {isPlaying ? 'Now playing audio narration...' : 'Listen to this current affairs article while commuting'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Language selector */}
        <select
          value={selectedLang}
          onChange={(e) => {
            setSelectedLang(e.target.value as any);
            if (isPlaying) {
              window.speechSynthesis.cancel();
              setIsPlaying(false);
            }
          }}
          className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none"
        >
          <option value="en-IN">English (India)</option>
          <option value="hi-IN">Hindi (हिंदी)</option>
        </select>

        {/* Speed toggle */}
        <button
          onClick={handleSpeedChange}
          className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
          title="Playback speed"
        >
          {rate}x
        </button>

        {/* Play/Pause Main Button */}
        <button
          onClick={handleTogglePlay}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all ${
            isPlaying
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause Audio</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Listen Now</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
