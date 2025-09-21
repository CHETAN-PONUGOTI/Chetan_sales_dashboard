import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const MetricCard = ({ title, value, icon, format = (v) => v }) => {
  return (
    // STYLING: Added overflow: 'hidden' to prevent scrollbars
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        textAlign: 'center', 
        height: '100%', 
        overflow: 'hidden' 
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
        {icon}
        <Typography sx={{ fontSize: 20, ml: 1.5 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {format(value)}
      </Typography>
    </Paper>
  );
};

export default MetricCard;