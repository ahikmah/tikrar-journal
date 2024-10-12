import type { PagesLookUpResponse, VersesResponse } from 'src/types/api-quran-response';

export const getQuranReaderData = (
  pagesLookupData: PagesLookUpResponse | undefined,
  pageVersesData: VersesResponse | undefined
) => ({
  ...pageVersesData,
  pagesLookup: pagesLookupData,
  metaData: { numberOfVerses: pageVersesData?.verses?.length },
});
