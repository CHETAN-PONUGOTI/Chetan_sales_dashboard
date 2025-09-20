import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Paper } from '@mui/material';

const SalesByCategoryChart = ({ data }) => {
  const option = {
    title: {
      text: 'Revenue by Product Category',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLabel: {
         interval: 0,
         rotate: 30 
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
          // UPDATED: Changed the formatter from a string to a function
          formatter: (value) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        data: data.map(item => item.value),
        type: 'bar',
        name: 'Revenue'
      },
    ],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
    }
  };

  return (
    <Paper sx={{ p: 2, height: '400px' }}>
      <ReactECharts option={option} style={{ height: '100%' }} />
    </Paper>
  );
};

export default SalesByCategoryChart;