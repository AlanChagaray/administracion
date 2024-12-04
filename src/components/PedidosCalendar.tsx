import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { parse, format } from "date-fns";
import { es } from "date-fns/locale";
import "../styles/PedidosCalendar.css";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Button } from "./ui/button";

interface Pedido {
  idpedido: number;
  nombre: string;
  descripcion: string;
  fecharetiro: string; // Cambié a string para manejar el formato MM/dd/yyyy
  senia: number;
  restante: number;
  total: number;
  estado: string;
  activo: boolean;
}

interface Props {
  pedidos: Pedido[];
}

export const PedidosCalendar = ({ pedidos }: Props) => {
  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [locale, setLocale] = useState("en-US");

  useEffect(() => {
    setLocale("es");
  }, []);

  const handleDateClick = (date: Date) => {
    const pedido = pedidos.find(
      (pedido) =>
        parse(pedido.fecharetiro, "MM/dd/yyyy", new Date()).toDateString() ===
        date.toDateString()
    );
    if (pedido) {
      console.log(pedido);
      setPedido(pedido);
      setSelectedOrder(pedido);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const tileContent = ({ date }: { date: Date }) => {
    const pedidosOnDate = pedidos.filter(
      (pedido) =>
        parse(pedido.fecharetiro, "MM/dd/yyyy", new Date()).toDateString() ===
        date.toDateString()
    );
    return pedidosOnDate.length > 0 ? (
      <IoCheckmarkCircleOutline className="text-green-400" size={18} />
    ) : null;
  };

  return (
    <div className="mt-4">
      <Calendar
      className={'shadow-lg'}
        onClickDay={handleDateClick}
        tileContent={tileContent}
        locale={locale}
      />

      {showModal && pedido && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-4 text-center text-2xl w-56 h-auto">
              
                <div className="flex items-center justify-center">
                  <div>
                    <p>Nombre: {pedido.nombre}</p>
                    {/* <p>Fecha de Retiro: {pedido.fecharetiro}</p> */}
                    <p>Seña: ${pedido.senia}</p>
                    <p>Restante: ${pedido.restante}</p>
                    <p>Total: ${pedido.total}</p>
                    <p>Estado: {pedido.estado}</p>
                    <p>Descripción: {pedido.descripcion}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    className="bg-red-400 hover:bg-red-500 w-10"
                    onClick={handleCloseModal}
                  >x
                  </Button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
