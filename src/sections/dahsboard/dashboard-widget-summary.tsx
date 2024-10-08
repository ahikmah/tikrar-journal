import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { fNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  unit: string;
  total: number;
  isImproved: boolean;
  description?: string;
  imgUrl?: string;
};

export function DashboardWidgetSummary({
  title,
  unit,
  total,
  isImproved,
  imgUrl,
  description,
  sx,
  ...other
}: Props) {
  const renderDescription = (
    <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
      <Iconify
        width={24}
        icon={
          isImproved
            ? 'solar:double-alt-arrow-up-bold-duotone'
            : 'solar:double-alt-arrow-down-bold-duotone'
        }
        sx={{
          flexShrink: 0,
          color: 'success.main',
          ...(!isImproved && { color: 'error.main' }),
        }}
      />
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {description}
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ typography: 'subtitle2' }}>{title}</Box>
        <Box sx={{ mt: 1.5, mb: 1, typography: 'h3' }}>
          {fNumber(total)}
          <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
            {' '}
            {unit}
          </Box>
        </Box>
        {description ? renderDescription : ''}
      </Box>

      {imgUrl && <Box component="img" src={imgUrl} sx={{ maxWidth: 50, maxHeight: 50 }} />}
    </Card>
  );
}
