import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import api from "../api";

const ConfirmEmail = () => {
    const [token, setToken] = useState(null);
    const [confirmationStatus, setConfirmationStatus] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
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
            api
                .get(`/api/confirm-email/${token}/`)
                .then((res) => {
                    // Handle successful response
                    setConfirmationStatus(res.data.message);
                    setOpenSnackbar(true);
                    if (res.status === 200) {
                        setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
                    }
                })
                .catch((err) => {
                    // Handle error response
                    const errorMessage = err.response?.data?.message || 'An error occurred';
                    setConfirmationStatus(errorMessage);
                    setOpenSnackbar(true);
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
                       Confrim your email
                    </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={confirmEmail}
                    sx={{ mt: 2 }}
                >
                    Confirm
                </Button>
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
