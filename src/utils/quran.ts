import type Reciter from 'src/types/reciter';
import type { VersesResponse } from 'src/types/api-quran-response';
import type { PagesLookUpRequest } from 'src/types/api-quran-request';

import {
  Mushaf,
  MushafLines,
  QuranFont,
  QuranFontMushaf,
  QuranReaderDataType,
} from 'src/types/quran-reader';

// ----------------------------------------------------------------------

export const getPageVersesParams = (mushafId: Mushaf, wordFields: { wordFields: string }) => ({
  perPage: 'all',
  mushaf: mushafId,
  filterPageWords: true,
  ...wordFields,
});

// ----------------------------------------------------------------------

export const getPagesLookupParams = (
  resourceId: number | string,
  quranReaderDataType: QuranReaderDataType,
  mushafId: number,
  initialData?: VersesResponse
) => {
  const params: PagesLookUpRequest = { mushaf: mushafId };
  const resourceIdNumber = Number(resourceId);
  switch (quranReaderDataType) {
    case QuranReaderDataType.Chapter:
      params.chapterNumber = resourceIdNumber;
      break;
    case QuranReaderDataType.Hizb:
      params.hizbNumber = resourceIdNumber;
      break;
    case QuranReaderDataType.Juz:
      params.juzNumber = resourceIdNumber;
      break;
    case QuranReaderDataType.Page:
      params.pageNumber = resourceIdNumber;
      break;
    case QuranReaderDataType.Rub:
      params.rubElHizbNumber = resourceIdNumber;
      break;
    case QuranReaderDataType.Verse:
      params.chapterNumber = resourceIdNumber;
      params.from = initialData?.verses[0]?.verseKey;
      params.to = initialData?.verses[0]?.verseKey;
      break;
    case QuranReaderDataType.ChapterVerseRanges:
      params.chapterNumber = resourceIdNumber;
      params.from = initialData?.metaData?.from;
      params.to = initialData?.metaData?.to;
      break;
    case QuranReaderDataType.Ranges:
      params.from = initialData?.pagesLookup?.lookupRange?.from;
      params.to = initialData?.pagesLookup?.lookupRange?.to;
      break;
    default:
      break;
  }
  return params;
};

// ----------------------------------------------------------------------

/**
 * Get the default word fields that should exist in the response.
 * qpc_uthmani_hafs is added so that we can use it as a fallback
 * text for QCF font V1, V2 and V4.
 *
 * @param {QuranFont} quranFont the selected quran font since.
 * @returns {{ wordFields: string}}
 *
 */
export const getDefaultWordFields = (
  quranFont: QuranFont = QuranFont.QPCHafs
): { wordFields: string } => ({
  wordFields: `verse_key,verse_id,page_number,location,text_uthmani,${
    quranFont === QuranFont.TajweedV4 ? QuranFont.MadaniV2 : quranFont
  }${quranFont === QuranFont.QPCHafs ? '' : `,${QuranFont.QPCHafs}`}`,
});

// ----------------------------------------------------------------------

/**
 * Get the mushaf id based on the value inside redux (if it's not SSR).
 *
 * @param {QuranFont} quranFont
 * @param {MushafLines} mushafLines
 * @returns {{mushaf: Mushaf}}
 */
export const getMushafId = (
  // eslint-disable-next-line default-param-last
  quranFont: QuranFont = QuranFont.QPCHafs,
  mushafLines?: MushafLines
): { mushaf: Mushaf } => {
  let mushaf = QuranFontMushaf[quranFont];
  // convert the Indopak mushaf to either 15 or 16 lines Mushaf
  if (quranFont === QuranFont.IndoPak && mushafLines) {
    mushaf =
      mushafLines === MushafLines.FifteenLines ? Mushaf.Indopak15Lines : Mushaf.Indopak16Lines;
  }
  return { mushaf };
};

// ----------------------------------------------------------------------

export const ITEMS_PER_PAGE = 10;

export const DEFAULT_TRANSLATIONS = [131]; // Dr. Mustafa Khattab, the Clear Quran

const DEFAULT_WBW_LOCALE = 'id';

export const DEFAULT_VERSES_PARAMS = {
  words: true,
  translationFields: 'resource_name,language_id', // needed to show the name of the translation
  perPage: ITEMS_PER_PAGE,
  fields: `${QuranFont.Uthmani},chapter_id,hizb_number,text_imlaei_simple`, // we need text_uthmani field when copying the verse. text_imlaei_simple is for SEO description meta tag. Also the chapter_id for when we want to share the verse or navigate to Tafsir, hizb_number is for when we show the context menu.
};

export const DEFAULT_RECITER = {
  id: 7,
  name: 'Mishari Rashid al-`Afasy',
  recitationStyle: 'Warsh',
  relativePath: 'mishaari_raashid_al_3afaasee',
} as Reciter;

export const DEFAULT_QURAN_READER_STYLES = {
  tafsirFontScale: 3,
  quranTextFontScale: 3,
  translationFontScale: 3,
  wordByWordFontScale: 3,
  quranFont: QuranFont.MadaniV1,
  mushafLines: MushafLines.SixteenLines,
  isUsingDefaultFont: true,
};

/**
 * Use the default params and allow overriding the default values e.g. translations.
 *
 * @param {string} currentLocale
 * @param {Record<string, unknown>} params
 * @param {boolean} includeTranslationFields
 * @returns {Record<string, unknown>}
 */
export const getVersesParams = (
  currentLocale: string,
  params?: Record<string, unknown>,
  includeTranslationFields = true
): Record<string, unknown> => {
  const defaultParams = {
    ...DEFAULT_VERSES_PARAMS,
    translations: DEFAULT_TRANSLATIONS.join(', '),
    reciter: DEFAULT_RECITER.id,
    wordTranslationLanguage: DEFAULT_WBW_LOCALE,
  };

  if (defaultParams && !includeTranslationFields) {
    Object.keys(defaultParams).forEach((key) => {
      if (key === 'translationFields' || key === 'translations') {
        delete defaultParams[key];
      }
    });
  }

  return {
    ...defaultParams,
    ...params,
  };
};
