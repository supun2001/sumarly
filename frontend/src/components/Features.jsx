import { useState, useEffect } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import MuiChip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import api from "../api";
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Questions from "./Questions";
import { Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';

const parseSummary = (text) => {
  if (!text) return null;

  // Ensure text is a string
  const summaryText = typeof text === 'string' ? text : Array.isArray(text) ? text.join('\n') : '';

  // Split by '**' to identify headings
  const sections = summaryText.split('**').filter(Boolean);

  return sections.map((section, index) => {
    const [heading, ...content] = section.split('\n').filter(Boolean);
    return (
      <Box key={index} sx={{ mb: 3 }}>
        {index % 2 === 0 ? (
          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
            {heading}
          </Typography>
        ) : (
          <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
            {content.join('\n').split('- ').map((line, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  - {line}
                </Typography>
              </Box>
            ))}
          </Typography>
        )}
      </Box>
    );
  });
};

// Chip component with conditional styles based on `selected` prop
const Chip = styled(MuiChip)(({ theme, selected }) => ({
  background: selected
    ? 'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))'
    : theme.palette.background.default,
  color: selected ? 'hsl(0, 0%, 100%)' : theme.palette.text.primary,
  borderColor: selected ? theme.palette.primary.light : theme.palette.divider,
  '& .MuiChip-label': {
    color: selected ? 'hsl(0, 0%, 100%)' : theme.palette.text.secondary,
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function Features() {
  const [value, setValue] = React.useState('1');
  const [notes, setNotes] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [context, setContext] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = React.useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [loginConfirmed, setLoginConfirmed] = useState(false);
  const [userConfirmation, setUserConfirmation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginConfirmed) {
      navigate('/login'); // Navigate to login after logout
    }
  }, [loginConfirmed, navigate]);

  React.useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } 
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => {
        const notes = res.data;
        if (Array.isArray(notes)) {
          // Check if notes array has at least one item
          if (notes.length > 0) {
            const firstNote = notes[0]; // Access the first item in the array
            const firstTranscript = firstNote.transcript;
            setTranscript(firstTranscript);
            setUserConfirmation(firstNote.confirmed);
          } else {
            setUserConfirmation(false);
            setTranscript(null);
          }
        } else {
          setAlertMessage("Unexpected data format received.");
          setAlertSeverity("error");
          setOpenAlert(true);
        }
      })
      .catch((err) => {
        // console.error("Error fetching data:", err);
        // setAlertMessage("Error fetching data: " + (err.response?.data?.message || err.message));
        // setAlertSeverity("error");
        // setOpenAlert(true);
      });
  };

  const handleTranscribeSubmit = async (e) => {
    e.preventDefault();

    // Check if email exists
    if (!email) {
      setAlertMessage("You need to log in to access this feature.");
      setAlertSeverity("warning");
      setOpenAlert(true);
      // Delay the navigation by 2 seconds (2000 milliseconds)
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    
      return;
    }
    setLoading(true);

    const formData = new FormData();
    if (youtubeUrl) formData.append('url', youtubeUrl);
    if (context) formData.append('context', context);
    if (file) formData.append('file', file);

    try {
      const response = await api.post('/api/sumary/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    
      if (response.status === 200) {
        setResult(response.data);
        setError(null);
        getNotes();
      } else {
        setError(response.data.error);
        setResult(null);
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setAlertMessage("Your time limit is over. Please try again next month or upgrade the package.");
        setAlertSeverity("warning");
        setOpenAlert(true);
      } else {
        setError('Fetch Error: ' + err.message);
        setResult(null);
      }
    } finally {
      setLoading(false);
      setYoutubeUrl("");
      setContext("");
      setFile(null);
    }
    
  };
  const handleClose = () => {
    setOpenAlert(false);
    if (alertSeverity === "success") {
      setLoginConfirmed(true);
    }
  };


  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 }, pb: { xs: 0, sm: 0 }, mb: 0 }}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={openAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sumarly"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: '100%', height: '450px', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="tabs example">
                  <Tab label="Upload File" value="1" sx={{ flexGrow: 1 }} />
                  <Tab label="YouTube Link" value="2" sx={{ flexGrow: 1 }} />
                </TabList>
              </Box>

              <TabPanel value="1">
                <form onSubmit={handleTranscribeSubmit} style={{ width: '100%' }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Upload file
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Button>

                  <TextField
                    required
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    label="Content"
                    variant="standard"
                    fullWidth
                    margin="normal"
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    {email ? (
                      userConfirmation ? (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                        </Button>
                      ) : (
                        <Box sx={{ textAlign: 'center', width: '100%' }}>
                          <Typography variant="h5" component="h5" sx={{ mb: 2 }}>
                            Please verify your email
                          </Typography>
                        </Box>
                      )
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                      </Button>
                    )}
                  </Box>


                </form>
              </TabPanel>

              <TabPanel value="2">
                <form onSubmit={handleTranscribeSubmit} style={{ width: '100%' }}>
                  <TextField
                    required
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    value={youtubeUrl}
                    label="URL"
                    variant="standard"
                    fullWidth
                    margin="normal"
                  />

                  <TextField
                    required
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    label="Content"
                    variant="standard"
                    fullWidth
                    margin="normal"
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    {email ? (
                      userConfirmation ? (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                        </Button>
                      ) : (
                        <Box sx={{ textAlign: 'center', width: '100%' }}>
                          <Typography variant="h5" component="h5" sx={{ mb: 2 }}>
                            Please verify your email
                          </Typography>
                        </Box>
                      )
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                      </Button>
                    )}
                  </Box>

                </form>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              p: 3,
              overflow: 'auto',
              maxHeight: '400px'
            }}
          >
            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
              Summary
            </Typography>

            {/* Display CircularProgress when loading is true */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <CircularProgress />
              </Box>
            ) : result ? (
              <Box sx={{ mb: 3 }}>
                {parseSummary(result.summary)}
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Remaining Time: {result.remaining_time}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body1" color="textSecondary">
                No summary available.
              </Typography>
            )}

            {error && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h4" component="h2" sx={{ color: 'error.main' }}>
                  Error
                </Typography>
                <Typography variant="body1" sx={{ color: 'error.main' }}>
                  {error}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      {/* Questions */}

      <Grid item xs={12} sm={6}>
        <Questions transcript={transcript} userConfirmation={userConfirmation} />
      </Grid>
    </Container>
  );
}

