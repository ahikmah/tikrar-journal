import type Segment from './segment';

interface VerseTiming {
  verseKey: string;
  timestampFrom: number;
  timestampTo: number;
  duration: number;
  segments: Segment[];
}

export default VerseTiming;
