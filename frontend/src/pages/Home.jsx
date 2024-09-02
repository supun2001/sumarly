import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getMPTheme from '../theme/getMPTheme';
import AppAppBar from '../components/AppAppBar';
// import TemplateFrame from './TemplateFrame';


function Home() {
    const [mode, setMode] = React.useState('light');
    const MPTheme = createTheme(getMPTheme(mode));
  
    // This code only runs on the client side, to determine the system color preference
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
    }, []);
  
    const toggleColorMode = () => {
      const newMode = mode === 'dark' ? 'light' : 'dark';
      setMode(newMode);
      localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
    };
  
    // const toggleCustomTheme = () => {
    //   setShowCustomTheme((prev) => !prev);
    // };
    return (
    <ThemeProvider theme={MPTheme}>
      <CssBaseline enableColorScheme />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
       
        <div>
          
        </div>
      </ThemeProvider>
    );
}

export default Home;
