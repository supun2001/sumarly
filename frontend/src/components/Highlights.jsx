import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SummarizeIcon from '@mui/icons-material/Summarize';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FlareIcon from '@mui/icons-material/Flare';

const items = [
  {
    icon: <SummarizeIcon />, // Replace with an appropriate icon for summarization
    title: 'Instant Summaries',
    description:
      'Submit YouTube links or upload files to receive clear, concise summaries instantly. Gain quick insights from any audio content with ease.',
  },
  {
    icon: <QuestionAnswerIcon />, // Replace with an appropriate icon for Q&A
    title: 'Interactive Q&A',
    description:
      'Ask questions about your audio content and get precise, detailed answers to enhance your understanding and engagement.',
  },
  {
    icon: <GroupAddIcon />, // Replace with an appropriate icon for user experience
    title: 'User-Friendly Design',
    description:
      'Enjoy a seamless experience with an intuitive interface designed for effortless navigation and immediate results.',
  },
  {
    icon: <SpeedIcon />, // Replace with an appropriate icon for efficiency
    title: 'Efficient Processing',
    description:
      'Experience fast and accurate processing with our advanced algorithms, ensuring timely and reliable summaries every time.',
  },
  {
    icon: <SupportAgentIcon />, // Replace with an appropriate icon for support
    title: 'Dedicated Support',
    description:
      'Access responsive and helpful customer support to assist you with any questions or issues, ensuring smooth use of our app.',
  },
  {
    icon: <FlareIcon />, // Replace with an appropriate icon for advanced features
    title: 'Advanced Capabilities',
    description:
      'Utilize cutting-edge technology for detailed audio insights and customizable summary options to meet your unique needs.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Discover what makes our summarizer exceptional: versatility, reliability, intuitive design, and cutting-edge technology. Experience dependable customer support and meticulous attention to detail.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}