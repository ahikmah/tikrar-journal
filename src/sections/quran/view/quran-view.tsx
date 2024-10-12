'use client';

import type { VersesResponse } from 'src/types/api-quran-response';

import { getDefaultWordFields } from 'src/utils/quran';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetPageVerses, useGetPagesLookup } from 'src/api/quran-targeted';

import { QuranReader } from 'src/components/quran/quran-reader/quran-reader';

import { MushafLines, QuranFont, QuranReaderDataType } from 'src/types/quran-reader';

import { getQuranReaderData } from '../utils/get-quran-reader-data';
import { getPageVersesParams } from '../utils/get-page-verses-params';

// ----------------------------------------------------------------------

const defaultSettings = {
  tafsirFontScale: 3,
  quranTextFontScale: 3,
  translationFontScale: 3,
  wordByWordFontScale: 3,
  quranFont: QuranFont.MadaniV1,
  mushafLines: MushafLines.SixteenLines,
  isUsingDefaultFont: true,
};

export function QuranView() {
  const { pagesLookupResponse } = useGetPagesLookup({ pageNumber: 3, mushaf: 2 });
  const { pageVersesResponse } = useGetPageVerses(
    '3',
    'id',
    getPageVersesParams(2, getDefaultWordFields(defaultSettings.quranFont))
  );

  const initialData = getQuranReaderData(pagesLookupResponse, pageVersesResponse);

  return (
    <DashboardContent maxWidth="xl">
      <QuranReader
        initialData={initialData as VersesResponse}
        id={3}
        quranReaderDataType={QuranReaderDataType.Page}
      />
    </DashboardContent>
  );
} // ----------------------------------------------------------------------
