import React from 'react';
import ImageResizer from '@/components/tools/ImageResizer';

export default function PhotoResizerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <ImageResizer />
      </div>
    </div>
  );
}
