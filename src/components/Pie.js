'use client';
import React , { useState , useEffect} from "react";
import ReactECharts from "echarts-for-react";

export default function Pie ({ data = [] }){

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
  if (!isClient) {
    return null;
  }
  return <ReactECharts option={option} />;
};
