import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import api from '../api';

const PaymentNotification = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [username, setUsername] = useState(null);

  const location = useLocation();

  useEffect(() => {

    setUsername(localStorage.getItem('email'));
    const fetchPaymentDetails = async () => {
      // Get query parameters from the URL
      const params = new URLSearchParams(location.search);
      const statusCode = params.get('status_code');
      const order_id = params.get('order_id');
      const payment_id = params.get('payment_id');
      const payhere_amount = params.get('payhere_amount');
      const payhere_currency = params.get('payhere_currency');
      const status_message = params.get('status_message');
      const md5sig = params.get('md5sig');

      // Determine payment status based on status_code
      let statusText = '';

      // Call the updateDB function
      await updateDB(statusCode, md5sig, setPaymentStatus);

      // Set state with received data
      setOrderId(order_id);
      setPaymentId(payment_id);
      setAmount(payhere_amount);
      setCurrency(payhere_currency);
      setStatusMessage(status_message);
    };

    // Update the database and fetch payment details
    const updateDB = async (statusCode, md5sig, setPaymentStatus) => {
      try {
        if (statusCode === '2') {
          const res = await api.post('/api/hash/', {
            statusCode: statusCode,
            hash: md5sig,
            order_id:orderId,
            amount:amount,
            username:username,
            currency:currency,
          });

          if (res.status === 200) {
            setPaymentStatus('Payment successful!');
          } else {
            setPaymentStatus('Payment failed!');
          }
        } else {
          // Handle other status codes as needed
          setPaymentStatus('Payment not successful');
        }
      } catch (error) {
        console.log("Update error = ", error);
        setPaymentStatus('Error while updating payment status.');
      }
    };

    fetchPaymentDetails();
  }, [location]);

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Payment Status
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {paymentStatus}
        </Typography>
        <Typography variant="body1">
          <strong>Order ID:</strong> {orderId}
        </Typography>
        <Typography variant="body1">
          <strong>Payment ID:</strong> {paymentId}
        </Typography>
        <Typography variant="body1">
          <strong>Amount:</strong> {amount} {currency}
        </Typography>
        <Typography variant="body1">
          <strong>Status Message:</strong> {statusMessage}
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={() => window.location.href = '/'}>
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentNotification;
