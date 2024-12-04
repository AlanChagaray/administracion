'use client';
import React from "react";
import ReactECharts from "echarts-for-react";
import { formatCurrency } from "@/utils/formatCurrency";


export const BasicBar = ({ data }) => {
  // Array con los nombres de los meses
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Crear un objeto inicial con todos los meses y sus valores en 0
  const initialData = monthNames.map((name, index) => ({
    mes: index + 1,
    total: 0
  }));

  // Combinar los datos existentes con el objeto inicial, reemplazando los meses que ya tienen datos
  const mergedData = initialData.map(item => {
    const existingData = data.find(d => d.mes === item.mes);
    return {
      ...item,
      total: existingData ? existingData.total : item.total
    };
  });

  // Extraer los meses y totales para el gráfico
  const months = mergedData.map(item => monthNames[item.mes - 1]);
  const total = mergedData.map(item => item.total);

  const option = {
    title: {
      // text: 'Ventas anuales',
      subtext: 'Estadisticas ingresos anuales',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: months, // Mostrar todos los meses
      axisLabel: {
        interval: 0, // Mostrar todas las etiquetas de los meses
        rotate: 45 // Rotar para mejor visualización si es necesario
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function (value) {
          return formatCurrency(value);
        }
      }
    },
    series: [
      {
        data:  total,
        type: 'bar'
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // Tooltip con puntero de sombra para barras
      }
    }
  };

  return (
    <ReactECharts option={option} />
  );
};
