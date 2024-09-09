import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 0, sm: 0 }, // Removed bottom padding
          mb: 0, // Removed bottom margin
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{
            alignItems: 'center',
            width: { xs: '100%', sm: '70%' },
            pb: 0, // Ensure no bottom padding
            mb: 0, // Ensure no bottom margin
          }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              mb: 0, // Ensure no bottom margin
            }}
          >
            The&nbsp;best&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              summariser
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
              mb: 0, // Ensure no bottom margin
            }}
          >
            Quickly transform long content into concise, clear summaries with our AI summarizer. Ideal for boosting productivity and comprehension. Try it today!
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
