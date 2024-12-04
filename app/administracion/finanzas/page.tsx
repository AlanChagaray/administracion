"use client";
import React, { useEffect, useState } from "react";
import { finanzasBuscar, finanzasObtener } from "@/app/services/finanzas";
import { Title } from "@/components/Title";
import { BasicLineChart } from "@/components/BasicLineChart";
import { Subtitle } from "@/components/Subtitle";
import { Spinner } from "@/components/Spinner";
import { SpinnerSmall } from "@/components/SpinnerSmall";
import { BasicBar } from "@/components/BasicBar";
import {Card,CardDescription,CardHeader,CardTitle} from "@/components/ui/card";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";
import { formatCurrency } from "@/utils/formatCurrency";
import { months, years } from "@/utils/dateOptions";  
import { Pie } from "@/components/Pie";


export default function Page() {
  const [finanzas, setFinanzas] = useState([]);
  const [dataBasicLineChart, setDataBasicLineChart] = useState([]);
  const [dataBasicBar, setDataBasicBar] = useState([]);
  const [dataPieProducts, setDataPieProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mes, setMes] = useState(new Date().getMonth() +1); 
  const [anio, setAnio] = useState(new Date().getFullYear()); 
  
  useEffect(() => {
    async function fetchData() {
      const dataDate = await finanzasObtener({ mes , anio });

      setFinanzas(dataDate.finanzas);
      setDataBasicLineChart(dataDate.finanza);
      setDataBasicBar(dataDate.finanzaAnual);
      setDataPieProducts(dataDate.productos);
      setLoading(false);
    }
    if (mes && anio) {
      fetchData();
    }
  }, [mes, anio]);

  const handleMonthChange = (value) => {
    setMes(value);
  }

  const handleYearChange = (value) => {
    setAnio(value);
  }

  return (
    <>
      <Title value="Finanzas y Estadísticas" />
      <div >
          <ul className="flex space-x-3 mt-2">
            <li>
              <Select value={mes} onValueChange={ (value) => handleMonthChange(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                  <SelectItem value={month.value}>{month.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>
            <li>
              <Select value={anio} onValueChange={(value) => handleYearChange(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="año" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                  <SelectItem value={year}>{year}</SelectItem>
                   ))}
                </SelectContent>
              </Select>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex space-x-3 mt-2">
            <li>
              <Card className="w-36 rounded-md">
                <CardHeader>
                  <CardTitle>
                    {loading ? (
                      <SpinnerSmall />
                    ) :  (
                      finanzas[0].totalpedidos   
                    ) }
                  </CardTitle>
                  <CardDescription>Pedidos</CardDescription>
                </CardHeader>
              </Card>
            </li>
            <li>
              <Card className="w-48 rounded-md">
                <CardHeader>
                  <CardTitle>
                    {loading ? (
                      <SpinnerSmall />
                    ) :  (
                      formatCurrency( finanzas[0].senias ? finanzas[0].senias : '0.00' )   
                    ) }
                  </CardTitle>
                  <CardDescription>Total señas activas</CardDescription>
                </CardHeader>
              </Card>
            </li>
            <li>
              <Card className="w-48 rounded-md">
                <CardHeader>
                  <CardTitle>
                    {loading ? (
                      <SpinnerSmall />
                    ) :  (
                      formatCurrency( finanzas[0].restantes  ? finanzas[0].restantes : '0.00' )   
                    ) }
                  </CardTitle>
                  <CardDescription>Total deuda</CardDescription>
                </CardHeader>
              </Card>
            </li>
            <li>
              <Card className="w-48 rounded-md">
                <CardHeader>
                  <CardTitle>
                    {loading ? (
                      <SpinnerSmall />
                    ) : (
                      formatCurrency(finanzas[0].totalmes ? finanzas[0].totalmes : '0.00' )
                    )}
                  </CardTitle>
                  <CardDescription>Facturación mensual</CardDescription>
                </CardHeader>
              </Card>
            </li>
            <li>
              <Card className="w-48 rounded-md">
                <CardHeader>
                  <CardTitle>
                    {loading ? (
                      <SpinnerSmall />
                    ) : (
                      formatCurrency(finanzas[0].totalanio)
                    )}
                  </CardTitle>
                  <CardDescription>Facturación anual</CardDescription>
                </CardHeader>
              </Card>
            </li>
          </ul>
        </div>
        <div className="mt-3">
        <hr></hr>
        </div>
      <div className="mt-3">
        <div className="grid grid-cols-2">
          <div> <BasicLineChart data={dataBasicLineChart} /></div>
        <div>
          <Pie data={dataPieProducts}/>
        </div>
        </div>
        
        <div className='mt-3'>
          <div className="bg-white ">
            {loading ? <Spinner /> : <BasicBar data={dataBasicBar} />}
          </div>
        </div>
      </div>
    </>
  );
}
