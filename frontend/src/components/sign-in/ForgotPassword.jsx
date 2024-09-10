import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import api from "../../api";  // Assuming this is your configured Axios instance

function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);  // Track loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);  // Reset the error state
    setSuccessMessage(null);  // Reset the success message state
    setLoading(true);  // Start loading

    try {
      const response = await api.post('api/request_password_reset/', { email });
      setSuccessMessage("Check your email for the reset link.");  // Set success message
      setEmail('');  // Clear the email input field
      console.log(response.data.message);  // Debugging: log the response message

      // Delay the handleClose function by 3 seconds (3000 milliseconds)
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      console.error(err);  // Debugging: log the error
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        setSuccessMessage(null);  // Reset success message when dialog is closed
      }}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a link to
          reset your password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}  // Disable input when loading
        />
        {error && (
          <DialogContentText color="error">
            {error}
          </DialogContentText>
        )}
        {successMessage && (
          <DialogContentText color="primary">
            {successMessage}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose} disabled={loading}>Cancel</Button>
        {loading ? (
          <CircularProgress size={24} sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
        ) : (
          <Button variant="contained" type="submit">
            Continue
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
