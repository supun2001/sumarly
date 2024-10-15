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
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });
  const [email, setEmail] = useState(null);
  const secretKey = import.meta.env.API_URL;

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
  }, []); 

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePayment = async () => {
    try {
      const res = await api.post('/api/get_hash/', {
        ...formData,
        email: email, // Use the stored email from localStorage
      });
  
      console.log('API Response: ', res);
  
      const hash = res.data.hash; // Assuming hash is part of the response
  
      if (hash) {
        const payment = {
          sandbox: true,
          merchant_id: res.data.merchant_id, // Ensure this is not undefined
          return_url: "https://www.sumarly.com/", // Important: Provide your return URL
          cancel_url: "https://www.sumarly.com/", // Important: Provide your cancel URL
          notify_url: `${secretKey}/api/hash/`, // Change this to your production URL
          order_id: res.data.orderID, // Use the order ID from state
          items: res.data.items, // Ensure this is not undefined or empty
          amount: res.data.amount, // Ensure this is not undefined
          currency: res.data.currency, // Ensure this is not undefined
          hash: res.data.hash, // Use the hash from the API response
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          city: res.data.city,
          country: res.data.country,
        };
  
        // Log the payment object before starting the payment
        console.log('Payment Request:', payment);
  
        // Check for any undefined properties
        Object.keys(payment).forEach(key => {
          if (payment[key] === undefined) {
            console.error(`Property ${key} is undefined`);
          }
        });
  
        window.payhere.startPayment(payment);
      } else {
        console.error("Hash is not available. Payment cannot be initiated.");
      }
    } catch (error) {
      console.log('Error fetching hash: ', error);
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
