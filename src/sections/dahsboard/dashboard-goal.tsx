import React from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Button, Stack, Typography } from '@mui/material';

import { today } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function DashboardGoal() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: `to left, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)} 0%, ${theme.vars.palette.grey[900]} 100%`,
          imgUrl: `${CONFIG.assetsDir}/assets/illustrations/illustration-goals.webp`,
        }),
        pt: 5,
        pb: 5,
        pr: 3,
        gap: 3,
        pl: { xs: 3, md: 5 },
        borderRadius: 2,
        height: { md: 1 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: `solid 1px ${theme.vars.palette.grey[800]}`,
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Stack
        gap={2}
        justifyContent={{ xs: 'center', md: 'space-between' }}
        flexDirection={{ xs: 'column', md: 'row' }}
        sx={{ position: 'relative' }}
      >
        <Stack>
          <Typography variant="h4">Target Day 61 🎯</Typography>
        </Stack>

        <Typography variant="subtitle2">{today('DD MMMM YYYY')}</Typography>

        <Box sx={{ position: 'absolute', top: -40, right: -10 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Current Plan: 1 Page/Day
          </Typography>
        </Box>
      </Stack>

      <Stack
        gap={2}
        justifyContent="space-between"
        alignItems={{ xs: 'center', md: 'end' }}
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        <Stack>
          <Typography variant="h5">(٨٣-٩١) ال عمران</Typography>
          <Typography variant="caption">Ali &apos;Imran (83-91)</Typography>
        </Stack>
        <Stack>
          <Button variant="contained" color="error">
            Add Reason for Stopping
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
