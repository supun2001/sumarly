import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../api";
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import {Helmet} from 'react-helmet';
const tiers = [
  {
    title: 'Free',
    price: '$0',
    description: ['15 Minutes per Month', 'Perfect for Light Users', '24/7 support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
  },
  {
    title: 'Professional',
    subheader: 'Recommended',
    price: '$15',
    description: ['1000 Minutes per Month', 'Best for Regular Users', 'Priority email support', '24/7 support', 'Detailed summaries question responses',],
    buttonText: 'Start now',
    buttonVariant: 'contained',
    buttonColor: 'secondary',
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: ['Custom Solutions & Unlimited Minutes', 'Tailored for Organisations', 'Help center access', 'Phone & email support'],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState(false);
  const [openContact, setOpenContact] = React.useState(false); // For Contact Us dialog
  const [openBuy, setOpenBuy] = React.useState(false); // For Buy dialog
  const [loading, setLoading] = React.useState(false); // State for loading
  const [formData, setFormData] = React.useState({
    email: '',
    message: '',
    title: '',
    organization: '',
  });
  const [responseMessage, setResponseMessage] = React.useState(''); // State for API response message
  const [hash, setHash] = React.useState();
  const [hashEmail, setHashEmail] = React.useState('');
  const [orderID, setOrderId] = React.useState('');

  const getEmail = () => {
    const storedEmail = localStorage.getItem('email');
    setEmail(!!storedEmail);
    if (storedEmail) {
      setHashEmail(storedEmail); // Set hashEmail to the retrieved email
    }
  };

  React.useEffect(() => {
    getEmail();
  }, []);

  const handleButtonClick = (tierTitle) => {
    if (tierTitle === 'Free') {
      if (email) {
        window.location.reload();
      } else {
        navigate('/login');
      }
    } else if (tierTitle === 'Professional') {
      setOpenBuy(true); // Open buy dialog
    } else if (tierTitle === 'Enterprise') {
      setOpenContact(true); // Open dialog when "Contact us" is clicked
    }
  };

  const handleCloseContact = () => {
    setOpenContact(false);
    setResponseMessage(''); // Reset response message when dialog is closed
  };

  const handleCloseBuy = () => {
    setOpenBuy(false);
    setResponseMessage(''); // Reset response message when dialog is closed
  };

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
      setResponseMessage('Failed to send email. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = () => {
    // Call the API to send the email
    setContactUs();
  };

  const handlePayment = () => {
    navigate('/pay');
  };

  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography component="h2" variant="h4" gutterBottom>
        Pricing
      </Typography>
      {/* Pricing content */}
      <Grid container spacing={3} sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {tiers.map((tier) => (
          <Grid key={tier.title} item xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <CardContent>
                <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === 'Professional' && <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography component="h3" variant="h2">
                    {tier.price}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; per month
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                {tier.description.map((line) => (
                  <Box key={line} sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <CheckCircleRoundedIcon sx={{ width: 20, color: 'primary.main' }} />
                    <Typography variant="subtitle2" component="span">
                      {line}
                    </Typography>
                  </Box>
                ))}

              </CardContent>
              <CardActions>
                <Button fullWidth variant={tier.buttonVariant} color={tier.buttonColor} onClick={() => handleButtonClick(tier.title)}>
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for "Contact Us" */}
      <Dialog open={openContact} onClose={handleCloseContact}>
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please enter your contact details, and we will get back to you as soon as possible.
          </DialogContentText>

          <OutlinedInput
            autoFocus
            required
            margin="dense"
            label="Your Email Address"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <OutlinedInput
            required
            margin="dense"
            label="Message"
            fullWidth
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContact} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for "Buy Now" */}
      <Dialog open={openBuy} onClose={handleCloseBuy}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to proceed with the payment for the Professional plan?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBuy} color="primary">Cancel</Button>
          <Button onClick={handlePayment} color="primary">PayNow</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
