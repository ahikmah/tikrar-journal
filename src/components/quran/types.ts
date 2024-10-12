export type VerseTrackerValue = {
  verseKeysQueue: React.MutableRefObject<Set<string>>;
  shouldTrackObservedVerses: React.MutableRefObject<boolean>;
};

export type VerseTrackerProviderProps = {
  children: React.ReactNode;
};
