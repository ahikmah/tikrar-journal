import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Daily Plan & Tracker | ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Daily Plan & Tracker" />;
}
