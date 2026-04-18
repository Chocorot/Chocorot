'use client';

import { useEffect } from 'react';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { app } from '@/lib/firebase';

export default function FirebaseAnalytics() {
  useEffect(() => {
    const initializeAnalytics = async () => {
      const supported = await isSupported();
      if (supported) {
        getAnalytics(app);
        if (process.env.NODE_ENV === 'development') {
          console.log('🔥 Firebase Analytics initialized');
        }
      }
    };

    initializeAnalytics();
  }, []);

  return null;
}
