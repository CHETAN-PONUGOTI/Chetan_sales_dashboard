import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const MetricCard = ({ title, value, icon, format = (v) => v }) => {
  return (
    <Card sx={{ minWidth: 275, textAlign: 'center', height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          {icon}
          <Typography sx={{ fontSize: 18, ml: 1 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {format(value)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;