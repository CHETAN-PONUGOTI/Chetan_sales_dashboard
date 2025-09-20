import React, { useState } from 'react';
import { Container, Grid, Typography, CircularProgress, Box, Alert } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import dayjs from 'dayjs';

import useAnalyticsData from '../hooks/useAnalyticsData';
import { formatCurrency, formatNumber } from '../utils/formatters';

import DateRangePicker from '../components/DateRangePicker';
import MetricCard from '../components/MetricCard';
import TopDataTable from '../components/TopDataTable';
import RegionPieChart from '../components/charts/RegionPieChart';
import SalesByCategoryChart from '../components/charts/SalesByCategoryChart';

const Dashboard = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(1, 'year').toDate());
  const [endDate, setEndDate] = useState(new Date());

  const { data, loading, error } = useAnalyticsData(startDate, endDate);

  const topProductsColumns = [
    { id: 'productName', label: 'Product Name' },
    { id: 'totalQuantitySold', label: 'Total Quantity Sold' },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sales Analytics Dashboard
      </Typography>
      
      <DateRangePicker 
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      )}

      {error && !loading && (
         <Alert severity="error">{error}</Alert>
      )}

      {data && !loading && !error && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MetricCard title="Total Revenue" value={data.keyMetrics.totalRevenue} format={formatCurrency} icon={<MonetizationOnIcon />} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MetricCard title="Total Sales" value={data.keyMetrics.totalSales} format={formatNumber} icon={<ShoppingCartIcon />} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MetricCard title="Avg. Order Value" value={data.keyMetrics.avgOrderValue} format={formatCurrency} icon={<AttachMoneyIcon />} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RegionPieChart data={data.salesByRegion} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <SalesByCategoryChart data={data.salesByCategory} />
          </Grid>
          <Grid item xs={12}>
            <TopDataTable title="Top 5 Selling Products" data={data.topProducts} columns={topProductsColumns} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;