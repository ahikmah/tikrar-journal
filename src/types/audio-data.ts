import type VerseTiming from './verse-timing';

interface AudioData {
  id: number;
  chapterId: number;
  fileSize: number;
  format: string;
  audioUrl: string;
  duration: number;
  verseTimings?: VerseTiming[];
  reciterId: number;
}

export default AudioData;
