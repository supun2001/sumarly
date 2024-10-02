import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import MainGrid from '../components/MainGrid';
import SideMenu from '../components/SideMenu';
import AppTheme from '../theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../theme/customizations';
import Users from './Users';
import Sales from './Sales';
import Feedbacks from './Feedbacks';
import Errors from './Errors';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

// Create a mapping of page components
const componentsMap = {
  home: <MainGrid />, // Home page content
  users: <Users />, // Placeholder for Users component
  sales: <Sales />, // Placeholder for Sales component
  feedbacks: <Feedbacks />, // Placeholder for Feedbacks component
  errors: <Errors />, // Placeholder for Errors component
};

export default function Dashboard(props) {
  const [currentPage, setCurrentPage] = useState('home'); // Initialize state

  // Function to handle page changes
  const handleMenuClick = (page) => {
    setCurrentPage(page); // Update the current page
  };

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu onMenuClick={handleMenuClick} /> {/* Pass the handler to SideMenu */}
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {componentsMap[currentPage]} {/* Render the current page content */}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
