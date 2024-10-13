'use client';

import type { VersesResponse } from 'src/types/api-quran-response';

import { DEFAULT_QURAN_READER_STYLES } from 'src/utils/quran';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetPageVerses, useGetPagesLookup } from 'src/api/quran-targeted';

import { QuranReader } from 'src/components/quran/quran-reader/quran-reader';

import { QuranReaderDataType } from 'src/types/quran-reader';

import { getQuranReaderData } from '../utils/get-quran-reader-data';

// ----------------------------------------------------------------------

export function QuranView() {
  const {
    data: pagesLookupData,
    // isLoading: isPagesLookupLoading,
    // hasError: pagesLookupError,
  } = useGetPagesLookup({
    resourceId: 3,
    quranReaderDataType: QuranReaderDataType.Page,
    quranReaderStyles: DEFAULT_QURAN_READER_STYLES,
    isUsingDefaultFont: true,
  });

  const {
    data: pageVersesData,
    // isLoading: isPageVersesLoading,
    // hasError: pageVersesError,
  } = useGetPageVerses({ locale: 'id', pageId: '3', defaultSettings: DEFAULT_QURAN_READER_STYLES });

  // console.log('pagesLookupResponse', pagesLookupData);
  // console.log('pageVersesData', pageVersesData);

  const initialData = getQuranReaderData(pagesLookupData, pageVersesData);

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
