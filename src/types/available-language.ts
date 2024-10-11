import type TranslatedName from './translated-name';

interface AvailableLanguage {
  id?: number;
  name?: string;
  direction?: string;
  nativeName?: string;
  isoCode?: string;
  translatedName?: TranslatedName;
}
export default AvailableLanguage;
