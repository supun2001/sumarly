import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import Lottie from 'lottie-react';
import avatarAnimation from '../assets/avatar.json'; // Replace with the path to your Lottie JSON file

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu({ onMenuClick }) {
  // State to hold user email
  const [userEmail, setUserEmail] = React.useState('');
  const [userAccessLevel, setUserAccessLevel] = React.useState('');

  // Fetch email from local storage when component mounts
  React.useEffect(() => {
    const email = localStorage.getItem('email'); // Change 'email' to your actual local storage key
    const access_level = localStorage.getItem('access_level');
    if (email) {
      setUserEmail(email);
    }

    if (access_level) {
      setUserAccessLevel(access_level);
    }
  }, []);

  const handleItemClick = (page) => {
    onMenuClick(page); // Call the function passed from Dashboard
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column', // Arrange children vertically
          height: '100%', // Take the full height of the drawer
        }}
      >
        <Box sx={{ display: 'flex', mt: 'calc(var(--template-frame-height, 0px) + 4px)', p: 1.5 }}>
          <SelectContent />
        </Box>
        <Divider />
        <Stack spacing={2} sx={{ flexGrow: 1 }}> {/* Allow Stack to grow and take up remaining space */}
          <MenuContent onItemClick={handleItemClick} /> {/* Pass handleItemClick to MenuContent */}
        </Stack>
        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Replace Avatar with Lottie Animation */}
          <Lottie
            animationData={avatarAnimation} // Lottie JSON data
            loop={true} // Set to true to loop the animation
            style={{ width: 72, height: 72 }} // Size of the animation
          />
          <Box sx={{ mr: 'auto' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                lineHeight: '16px',
                overflow: 'hidden',      // Prevent overflow
                textOverflow: 'ellipsis', // Show ellipsis for long text
                whiteSpace: 'nowrap',     // Prevent text from wrapping to the next line
                maxWidth: '100px',        // Set a max width to limit the space it occupies
              }}
            >
              {userEmail} 
            </Typography>

            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {userAccessLevel} 
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Box>
    </Drawer>
  );
}
