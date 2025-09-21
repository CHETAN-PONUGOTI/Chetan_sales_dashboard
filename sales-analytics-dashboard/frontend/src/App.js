import React from 'react';
import Dashboard from './pages/Dashboard';
import { CssBaseline, Box, AppBar, Toolbar, Typography } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* STYLING: Added a standard AppBar for the header */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <AssessmentIcon sx={{ mr: 2 }} />
            <Typography variant="h6" noWrap component="div">
              Sales Analytics Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        
        {/* STYLING: Main content area with a light grey background */}
        <Box 
          component="main" 
          sx={{ 
            backgroundColor: '#f4f6f8', 
            flexGrow: 1, 
            p: 3, 
            minHeight: '100vh' 
          }}
        >
          <Toolbar /> {/* This is a spacer to push content below the AppBar */}
          <Dashboard />
        </Box>
      </Box>
    </>
  );
}

export default App;