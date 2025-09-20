import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Paper } from '@mui/material';

const RegionPieChart = ({ data }) => {
  const option = {
    title: {
      text: 'Revenue by Region',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      // UPDATED: Changed the formatter from a string to a function
      formatter: (params) => {
        const { name, value, percent } = params;
        return `${name}: $${value.toLocaleString()} (${percent}%)`;
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Region Revenue',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
     <Paper sx={{ p: 2, height: '400px' }}>
      <ReactECharts option={option} style={{ height: '100%' }} />
    </Paper>
  );
};

export default RegionPieChart;