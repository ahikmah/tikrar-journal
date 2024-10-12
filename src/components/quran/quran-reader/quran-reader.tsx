import type { QuranReaderDataType } from 'src/types/quran-reader';
import type { VersesResponse } from 'src/types/api-quran-response';

import { VerseTrackerProvider } from './context/verse-tracker-provider';

// ----------------------------------------------------------------------

type Props = {
  initialData: VersesResponse;
  id: number | string;
  quranReaderDataType?: QuranReaderDataType;
};

export function QuranReader({ initialData, id, quranReaderDataType }: Props) {
  return <VerseTrackerProvider>wait</VerseTrackerProvider>;
}
