import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SummarizeIcon from '@mui/icons-material/Summarize';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';

import sumarlylogoDark from "../../assets/sumarly logo dark.png";
import sumarlylogoLigh from "../../assets/sumarly logo light.png";


const items = [
  {
    icon: <SummarizeIcon sx={{ color: 'text.secondary' }} />,
    title: 'Instant Summaries',
    description:
      'Generate concise and accurate summaries in seconds, helping you save time and focus on what matters.',
  },
  {
    icon: <AccessTimeIcon sx={{ color: 'text.secondary' }} />,
    title: 'Time-Saving',
    description:
      'Process lengthy lectures or content in minutes, giving you more time to concentrate on deeper learning.',
  },
  {
    icon: <CloudSyncIcon sx={{ color: 'text.secondary' }} />,
    title: 'Seamless Integration',
    description:
      'Sync effortlessly with your favorite platforms, allowing easy access to summarizations wherever you are.',
  },
  {
    icon: <ShutterSpeedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Fast and Efficient',
    description:
      'Designed for speed, our app ensures you get fast results without compromising on quality.',
  },
];

const Content = ({ mode }) => {
  const logoSrc = mode === 'dark' ? sumarlylogoDark : sumarlylogoLigh;

  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <img src={logoSrc} alt="Sumarly Logo" style={{ height: 38, width: 100, marginRight: 16 }} />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
};

export default Content;
