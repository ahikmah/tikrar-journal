'use client';

import { Grid } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { TrackerStepper } from '../tracker-stepper';

// ----------------------------------------------------------------------

export function TrackerView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TrackerStepper />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
