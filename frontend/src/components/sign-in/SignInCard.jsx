import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import ForgotPassword from './ForgotPassword';
import { SitemarkIcon } from './CustomIcons';
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

const EMAIL = 'email';  // Define EMAIL as a constant

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
}));

export default function SignInCard({ route, method }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [loading, setLoading] = useState(false);
  const [checkedPolicies, setCheckedPolicies] = useState(false); // State for checkbox
  const [policyError, setPolicyError] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setCheckedPolicies(event.target.checked);
    setPolicyError(false); // Reset error when checkbox is clicked
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (method == 'Register' && !checkedPolicies) {
      setPolicyError(true);
      return; // Prevent submission if checkbox is not checked
    }
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem(EMAIL, username);
        navigate("/");
      } else {
        setDialogOpen(true); // Open the dialog on successful registration
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setEmailError(true);
          setEmailErrorMessage("Email or password incorrect");
        } else if (error.response.status === 400) {
          setEmailError(true);
          setEmailErrorMessage("Email already registered");
        } else {
          setEmailError(true);
          setEmailErrorMessage("An unexpected error occurred");
        }
      } else {
        setEmailError(true);
        setEmailErrorMessage("Network error, please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!username || !/\S+@\S+\.\S+/.test(username)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 2) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (method === "register" && password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        {name}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ ariaLabel: 'email' }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Password</Typography>
            {method === "login" && (
              <Link
                component="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: 'baseline' }}
              >
                Forgot your password?
              </Link>
            )}
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ ariaLabel: 'password' }}
          />
        </FormControl>

                {method === "register" && (
          <>
            <FormControl>
              <Typography>Confirm Password</Typography>
              <TextField
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                name="confirmPassword"
                placeholder="••••••"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ ariaLabel: 'confirm-password' }}
              />
            </FormControl>

            {/* Checkbox for policies */}
            <FormControl error={policyError}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedPolicies}
                    onChange={handleCheckboxChange}
                    name="policies"
                    required
                  />
                }
                label={
                  <Typography>
                    I agree to the{' '}
                    <Link href="/policy" target="_blank">
                      Terms and Conditions
                    </Link>,{' '}
                    <Link href="/policy" target="_blank">
                      Privacy Policy
                    </Link>, and{' '}
                    <Link href="/policy" target="_blank">
                      Return Policy
                    </Link>.
                  </Typography>
                }
              />
            </FormControl>
          </>
        )}


        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained" disabled={loading}>
          {loading ? 'Loading...' : name}
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          {method === "login" ? (
            <>
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" variant="body2">
                Sign in
              </Link>
            </>
          )}
        </Typography>
      </Box>

      {/* Dialog for registration confirmation */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Registration Successful!</DialogTitle>
        <DialogContent>
          <Typography>
            Please check your email to verify your account.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
