import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import sumarlylogoDark from "../assets/sumarly logo dark.png";
import sumarlylogoLigh from "../assets/sumarly logo light.png";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="https://hanzstudiosl.com/">
        Hanz Studio
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer({ mode }) {
  const logoSrc = mode === 'dark' ? sumarlylogoDark : sumarlylogoLigh;

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <img src={logoSrc} alt="Sumarly Logo" style={{ height: 38, width: 100, marginRight: 16 }} />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
              Join queqest way to sumarise your lecture materials
            </Typography>


          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Product
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            Features
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Testimonials
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Highlights
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Pricing
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Company
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            About us
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Careers
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Press
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Legal
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            Terms
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Privacy
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Contact
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="/policy" target="_blank">
            Return Policy
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" variant="body2" href="/policy" target="_blank">
            Privacy Policy
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" variant="body2" href="/policy" target="_blank">
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href=""
            aria-label="Facebook"
            target="_blank"
            sx={{ alignSelf: 'center' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href=""
            target="_blank"
            aria-label="Instagram"
            sx={{ alignSelf: 'center' }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://wa.me/94705286258" 
            target="_blank"
            aria-label="WhatsApp"
            sx={{ alignSelf: 'center' }}
          >
            <WhatsAppIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
