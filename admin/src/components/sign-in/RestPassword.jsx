import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import api from "../../api";
import { useNavigate, useLocation } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export default function RestPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setToken(queryParams.get('token'));
    }, [location.search]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) return;
        setLoading(true);

        try {
            if (!token) {
                setPasswordError(true);
                setPasswordErrorMessage('Invalid or missing token.');
                return;
            }

            const response = await api.post('api/reset_password/', { token, password });

            if (response.status === 200) {
                setSuccessMessage("Password reset successfully!");
                setPassword('');  // Clear password input field
                setConfirmPassword('');  // Clear confirm password input field                
                setTimeout(() => {
                    navigate('/login'); // Navigate to the login page
                }, 2000);
            } else {
                setPasswordError(true);
                setPasswordErrorMessage('Failed to reset password. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setPasswordError(true);
                setPasswordErrorMessage('URL is expired.');
            } else {
                setPasswordError(true);
                setPasswordErrorMessage('Failed to reset password. Please try again.');
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const validateInputs = () => {
        let isValid = true;

        if (!password || password.length < 2) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else if (password !== confirmPassword) {
            setPasswordError(true);
            setPasswordErrorMessage('Passwords do not match.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
                padding: 2
            }}
        >
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Reset Password
                </Typography>
                {successMessage && (
                    <Typography
                        component="p"
                        variant="body1"
                        sx={{ color: 'green', textAlign: 'center', mb: 2 }}
                    >
                        {successMessage}
                    </Typography>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
                >
                    <FormControl>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            label="New Password"
                            autoComplete="new-password"
                            required
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="confirmPassword"
                            placeholder="••••••"
                            type="password"
                            id="confirmPassword"
                            label="Confirm Password"
                            autoComplete="new-password"
                            required
                            fullWidth
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                    <ForgotPassword open={open} handleClose={handleClose} />
                    <Button type="submit" fullWidth variant="contained" disabled={loading}>
                        {loading ? 'Loading...' : 'Reset Password'}
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}
