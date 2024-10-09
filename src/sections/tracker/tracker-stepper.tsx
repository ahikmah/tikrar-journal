import { useState } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';

import { varAlpha } from 'src/theme/styles';

// ----------------------------------------------------------------------

const steps = [
  {
    label: 'Daily Recap',
    description: 'Review and reinforce what you memorized yesterday to strengthen retention.',
  },
  {
    label: 'Listen & Absorb',
    description:
      'Listen to the recitation attentively to familiarize yourself with the rhythm and pronunciation.',
  },
  {
    label: 'Explore Tafseer',
    description:
      'Read the Tafseer to understand the context and meaning of the verses you’re memorizing.',
  },
  {
    label: 'Record Your Voice',
    description:
      'Record yourself reciting the verses to identify areas for improvement and enhance your pronunciation.',
  },
  {
    label: 'Repeat Aloud',
    description:
      'Recite the verses aloud multiple times to reinforce memory through active engagement.',
  },
  {
    label: 'Make Connections',
    description:
      'Connect the new verses with previously memorized ones to create a cohesive understanding.',
  },
  {
    label: 'Quick Review',
    description:
      'Conduct a brief review of all previously memorized material to maintain overall retention.',
  },
  {
    label: 'Practice & Reinforce',
    description:
      'Engage in regular practice sessions to ensure the verses remain fresh in your memory.',
  },
];

// ----------------------------------------------------------------------

export function TrackerStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mt: 3 }}>
                <Button variant="contained" onClick={handleNext}>
                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button disabled={index === 0} onClick={handleBack}>
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper
          sx={{
            p: 3,
            mt: 3,
            bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
          }}
        >
          <Typography sx={{ mb: 2 }}>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Paper>
      )}
    </>
  );
}
