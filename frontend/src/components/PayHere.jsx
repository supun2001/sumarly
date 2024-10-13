import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';

const PayHerePaymentPage = () => {
  const [hash, setHash] = useState(null);
  const [orderID, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Load the PayHere script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Define PayHere event handlers once the script is loaded
    script.onload = () => {
      window.payhere.onCompleted = (orderId) => {
        console.log('Payment completed. OrderID:', orderId);
        // Handle successful payment here (e.g., redirect or show a success message)
      };

      window.payhere.onDismissed = () => {
        console.log('Payment dismissed');
        // Handle payment dismissal here (e.g., show a message)
      };

      window.payhere.onError = (error) => {
        console.log('Error:', error);
        // Handle error case here (e.g., show an error message)
      };
    };

    return () => {
      // Cleanup script if the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail);

    if (storedEmail) {
      getHash(storedEmail);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Fetch hash using the email
  const getHash = async (email) => {
    try {
      const res = await api.post('/api/get_hash', { username: email });
      console.log('API Response: ', res);
      setHash(res.data.hash);
      setOrderId(res.data.order_id);
    } catch (error) {
      console.log('Error fetching hash: ', error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle the button click to initiate payment
  const handlePayment = () => {
    if (hash) {
      const payment = {
        sandbox: true,
        merchant_id: '1228421', // Replace with your Merchant ID
        return_url: 'http://localhost:5173/', // Important: Provide your return URL
        cancel_url: 'http://localhost:5173/', // Important: Provide your cancel URL
        notify_url: 'http://localhost:5173/', // Change this to your production URL
        order_id: orderID, // Use the order ID from state
        items: 'Sumarly',
        amount: '4300.00',
        currency: 'LKR',
        hash: hash,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: email, // Use email directly from state
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
      };

      window.payhere.startPayment(payment);
      console.log('Payment Request:', payment);

    } else {
      console.error("Hash is not available. Payment cannot be initiated.");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Payment Details
        </Typography>
        <Typography variant="body1" component="h2">
          Email : {email}
        </Typography>
        <Typography variant="body1" component="h2">
          Amount : Rs.4300.00 (LKR)
        </Typography>

        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} key={key}>
                <TextField
                  fullWidth
                  variant="standard"
                  label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePayment}
              >
                PayHere Pay
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PayHerePaymentPage;
