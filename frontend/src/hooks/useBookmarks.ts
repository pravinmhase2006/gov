'use client';

import { useState } from 'react';

export function useBookmarks(initialBookmarked = false, jobId: string) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const toggleBookmark = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookmarks', {
        method: isBookmarked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId }),
      });

      if (res.ok) {
        setIsBookmarked(!isBookmarked);
      }
    } catch (err) {
      console.error('Bookmark error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { isBookmarked, toggleBookmark, loading };
}
