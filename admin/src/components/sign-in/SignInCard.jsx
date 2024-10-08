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
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';

import ForgotPassword from './ForgotPassword';
import { SitemarkIcon } from './CustomIcons';

import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

// Define EMAIL as a constant
const EMAIL = 'email';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard({ route, method }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For register form
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState(""); // CSRF token state
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  useEffect(() => {
    const fetchCsrfToken = async () => {
        try {
            const response = await fetch('/api/csfr/', {
                method: 'GET',
                credentials: 'include', // Ensure cookies are sent with the request
            });

            if (!response.ok) {
                const errorText = await response.text(); // Read the error response for debugging
                throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json(); // Parse JSON
            setCsrfToken(data.csrfToken); // Set the CSRF token from response

        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    fetchCsrfToken(); // Call the async function
}, []);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!csrfToken) {
      console.error("CSRF token is missing");
      setEmailError(true);
      setEmailErrorMessage("Unable to submit form, missing CSRF token");
      setLoading(false);
      return;
    }

    try {
      const requestBody = { email, password };
      const config = {
        headers: {
          'X-CSRFToken': csrfToken, // Add CSRF token to the headers
        },
      };
      const res = await api.post(route, requestBody, config);

      if (method === "login") {
        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          localStorage.setItem(EMAIL, res.data.email);
          localStorage.setItem('access_level', res.data.access_level);
          localStorage.setItem('accepted', res.data.accepted);
          localStorage.setItem('created_at', res.data.created_at);
          localStorage.setItem('last_login', res.data.last_login);
          navigate("/");
        }
      } else {
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Login error:", error);
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

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        {name}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ ariaLabel: 'email' }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Password</Typography>
            {method === "login" && (
              <Link component="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: 'baseline' }}>
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
        )}

        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained" disabled={loading}>
          {loading ? 'Loading...' : name}
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          {method === "login" ? "Don't have an account? " : "Already have an account? "}
          <Link component="button" onClick={() => window.location.reload()} variant="body2">
            {method === "login" ? "Register" : "Login"}
          </Link>
        </Typography>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Please check your email to confirm your registration.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
