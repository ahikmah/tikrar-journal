import { useMemo } from 'react';

import type { PagesLookUpRequest } from 'src/types/api-quran-request';
import type { PagesLookUpResponse, VersesResponse } from 'src/types/api-quran-response';

import useSWR from 'swr';

import { stringify } from 'src/utils/qs-stringify';
import { decamelizeKeys } from 'src/utils/decamelize';
import { fetcher, endpoints } from 'src/utils/axios-quran';

// ----------------------------------------------------------------------

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetPagesLookup(param: PagesLookUpRequest) {
  const decamelizedParams = decamelizeKeys(param);

  const url = `${endpoints.pages.lookup}?${stringify(decamelizedParams)}`;

  const { data, isLoading, isValidating, error } = useSWR<PagesLookUpResponse>(
    url,
    fetcher,
    options
  );

  const memoizedValue = useMemo(
    () => ({
      pagesLookupResponse: data,
      pagesLookupLoading: isLoading,
      LookupError: error,
      pagesLookupValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetPageVerses(pageId: string, locale: string, params?: Record<string, unknown>) {
  const decamelizedParams = decamelizeKeys({ ...params, locale });

  const url = `${endpoints.verses.byPage}/${pageId}?${stringify(decamelizedParams)}`;

  const { data, isLoading, isValidating, error } = useSWR<VersesResponse>(url, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      pageVersesResponse: data,
      pageVersesLoading: isLoading,
      pageVersesError: error,
      pageVersesValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
