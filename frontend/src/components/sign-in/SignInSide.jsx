import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getSignInSideTheme from './theme/getSignInSideTheme';
import SignInCard from './SignInCard';
import Content from './Content';


export default function SignInSide({ route, method }) {
  const [mode, setMode] = React.useState('light');
  const SignInSideTheme = createTheme(getSignInSideTheme(mode));

  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);



  return (
    <ThemeProvider theme={SignInSideTheme}>
      <CssBaseline enableColorScheme />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: { xs: 'auto', md: '100%' },
            minHeight: '100vh',
            alignItems: 'center',
          },
          (theme) => ({
            backgroundImage:
              'radial-gradient(ellipse at 70% 51%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
            backgroundSize: 'cover',
            ...theme.applyStyles('dark', {
              backgroundImage:
                'radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
            }),
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
          }}
        >
          <Content mode={mode}/>
          <SignInCard route={route} method={method} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
