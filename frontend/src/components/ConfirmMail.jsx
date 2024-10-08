import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box, Snackbar, CircularProgress } from '@mui/material';
import { Alert } from '@mui/material';
import api from "../api";

const ConfirmEmail = () => {
    const [token, setToken] = useState(null);
    const [confirmationStatus, setConfirmationStatus] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Extract query parameters
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get('token');

        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [location.search]);

    const confirmEmail = () => {
        if (token) {
            setLoading(true); // Start loading
            api
                .get(`/api/confirm-email/${token}/`)
                .then((res) => {
                    // Handle successful response
                    setConfirmationStatus(res.data.message);
                    setOpenSnackbar(true);
                    setLoading(false); // Stop loading
                    if (res.status === 200) {
                        setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
                    }
                })
                .catch((err) => {
                    // Handle error response
                    let errorMessage = 'An error occurred';
                    if (err.response?.status === 400) {
                        errorMessage = 'Invalid or expired token. Please request a new confirmation email.';
                    } else if (err.response?.status === 404) {
                        errorMessage = 'Token not found. Please check the link and try again.';
                    }
                    setConfirmationStatus(errorMessage);
                    setOpenSnackbar(true);
                    setLoading(false); // Stop loading
                });
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Confirm Email
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Confirm your email
                </Typography>
                <Box sx={{ mt: 2, position: 'relative', display: 'inline-flex' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={confirmEmail}
                        disabled={loading} // Disable button when loading
                        sx={{ mt: 2 }}
                    >
                        Confirm
                    </Button>
                    {loading && (
                        <CircularProgress 
                            size={24} 
                            sx={{ 
                                position: 'absolute', 
                                top: '50%', 
                                left: '50%', 
                                marginTop: '-12px', 
                                marginLeft: '-12px' 
                            }} 
                        />
                    )}
                </Box>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={confirmationStatus.includes('failed') || confirmationStatus.includes('expired') ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {confirmationStatus}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ConfirmEmail;
