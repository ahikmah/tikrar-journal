import type TranslatedName from './translated-name';

interface AvailableTranslation {
  id?: number;
  name?: string;
  authorName?: string;
  slug?: string;
  languageName?: string;
  translatedName?: TranslatedName;
}
export default AvailableTranslation;
