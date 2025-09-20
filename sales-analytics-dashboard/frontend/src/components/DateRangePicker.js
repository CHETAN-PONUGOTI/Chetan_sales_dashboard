import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Typography } from '@mui/material';

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={4} p={2} sx={{ backgroundColor: 'white', borderRadius: 2, flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{mr:1}}>From:</Typography>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            className="date-picker-input"
          />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{mr:1}}>To:</Typography>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
            className="date-picker-input"
          />
      </Box>
    </Box>
  );
};

export default DateRangePicker;