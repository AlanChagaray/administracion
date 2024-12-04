'use client';
import React from "react";
import ReactECharts from "echarts-for-react";
import { formatCurrency } from "@/utils/formatCurrency";

export const BasicLineChart = ({ data }) => {

  // Extraer fechas y totales de los pedidos
  const fechas = data.map(index => index.fecharetiro);
  const totales = data.map(index => index.total ?? 0);

  const option = {
    title: {
      // text: 'Ventas mes actual',
      subtext: 'Estadisticas de ingresos mensual',
      left: 'center'
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: fechas, // Usar las fechas como etiquetas del eje X
      axisLabel: {
        formatter: (value) => {
          // Formato de la fecha para mostrar en el eje X
          return value;
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value) => {
          return formatCurrency(value);
        },
      },
    },
    series: [
      {
        type: "line",
        data: totales, // Usar los totales como valores en el eje Y
        label: {
          show: true,
          formatter: ({ value }) => formatCurrency(value),
        },
      },
    ],
  };

  return (
      <ReactECharts option={option} />
  );
};
