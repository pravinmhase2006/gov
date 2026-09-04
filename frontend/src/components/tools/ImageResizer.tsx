'use client';

import React, { useState, useRef } from 'react';
import { Camera, Download, Upload, RefreshCcw, CheckCircle2, Sliders, Image as ImageIcon } from 'lucide-react';

interface Preset {
  name: string;
  widthPx: number;
  heightPx: number;
  minKb: number;
  maxKb: number;
  description: string;
}

const presets: Record<string, Preset> = {
  'ssc_photo': {
    name: 'SSC Passport Photo',
    widthPx: 300,
    heightPx: 380,
    minKb: 20,
    maxKb: 50,
    description: '3.5cm x 4.5cm, 20KB - 50KB JPEG (SSC CGL, CHSL, MTS, GD)',
  },
  'ssc_sign': {
    name: 'SSC Signature',
    widthPx: 280,
    heightPx: 120,
    minKb: 10,
    maxKb: 20,
    description: '4.0cm x 2.0cm, 10KB - 20KB JPEG (SSC Exams)',
  },
  'ibps_photo': {
    name: 'IBPS / Bank PO Photo',
    widthPx: 200,
    heightPx: 230,
    minKb: 20,
    maxKb: 50,
    description: '200x230 pixels, 20KB - 50KB JPEG (IBPS PO, Clerk, SBI)',
  },
  'ibps_sign': {
    name: 'IBPS / Bank Signature',
    widthPx: 140,
    heightPx: 60,
    minKb: 10,
    maxKb: 20,
    description: '140x60 pixels, 10KB - 20KB JPEG (White background)',
  },
  'upsc_photo': {
    name: 'UPSC Civil Services Photo',
    widthPx: 350,
    heightPx: 350,
    minKb: 20,
    maxKb: 300,
    description: '350x350 pixels min, 20KB - 300KB (UPSC CSE, NDA, CDS)',
  },
};

export default function ImageResizer() {
  const [selectedPreset, setSelectedPreset] = useState<string>('ssc_photo');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalSizeKb, setOriginalSizeKb] = useState<number>(0);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [processedSizeKb, setProcessedSizeKb] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(300);
  const [targetHeight, setTargetHeight] = useState<number>(380);
  const [quality, setQuality] = useState<number>(0.85);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePresetChange = (key: string) => {
    setSelectedPreset(key);
    const p = presets[key];
    if (p) {
      setTargetWidth(p.widthPx);
      setTargetHeight(p.heightPx);
      if (originalImage) {
        processImage(originalImage, p.widthPx, p.heightPx, quality);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSizeKb(Math.round(file.size / 1024));
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setOriginalImage(dataUrl);
      processImage(dataUrl, targetWidth, targetHeight, quality);
    };
    reader.readAsDataURL(file);
  };

  const processImage = (src: string, width: number, height: number, q: number) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Draw image scaled
      ctx.drawImage(img, 0, 0, width, height);

      // Export as JPEG with chosen quality
      const outputDataUrl = canvas.toDataURL('image/jpeg', q);
      setProcessedImage(outputDataUrl);

      // Calculate base64 size in KB
      const head = 'data:image/jpeg;base64,';
      const sizeBytes = Math.round(((outputDataUrl.length - head.length) * 3) / 4);
      setProcessedSizeKb(Math.round(sizeBytes / 1024));
      setIsProcessing(false);
    };
    img.src = src;
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (originalImage) {
      processImage(originalImage, targetWidth, targetHeight, newQuality);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.download = `${selectedPreset}_govtprep_resized.jpg`;
    link.href = processedImage;
    link.click();
  };

  const preset = presets[selectedPreset] || presets['ssc_photo'];
  const isSizeValid = processedSizeKb >= preset.minKb && processedSizeKb <= preset.maxKb;

  return (
    <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card space-y-8">
      
      {/* Preset Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          1. Select Examination Photo / Signature Specification
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {Object.entries(presets).map(([key, p]) => (
            <button
              key={key}
              onClick={() => handlePresetChange(key)}
              className={`p-3 rounded-2xl border text-left text-xs transition-all flex flex-col justify-between ${
                selectedPreset === key
                  ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 font-bold ring-2 ring-blue-500/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <span>{p.name}</span>
              <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                {p.minKb}KB - {p.maxKb}KB
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
          Target Specs: <strong>{preset.description}</strong>
        </p>
      </div>

      {/* Upload Box */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          2. Upload Image from Mobile or Computer
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-3xl p-8 text-center cursor-pointer bg-slate-50/50 dark:bg-slate-900/50 transition-colors flex flex-col items-center justify-center gap-3"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Click to select photo or signature
            </p>
            <p className="text-xs text-slate-500">Supports JPG, PNG, WEBP (Processed 100% locally in your browser for total privacy)</p>
          </div>
        </div>
      </div>

      {/* Preview & Fine-tuning Canvas */}
      {originalImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-slate-800">
          
          {/* Output Preview */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Processed Government Ready Image
            </h4>

            <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
              {processedImage && (
                <img
                  src={processedImage}
                  alt="Resized Govt Job Photo"
                  style={{ width: `${Math.min(targetWidth, 240)}px`, height: 'auto' }}
                  className="rounded-lg shadow-md border border-slate-300 dark:border-slate-700 bg-white"
                />
              )}
            </div>

            {/* Verification Status */}
            <div
              className={`p-4 rounded-2xl border text-xs flex items-center justify-between ${
                isSizeValid
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200 font-bold'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200 font-bold'
              }`}
            >
              <div className="flex items-center gap-2">
                {isSizeValid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Sliders className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <div>
                  <span>File Size: {processedSizeKb} KB</span>
                  <span className="text-[11px] block font-normal text-slate-600 dark:text-slate-400">
                    Required: {preset.minKb}KB - {preset.maxKb}KB • Dimensions: {targetWidth}x{targetHeight}px
                  </span>
                </div>
              </div>
              {isSizeValid && (
                <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
                  PASS
                </span>
              )}
            </div>
          </div>

          {/* Controls & Download */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-600" /> Fine-Tune Compression &amp; File Size (KB)
              </h4>

              <div className="space-y-2 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between font-bold">
                  <span>Compression Quality</span>
                  <span className="font-mono text-blue-600">{Math.round(quality * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={quality}
                  onChange={(e) => handleQualityChange(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Smaller KB</span>
                  <span>Higher Clarity</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p>• Original Size: <strong>{originalSizeKb} KB</strong></p>
                <p>• Resized Size: <strong className="text-blue-600">{processedSizeKb} KB</strong></p>
                <p>• Output Format: <strong>JPEG / JPG</strong> (Accepted across SSC, UPSC, IBPS portals)</p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" /> Download Government-Ready Image ({processedSizeKb} KB)
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
