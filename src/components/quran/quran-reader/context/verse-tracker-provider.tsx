import { useMemo, useRef, createContext } from 'react';

import type { VerseTrackerProviderProps, VerseTrackerValue } from '../../types';

// ----------------------------------------------------------------------

export const VerseTrackerContext = createContext<VerseTrackerValue | undefined>(undefined);

export const VerseTrackerConsumer = VerseTrackerContext.Consumer;

// ----------------------------------------------------------------------

export function VerseTrackerProvider({ children }: Readonly<VerseTrackerProviderProps>) {
  const verseKeysQueue = useRef<Set<string>>(new Set());
  const shouldTrackObservedVerses = useRef(true);

  const value = useMemo(() => ({ verseKeysQueue, shouldTrackObservedVerses }), []);

  return <VerseTrackerContext.Provider value={value}>{children}</VerseTrackerContext.Provider>;
}
