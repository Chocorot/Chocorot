'use client';

import { useRef, useEffect, useCallback } from 'react';
import { timing } from '@/utils/morse';

export function useMorseAudio() {
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    // We don't initialize here to comply with browser autoplay policies.
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const ensureContext = useCallback(() => {
    if (!audioContext.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContext.current = new AudioContextClass();
    }
    if (audioContext.current.state === 'suspended') {
      audioContext.current.resume();
    }
    return audioContext.current;
  }, []);

  const playTone = useCallback((startTime: number, duration: number, frequency = 600) => {
    const ctx = ensureContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.setValueAtTime(frequency, startTime);
    
    // Smooth attack and release to prevent clicking
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(1, startTime + 0.01);
    gain.gain.setValueAtTime(1, startTime + duration - 0.01);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  }, [ensureContext]);

  const playMorse = useCallback((morse: string) => {
    const ctx = ensureContext();
    let currentTime = ctx.currentTime;

    morse.split('').forEach(symbol => {
      if (symbol === '.') {
        playTone(currentTime, timing.dot);
        currentTime += timing.dot + timing.intraCharacterGap;
      } else if (symbol === '-') {
        playTone(currentTime, timing.dash);
        currentTime += timing.dash + timing.intraCharacterGap;
      } else if (symbol === ' ') {
        currentTime += timing.interCharacterGap;
      } else if (symbol === '/') {
        currentTime += timing.wordGap;
      }
    });
  }, [ensureContext, playTone]);

  return { playMorse, playTone, ensureContext };
}
