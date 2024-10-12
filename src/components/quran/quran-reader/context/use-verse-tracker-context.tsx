import { useContext } from 'react';

import { VerseTrackerContext } from './verse-tracker-provider';

export function useVerseTrackerContext() {
  const context = useContext(VerseTrackerContext);

  if (!context) {
    throw new Error('useVerseTrackerContext: Context must be used inside VerseTrackerProvider');
  }
}
