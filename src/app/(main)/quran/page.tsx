import { CONFIG } from 'src/config-global';

import { QuranView } from 'src/sections/quran/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Quran Playground - ${CONFIG.appName}` };

export default function Page() {
  return <QuranView />;
}
