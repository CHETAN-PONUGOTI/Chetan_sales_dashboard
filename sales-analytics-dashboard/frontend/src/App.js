import React from 'react';
import Dashboard from './pages/Dashboard';
import { CssBaseline, Box } from '@mui/material';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        <Dashboard />
      </Box>
    </>
  );
}

export default App;
