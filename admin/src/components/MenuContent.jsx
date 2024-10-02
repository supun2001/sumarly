import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FeedbackIcon from '@mui/icons-material/Feedback';
import GppBadIcon from '@mui/icons-material/GppBad';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, page: 'home' },
  { text: 'Users', icon: <SupervisedUserCircleIcon />, page: 'users' },
  { text: 'Sales', icon: <MonetizationOnIcon />, page: 'sales' },
  { text: 'Feedbacks', icon: <FeedbackIcon />, page: 'feedbacks' },
  { text: 'Errors', icon: <GppBadIcon />, page: 'errors' },
];

export default function MenuContent({ onItemClick }) { // Accept the onItemClick prop
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => onItemClick(item.page)}> {/* Call onItemClick with the page name */}
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
