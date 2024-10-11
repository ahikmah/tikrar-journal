import type Word from '../word';
import type Verse from '../verse';

type SearchVerseItem = Verse & {
  words: Word[];
} & {
  kalimatData: {
    matches?: string;
  };
};
export default SearchVerseItem;
