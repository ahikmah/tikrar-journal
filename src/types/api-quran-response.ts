import type Verse from './verse';
import type Chapter from './chapter';
import type Reciter from './reciter';
import type Footnote from './footnote';
import type MetaData from './meta-data';
import type AudioData from './audio-data';
import type TafsirInfo from './tafsir-info';
import type LookupRange from './lookup-range';
import type ChapterInfo from './chapter-info';
import type LookupRecord from './lookup-record';
import type SearchService from './search/search-service';
import type AvailableLanguage from './available-language';
import type AvailableTranslation from './available-translation';
import type { SearchNavigationResult } from './search-navigation-result';
import type AvailableWordByWordTranslation from './available-word-by-word-translation';

export interface BaseResponse {
  status?: number;
  error?: string;
}

interface Pagination {
  perPage: number;
  currentPage: number;
  nextPage: number | null;
  totalRecords: number;
  totalPages: number;
}

// The response from the verses endpoint that returns a list of verses
export interface VersesResponse extends BaseResponse {
  pagination: Pagination;
  verses: Verse[];
  metaData?: MetaData;
  pagesLookup?: PagesLookUpResponse;
}

// The response from the chapters endpoint that returns a list of the chapters
export interface ChaptersResponse extends BaseResponse {
  chapters: Chapter[];
}

export interface VerseResponse extends BaseResponse {
  verse: Verse;
}

// The response from the chapter endpoint that returns information on a chapter
export interface ChapterResponse extends BaseResponse {
  chapter: Chapter;
}

export interface TranslationsResponse extends BaseResponse {
  translations?: AvailableTranslation[];
}

export interface WordByWordTranslationsResponse extends BaseResponse {
  wordByWordTranslations?: AvailableWordByWordTranslation[];
}

export interface LanguagesResponse extends BaseResponse {
  languages?: AvailableLanguage[];
}

export interface RecitersResponse extends BaseResponse {
  reciters?: Reciter[];
}

export interface ReciterResponse extends BaseResponse {
  reciter?: Reciter;
}

export interface AudioDataResponse extends BaseResponse {
  audioFiles: AudioData[];
}

export interface AudioTimestampsResponse extends BaseResponse {
  result: {
    timestampFrom: number;
    timestampTo: number;
  };
}
export interface SearchResponse extends BaseResponse {
  service?: SearchService;
  pagination: Pagination;
  result?: {
    navigation: SearchNavigationResult[];
    verses: Verse[];
  };
}

export interface AdvancedCopyRawResultResponse extends BaseResponse {
  result?: string;
}

export interface TafsirsResponse extends BaseResponse {
  tafsirs?: TafsirInfo[];
}

export interface ChapterInfoResponse extends BaseResponse {
  chapterInfo?: ChapterInfo;
}

export interface FootnoteResponse extends BaseResponse {
  footNote?: Footnote;
}

export interface PagesLookUpResponse extends BaseResponse {
  lookupRange?: LookupRange;
  pages?: Record<string, LookupRecord>;
  totalPage?: number;
}

export interface TafsirContentResponse extends BaseResponse {
  tafsir: {
    verses: Record<string, Verse>;
    resourceId: number;
    resourceName: string;
    languageId: number;
    translatedName: {
      name: string;
      languageName: string;
    };
    text: string;
    slug?: string;
  };
}
