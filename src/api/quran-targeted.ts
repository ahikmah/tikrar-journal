import { useMemo } from 'react';

import type LookupRange from 'src/types/lookup-range';
import type LookupRecord from 'src/types/lookup-record';
import type { QuranReaderDataType } from 'src/types/quran-reader';
import type QuranReaderStyles from 'src/types/quran-reader-styles';
import type { PagesLookUpResponse, VersesResponse } from 'src/types/api-quran-response';

import useSWRImmutable from 'swr/immutable';

import { stringify } from 'src/utils/qs-stringify';
import { decamelizeKeys } from 'src/utils/decamelize';
import { fetcher, endpoints } from 'src/utils/axios-quran';
import {
  getDefaultWordFields,
  getMushafId,
  getPageVersesParams,
  getPagesLookupParams,
  getVersesParams,
} from 'src/utils/quran';

// ----------------------------------------------------------------------

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

type PagesLookUpParams = {
  resourceId: number | string;
  quranReaderDataType: QuranReaderDataType;
  quranReaderStyles: QuranReaderStyles;
  isUsingDefaultFont: boolean;
};

type PagesLookUpReturned = {
  data: PagesLookUpResponse | undefined;
  pagesCount: number | undefined;
  pagesVersesRange: Record<number, LookupRecord> | undefined;
  lookupRange: LookupRange | undefined;
  hasError: boolean;
  isLoading: boolean;
};

export function useGetPagesLookup({
  resourceId,
  quranReaderDataType,
  quranReaderStyles,
}: PagesLookUpParams): PagesLookUpReturned {
  const generatedParams = getPagesLookupParams(
    resourceId,
    quranReaderDataType,
    getMushafId(quranReaderStyles.quranFont, quranReaderStyles.mushafLines).mushaf
  );

  const decamelizedParams = decamelizeKeys(generatedParams);

  const url = `${endpoints.pages.lookup}?${stringify(decamelizedParams)}`;

  const { data, isLoading, error } = useSWRImmutable<PagesLookUpResponse>(url, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      data,
      pagesCount: data?.totalPage,
      pagesVersesRange: data?.pages,
      lookupRange: data?.lookupRange,
      hasError: !!error,
      isLoading,
    }),
    [data, error, isLoading]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type PageVersesParams = {
  pageId: string;
  locale: string;
  defaultSettings: QuranReaderStyles;
};

type PageVersesReturned = {
  data: VersesResponse | undefined;
  hasError: boolean;
  isLoading: boolean;
};

export function useGetPageVerses({
  pageId,
  locale,
  defaultSettings,
}: PageVersesParams): PageVersesReturned {
  const { quranFont, mushafLines } = defaultSettings;
  const mushafId = getMushafId(quranFont, mushafLines).mushaf;

  const params = getPageVersesParams(mushafId, getDefaultWordFields(quranFont));
  const generatedParams = getVersesParams(locale, params, true);

  const decamelizedParams = decamelizeKeys(generatedParams);

  const url = `${endpoints.verses.byPage}/${pageId}?${stringify(decamelizedParams)}`;

  const { data, isLoading, error } = useSWRImmutable(url, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      data: data as VersesResponse,
      hasError: !!error,
      isLoading,
    }),
    [data, error, isLoading]
  );

  return memoizedValue;
}
