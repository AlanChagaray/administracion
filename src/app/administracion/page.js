"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ReactCalendar } from "@/components/ReactCalendar";
import { Spinner } from "@/components/Spinner";
import { SpinnerSmall } from "@/components/SpinnerSmall";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IoCartOutline, IoPeopleOutline } from "react-icons/io5";
import { clientesBuscar } from "../services/clientes";
import { pedidosBuscar } from "../services/pedidos";
import { Subtitle } from "@/components/Subtitle";

dayjs.extend(advancedFormat);

export default function Page() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await pedidosBuscar();
      setPedidos(data);

      const dataClientes = await clientesBuscar();
      setClientes(dataClientes);
      setLoading(false);
    }
    fetchData();
  }, []);


  return (
    <div >
      <div>
        <ul className="lg:flex justify-center mt-2">
          <li className="sm:flex">
            <Card className="lg:w-44 sm:full justify-center flex  bg-green-400 hover:bg-green-500">
              <Link href={'administracion/pedidos/nuevo'}>
                <CardHeader>
                  <CardTitle>
                    <div className="flex justify-center">
                      <IoCartOutline color='white' size={20} />
                    </div>
                  </CardTitle>
                  <CardDescription className='text-white'>NUEVO PEDIDO</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </li>
          <li>
            <Card className="lg:w-44 sm:full justify-center flex bg-blue-400 hover:bg-blue-500">
              <Link href={'administracion/clientes/nuevo'}>
                <CardHeader>
                  <CardTitle>
                    <div className="flex justify-center">
                      <IoPeopleOutline color='white' size={20} />
                    </div>
                  </CardTitle>
                  <CardDescription className='text-white'>NUEVO CLIENTE</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </li>
          <li className="sm:flex">
            <Card className="lg:w-44 sm:full justify-center flex bg-red-400 hover:bg-red-500">
              <Link href={'administracion/clientes/nuevo'}>
                <CardHeader>
                  <CardTitle>
                    <div className="flex justify-center">
                      <IoPeopleOutline color='white' size={20} />
                    </div>
                  </CardTitle>
                  <CardDescription className='text-white'>NUEVO PRODUCTO</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </li>
          <li className="sm:flex">
            <Card className="lg:w-44 sm:full rounded-md">
              <CardHeader className="sm:items-center">
                <CardTitle className="text-center sm:flex">
                  {loading ? (
                    <SpinnerSmall />
                  ) : (
                    clientes.length
                  )}
                </CardTitle>
                <CardDescription className="text-center sm:flex">Clientes</CardDescription>
              </CardHeader>
            </Card>
          </li>
          <li className="sm:flex">
            <Card className="lg:w-44 sm:full rounded-md">
              <CardHeader className="sm:items-center">
                <CardTitle className="text-center sm:flex">
                  {loading ? (
                    <SpinnerSmall />
                  ) : (
                    pedidos.length
                  )}
                </CardTitle>
                <CardDescription className="text-center sm:flex">Pedidos</CardDescription>
              </CardHeader>
            </Card>
          </li>
        </ul>
      </div>

      <div className="mt-3">
        <hr></hr>
      </div>

      <div className="mt-5">
        <div className="flex justify-center">
          <Subtitle value='Calendario de pedidos' />
        </div>
        <div className="mt-2">
          <ReactCalendar pedidos={pedidos} />
        </div>
      </div>
      <div className="mt-4">
        <hr></hr>
      </div>
      <div className='mt-5'>
        <div className='lg:grid grid-cols-2 space-x-3'>
          <div >
            <Subtitle value='Pedidos recientes' />
            {loading ? (
              <Spinner />
            ) : (
              <Table>
                <TableHeader >
                  <TableRow>
                    <TableHead>Descripcion</TableHead>
                    <TableHead>Fecha retiro</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                {pedidos.length > 0 ? (
                  <TableBody>
                    {pedidos.slice(0, 6).map((pedido, index) => (
                      <TableRow key={pedido.idpedido}>
                        <TableCell>{pedido.descripcion}</TableCell>
                        <TableCell>{pedido.fecharetiro}</TableCell>
                        <TableCell>${pedido.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <p>No posee proximos pedidos.</p>
                )}
              </Table>
            )}
          </div>
          <div>
            <Subtitle value='Clientes recientes' />
            {loading ? (
              <Spinner />
            ) : (
              <Table>
                <TableHeader >
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellido</TableHead>
                    <TableHead>Telefono</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                {clientes.length > 0 ? (
                  <TableBody>
                    {clientes.slice(0, 6).map((cliente, index) => (
                      <TableRow key={cliente.idcliente}>
                        <TableCell>{cliente.nombre}</TableCell>
                        <TableCell>{cliente.apellido}</TableCell>
                        <TableCell>{cliente.telefono}</TableCell>
                        <TableCell>{cliente.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <p>No posee clientes.</p>
                )}
              </Table>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3"></div>
    </div>
  );
}
