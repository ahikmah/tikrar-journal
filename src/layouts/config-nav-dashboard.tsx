import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Tikrar Demo 0.0.1',
    items: [
      { title: 'Dashboard', path: paths.main.root, icon: ICONS.dashboard },
      { title: 'Tracker', path: paths.main.tracker, icon: ICONS.analytics },
      { title: 'Reports', path: paths.main.reports, icon: ICONS.file },
      { title: 'Program', path: paths.main.program, icon: ICONS.course },
      { title: 'Group', path: paths.main.group, icon: ICONS.user },
      { title: 'Journal', path: paths.main.journal, icon: ICONS.calendar },
      { title: 'Resources', path: paths.main.resources, icon: ICONS.folder },
      { title: 'Glossary', path: paths.main.glossary, icon: ICONS.label },
      { title: 'Quran', path: paths.main.quran, icon: ICONS.kanban },
    ],
  },
];
