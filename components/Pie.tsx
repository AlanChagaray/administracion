'use client';
import React from "react";
import ReactECharts from "echarts-for-react";
import { total } from '../utils/formatCurrency';

export const Pie = ({ data = [] }) => {
  const pieData = data.map(item => ({
    value: parseInt(item.total_cantidad, 10), 
    name: item.nombre
  }));

  const option = {
    title: {
      subtext: 'Estadistica de productos',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Pedidos',
        type: 'pie',
        radius: '50%',
        data: pieData, // Pass the mapped pie data here
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return <ReactECharts option={option} />;
};
