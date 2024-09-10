import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sitemark from './SitemarkIcon';
import ToggleColorMode from './ToggleColorMode';
import Typography from '@mui/material/Typography';
import LogoutMenu from "./LogoutMenu";
import { useNavigate } from 'react-router-dom';
import sumarlylogoDark from "../assets/sumarly logo dark.png"
import sumarlylogoLigh from "../assets/sumarly logo light.png"

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      console.log('Retrieved email:', storedEmail); // Log the email to the console
    } else {
      console.log('No email found in localStorage');
    }
  }, []);

  const handleSignInClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleSignUpClick = () => {
    navigate('/register'); // Navigate to the register page
  };

  // Function to handle smooth scrolling to a specific section
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const logoSrc = mode === 'dark' ? sumarlylogoDark : sumarlylogoLigh;

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 10 }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <img src={logoSrc} alt="Sumarly Logo" style={{ height: 38, width: 100, mr: 2 }} />

            {/* <Sitemark /> */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small" onClick={() => handleScrollToSection('features')}>
                Features
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => handleScrollToSection('testimonials')}>
                Testimonials
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => handleScrollToSection('highlights')}>
                Highlights
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => handleScrollToSection('pricing')}>
                Pricing
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => handleScrollToSection('faq')}>
                FAQ
              </Button>

            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <ToggleColorMode
              data-screenshot="toggle-mode"
              mode={mode}
              toggleColorMode={toggleColorMode}
            />
            {email ? (
              <LogoutMenu email={email}/>
            ) : (
              <>
                <Button color="primary" variant="text" size="small" onClick={handleSignInClick}>
                  Sign in
                </Button>
                <Button color="primary" variant="contained" size="small" onClick={handleSignUpClick}>
                  Sign up
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem onClick={() => handleScrollToSection('features')}>Features</MenuItem>
                <MenuItem onClick={() => handleScrollToSection('testimonials')}>Testimonials</MenuItem>
                <MenuItem onClick={() => handleScrollToSection('highlights')}>Highlights</MenuItem>
                <MenuItem onClick={() => handleScrollToSection('pricing')}>Pricing</MenuItem>
                <MenuItem onClick={() => handleScrollToSection('faq')}>FAQ</MenuItem>
                <MenuItem>
                  <ToggleColorMode
                    data-screenshot="toggle-mode"
                    mode={mode}
                    toggleColorMode={toggleColorMode}
                  />
                </MenuItem>
                {email ? (
                  <MenuItem>
                  {/* <LogoutMenu /> */}
                    <LogoutMenu email={email}/>
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem>
                      <Button color="primary" variant="contained" fullWidth onClick={handleSignInClick}>
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="outlined" fullWidth onClick={handleSignUpClick}>
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
