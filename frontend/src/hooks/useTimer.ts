'use client';

import { useState, useEffect } from 'react';

export function useTimer(initialSeconds: number, onExpire?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) {
      if (secondsLeft === 0 && onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onExpire) onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, onExpire]);

  const pause = () => setIsActive(false);
  const resume = () => setIsActive(true);
  const reset = (newSeconds?: number) => {
    setSecondsLeft(newSeconds !== undefined ? newSeconds : initialSeconds);
    setIsActive(true);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { secondsLeft, formatted, isActive, pause, resume, reset };
}
