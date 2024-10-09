'use client';

import React from 'react';

import { Button, Grid } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { _memorizedSurah } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { useAuthContext } from 'src/auth/hooks';

import { DashboardGoal } from '../dashboard-goal';
import { DashboardWelcome } from '../dashboard-welcome';
import { DashboardGroupCard } from '../dashboard-group-card';
import { DashboardWidgetSummary } from '../dashboard-widget-summary';
import { DashboardMemorizeProgress } from '../dashboard-memorize-progress';

// ----------------------------------------------------------------------

export const DashboardView = () => {
  const { user } = useAuthContext();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <DashboardWelcome
            title="👋🏻 السَّلَامُ عَلَيْكُمْ, أَهْلًا وَسَهْلًا"
            description={`Welcome back, ${user?.displayName}. Let's start your daily plan and improve your memorization.`}
            action={
              <Button variant="contained" color="primary">
                Start now
              </Button>
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardGoal />
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardWidgetSummary
            title="Total verses memorized"
            isImproved
            total={384}
            unit="verses"
            imgUrl={`${CONFIG.assetsDir}/assets/illustrations/illustration-quran.webp`}
            description="6.16% of 6236 verses"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardWidgetSummary
            title="Current streak"
            isImproved={false}
            total={3}
            unit="days"
            imgUrl={`${CONFIG.assetsDir}/assets/illustrations/illustration-streak.webp`}
            description="Longest streak 57 days"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardWidgetSummary
            title="Negligences this month"
            isImproved={false}
            total={2}
            unit="days"
            imgUrl={`${CONFIG.assetsDir}/assets/illustrations/illustration-thumbs-down.webp`}
            description="5 stopping excuses"
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <DashboardGroupCard
            title="Group Memorization"
            subheader="Memorize together with your group"
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <DashboardMemorizeProgress
            title="Memorization Progress"
            subheader="Your progress in memorizing the Qur’an"
            list={_memorizedSurah}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
};
