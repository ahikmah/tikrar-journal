import type { Mushaf } from 'src/types/quran-reader';

export const getPageVersesParams = (mushafId: Mushaf, wordFields: { wordFields: string }) => ({
  perPage: 'all',
  mushaf: mushafId,
  filterPageWords: true,
  ...wordFields,
});
