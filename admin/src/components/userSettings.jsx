import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Dialog, Button, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import { useNavigate } from 'react-router-dom';
import api from "../api";
import ForgotPassword from './sign-in/ForgotPassword';

export default function UserSettings({ open, onClose }) {
    const [userSettings, setUserSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [logoutConfirmed, setLogoutConfirmed] = useState(false);
    const [handleRestOpen, setHandleRestOpen] = useState(false); // State for resetting password

    useEffect(() => {
        if (logoutConfirmed) {
            navigate('/login');
        }
    }, [logoutConfirmed, navigate]);

    useEffect(() => {
        if (open) {
            getUserSettings();
        }
    }, [open]);

    const getUserSettings = () => {
        setLoading(true);
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setUserSettings(data[0] || null);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                if (err.response && err.response.status === 401) {
                    navigate('/logout');
                } else {
                    alert("An error occurred: " + err.message);
                }
            });
    };

    const handleLogout = () => {
        navigate("/logout");
    };

    const handleRest = () => {
        setHandleRestOpen(true);
    };

    const handleCloseRest = () => {
        setHandleRestOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <Container sx={{ py: { xs: 0, sm: 5 }, pb: { xs: 2, sm: 5 }, mb: 0 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h2">User Settings</Typography>
                        <Button onClick={onClose} sx={{ marginLeft: 'auto' }}>
                            <CloseIcon />
                        </Button>
                    </Box>
                    {loading ? (
                        <CircularProgress sx={{ display: 'block', margin: 'auto' }} /> // Centered loading indicator
                    ) : (
                        <Box>
                            {userSettings ? (
                                <>
                                <Box mb={2}>
                                    <Typography variant="body1">Remaing Time: {userSettings.time} seconds</Typography>
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="body1">User Type: {userSettings.user_type}</Typography>
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="body1">Email Confirmed: {userSettings.confirmed ? 'Yes' : 'No'}</Typography>
                                </Box>
                                <Box mb={2}>
                                    <Button variant="contained" onClick={handleRest} fullWidth>
                                        Reset Password
                                    </Button>
                                </Box>
                                <Box mb={2}>
                                    <Button variant="contained" onClick={handleLogout} fullWidth>
                                        Cancel Plan
                                    </Button>
                                </Box>
                            </>
                            ) : (
                                <Typography variant="body1">No user settings found.</Typography>
                            )}
                        </Box>
                    )}
                </Container>
            </Dialog>

            <ForgotPassword open={handleRestOpen} handleClose={handleCloseRest} />
        </>
    );
}
