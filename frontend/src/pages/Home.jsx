import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getMPTheme from '../theme/getMPTheme';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Highlights from '../components/Highlights';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from "../components/Footer";
import Divider from '@mui/material/Divider';

function Home() {
  const [mode, setMode] = React.useState('light');
  const MPTheme = createTheme(getMPTheme(mode));

  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }

    // Scroll to the top of the page on initial render
    window.scrollTo(0, 0);
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  return (
    <ThemeProvider theme={MPTheme}>
      <CssBaseline enableColorScheme />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Features />
      <div>
        <Testimonials />
        <Highlights />
        <Pricing />
        <FAQ />
        <Footer mode={mode} />
      </div>
    </ThemeProvider>
  );
}

export default Home;
