import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { parse } from "date-fns";
import "../styles/calendar.css";
import { IoCart } from "react-icons/io5";
import { Button } from "./Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Subtitle } from "./Subtitle";
import { formatCurrency } from "@/utils/formatCurrency";
import { Pedido } from "@/app/types/Pedido";

interface Props {
  pedidos: Pedido[];
}

export const ReactCalendar = ({ pedidos }: Props) => {
  const [selectedOrders, setSelectedOrders] = useState<Pedido[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [locale, setLocale] = useState("en-US");

  useEffect(() => {
    setLocale("es");
  }, []);

  const handleDateClick = (date: Date) => {
    const pedidosOnDate = pedidos.filter(
      (pedido) =>
        parse(pedido.fecharetiro, "dd/MM/yyyy", new Date()).toDateString() ===
        date.toDateString()
    );
    
    if (pedidosOnDate.length > 0) {
      setSelectedOrders(pedidosOnDate);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const tileContent = ({ date }: { date: Date }) => {
    const pedidosOnDate = pedidos.filter(
      (pedido) =>
        parse(pedido.fecharetiro, "dd/MM/yyyy", new Date()).toDateString() ===
        date.toDateString()
    );
      return pedidosOnDate.length > 0 ? (
      <div className="relative flex items-center justify-center">
        <IoCart className="text-green-600" size={18} />
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs font-bold w-4 h-4 flex items-center justify-center">
          {pedidosOnDate.length}
        </span>
      </div>
    ) : null;
  };

  return (
    <div>
      <Calendar
        className={"shadow-xl rounded-md"}
        onClickDay={handleDateClick}
        tileContent={tileContent}
        locale={locale}
        
      />

      {showModal && selectedOrders.length > 0 && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-4 text-center text-2xl w-50% h-auto">
              <div className="flex justify-center mb-3">
                <Subtitle value="Información de pedidos" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Descripcion</TableHead>
                    <TableHead>Fecha retiro</TableHead>
                    <TableHead>Abonado</TableHead>
                    <TableHead>Debe</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrders.map((pedido) => (
                    <TableRow key={pedido.idpedido}>
                      <TableCell>{pedido.nombre} {pedido.apellido ? pedido.apellido : ''}</TableCell>
                      <TableCell>{pedido.descripcion}</TableCell>
                      <TableCell>{pedido.fecharetiro}</TableCell>
                      <TableCell>
                          {pedido.senia == 0 ? (
                          <p className="text-red-500">no abonado</p>
                          ) : pedido.senia == pedido.total  ? (
                          <p >--</p>
                          ): (
                            formatCurrency( pedido.senia)
                          )}
                        </TableCell>
                        <TableCell>{
                          pedido.total - pedido.senia === 0 ?(
                          <p className="text-green-400">pagado</p>
                          ) :  (
                            formatCurrency( pedido.total - pedido.senia) 
                          )}</TableCell>
                      <TableCell>{formatCurrency( pedido.total)}</TableCell>
                      <TableCell>{pedido.estado}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center mt-2">
                <Button type='close' onClick={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
