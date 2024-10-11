import type SearchVerseItem from './search-verse-item';
import type { BaseResponse } from '../api-quran-response';
import type { SearchNavigationResult } from '../search-navigation-result';

interface SearchResponse extends BaseResponse {
  result: {
    navigation: SearchNavigationResult[];
    verses: SearchVerseItem[];
  };
  pagination: {
    perPage: number;
    currentPage: number;
    nextPage: number | null;
    totalRecords: number;
    totalPages: number;
  };
}

export default SearchResponse;
