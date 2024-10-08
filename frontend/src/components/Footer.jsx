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
import api from "../api";
import sumarlylogoDark from "../assets/sumarly logo dark.png";
import sumarlylogoLigh from "../assets/sumarly logo light.png";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [openDialog, setOpenDialog] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    message: '',
    title: '',
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setResponseMessage('');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const setContactUs = async () => {
    setLoading(true); // Start loading
    try {
      const res = await api.post("/api/contact_us/", formData);
      setResponseMessage('Email was sent successfully! We will contact you in 2-3 business days.'); // Set success message
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setResponseMessage('Please login to continue.'); // Handle 401 error specifically
      } else {
        setResponseMessage('Failed to send email. Please try again.'); // Handle other errors
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const handleSubmit = () => {
    // Call the API to send the email
    setContactUs();
  };

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
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              If you run into any issues, feel free to reach out to us. We're here to help!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Email : hanzstudio.contact@gmail.com <br />
              Phone : +94 76 29 36 994
            </Typography>
            <Button type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setOpenDialog(true)} autoFocus>
              Report problem
            </Button>

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
          <Link color="text.secondary" variant="body2" href="https://hanzstudiosl.com/?i=1" target="_blank">
            About us
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
          <Link color="text.secondary" variant="body2" href="/policy" target="_blank">
            Terms
          </Link>
          <Link color="text.secondary" variant="body2" href="/policy" target="_blank">
            Privacy
          </Link>
          <Link color="text.secondary" variant="body2" href="#" onClick={() => setOpenDialog(true)}>
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


      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please enter your contact details, and we will get back to you as soon as possible.
          </DialogContentText>

          <OutlinedInput
            autoFocus
            required
            margin="dense"
            label="Email Address"
            placeholder="Email address"
            type="email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <OutlinedInput
            required
            margin="dense"
            label="Title"
            placeholder="Title"
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <OutlinedInput
            required
            margin="dense"
            label="Message"
            placeholder="Message"
            fullWidth
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          {loading && <CircularProgress />}
          {responseMessage && (
            <Typography
              variant="h6" // Change to h6 for better visibility
              color={responseMessage.includes('successfully') ? 'green' : 'red'}
              sx={{ mt: 2 }}
            >
              {responseMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>


  );
}
