import type TranslatedName from './translated-name';
import type AvailableTranslation from './available-translation';

interface AvailableWordByWordTranslation extends AvailableTranslation {
  id: number;
  name: string;
  authorName: string;
  slug: string;
  languageName: string;
  isoCode: string;
  translatedName: TranslatedName;
}
export default AvailableWordByWordTranslation;
