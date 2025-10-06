import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#f5f5f5' },
  },
});

function App() {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ total: 0, avgLatency: 0 });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
    fetchStats();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/history');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      await fetch('http://localhost:8888/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      setPrompt('');
      // Refresh data
      await fetchHistory();
      await fetchStats();
    } catch (error) {
      console.error('Error sending prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            LLM Observability Platform
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Monitor and analyze LLM API usage across applications
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Requests
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Average Latency
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.avgLatency}ms
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Test Request Form */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Test LLM Request
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter prompt to test LLM integration"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              margin="normal"
              variant="outlined"
              disabled={loading}
            />
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ mt: 2 }}
              disabled={loading || !prompt.trim()}
            >
              {loading ? 'Sending...' : 'Send to LLM'}
            </Button>
          </form>
        </Paper>

        {/* Requests History Table */}
        <Paper elevation={2}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Request History
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Timestamp</strong></TableCell>
                  <TableCell><strong>Model</strong></TableCell>
                  <TableCell><strong>Prompt</strong></TableCell>
                  <TableCell><strong>Latency</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow 
                    key={request._id}
                    hover
                    onClick={() => {
                      setSelectedRequest(request);
                      setOpenDialog(true);
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      {new Date(request.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>{request.model}</TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography noWrap>
                        {request.prompt}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box 
                        sx={{ 
                          color: request.latency > 1000 ? 'error.main' : 'success.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {request.latency}ms
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Request Details Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          maxWidth="md" 
          fullWidth
        >
          <DialogTitle>
            Request Details - {selectedRequest?.model}
          </DialogTitle>
          <DialogContent>
            {selectedRequest && (
              <>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 1 }}>
                  <strong>Timestamp:</strong> {new Date(selectedRequest.timestamp).toLocaleString()}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Latency:</strong> {selectedRequest.latency}ms
                </Typography>
                
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Prompt
                </Typography>
                <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50', maxHeight: 200, overflow: 'auto' }}>
                  <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                    {selectedRequest.prompt}
                  </Typography>
                </Paper>

                <Typography variant="h6" sx={{ mb: 1 }}>
                  Response
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.50', maxHeight: 300, overflow: 'auto' }}>
                  <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                    {selectedRequest.response}
                  </Typography>
                </Paper>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default App;