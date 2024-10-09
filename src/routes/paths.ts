// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  MAIN: '',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  proPath: '#',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/sign-in`,
      signUp: `${ROOTS.AUTH}/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  main: {
    root: `${ROOTS.MAIN}/dashboard`,
    dailyPlan: `${ROOTS.MAIN}/daily-plan`,
    program: `${ROOTS.MAIN}/program`,
    group: `${ROOTS.MAIN}/group`,
    journal: `${ROOTS.MAIN}/journal`,
    resources: `${ROOTS.MAIN}/resources`,
    glossary: `${ROOTS.MAIN}/glossary`,
  },
};
