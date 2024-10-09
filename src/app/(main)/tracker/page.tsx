import { CONFIG } from 'src/config-global';

import { TrackerView } from 'src/sections/tracker/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Daily Plan & Tracker | ${CONFIG.appName}` };

export default function Page() {
  return <TrackerView />;
}
