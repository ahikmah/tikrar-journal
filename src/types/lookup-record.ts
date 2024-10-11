import type LookupRange from './lookup-range';

interface LookupRecord extends LookupRange {
  firstVerseKey: string;
  lastVerseKey: string;
}
export default LookupRecord;
