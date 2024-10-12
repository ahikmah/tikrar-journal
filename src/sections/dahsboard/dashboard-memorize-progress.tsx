import { useMemo } from 'react';

import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomTabs } from 'src/components/custom-tabs';

import { useTabs } from 'src/auth/hooks/use-tabs';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'surah', label: 'Surah (114)' },
  { value: 'juz', label: 'Juz (30)' },
];

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    name: string;
    arabicName: string;
    juz: number;
    hizb: number;
    totalVerses: number;
    totalMemorized: number;
    totalUnmemorized: number;
    typeSurah: string;
  }[];
};

export function DashboardMemorizeProgress({ title, subheader, list, ...other }: Props) {
  const tabs = useTabs('surah');

  const renderTabs = (
    <CustomTabs
      value={tabs.value}
      onChange={tabs.onChange}
      variant="fullWidth"
      slotProps={{ tab: { px: 0 } }}
    >
      {TABS.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
    </CustomTabs>
  );

  const renderedItems = useMemo(
    () => list.map((item) => <Item key={item.id} item={item} />),
    [list]
  );

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      {renderTabs}

      <Scrollbar sx={{ minHeight: 370, maxHeight: 480 }}>
        <Box sx={{ p: 3, gap: 3, minWidth: 300, display: 'flex', flexDirection: 'column' }}>
          {renderedItems}
        </Box>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: Props['list'][number];
};

function Item({ item, sx, ...other }: ItemProps) {
  return (
    <Box sx={{ gap: 2, alignItems: 'center', ...sx }} {...other}>
      <div>
        <Box sx={{ mb: 1, gap: 1, display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              display: 'flex',
              borderRadius: '50%',
              alignItems: 'center',
              color: 'success.main',
              justifyContent: 'center',
              bgcolor: (theme) => varAlpha(theme.vars.palette.success.mainChannel, 0.08),
              ...(item.totalMemorized < item.totalVerses && {
                color: 'warning.main',
                bgcolor: (theme) => varAlpha(theme.vars.palette.warning.mainChannel, 0.08),
              }),
              ...(item.totalMemorized === 0 && {
                color: 'text.disabled',
                bgcolor: (theme) => varAlpha(theme.vars.palette.text.disabledChannel, 0.08),
              }),
            }}
          >
            <Iconify width={30} icon="solar:cup-star-bold" />
          </Box>
          <Stack width={1}>
            <Typography variant="h4" noWrap>
              {item.arabicName}
            </Typography>
            <Stack
              flexDirection={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', md: 'end' }}
            >
              <Typography variant="caption" noWrap>
                {item.name}
              </Typography>
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  alignItems: 'end',
                  typography: 'caption',
                }}
              >
                <Iconify
                  width={25}
                  icon={item.typeSurah === 'Meccan' ? 'noto:kaaba' : 'noto:mosque'}
                  color="text.primary"
                />
                {item.totalMemorized} of {item.totalVerses} verses memorized
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Stack gap={1}>
          <LinearProgress
            variant="determinate"
            value={(item.totalMemorized / item.totalVerses) * 100}
            color={item.totalMemorized === item.totalVerses ? 'success' : 'warning'}
            sx={{
              height: 8,
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
            }}
          />
          <Divider
            sx={{
              mt: 2,
              borderStyle: 'dashed',
              borderColor: (theme) => `${theme.palette.divider}`,
            }}
          />
        </Stack>
      </div>
    </Box>
  );
}
