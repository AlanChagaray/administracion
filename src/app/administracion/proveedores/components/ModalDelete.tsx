import React, { useState } from "react";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { Subtitle } from "@/components/Subtitle";
import axios from "axios";

interface Props {
  idproveedor: number;
  show: boolean;
  onClose: () => void;
}

async function deleteProducto(IdProveedor: number) {
  try {
    const { data } = await axios.delete(
      process.env.NEXT_PUBLIC_API_URL + `/proveedores?idproveedor=${IdProveedor}`
    );
    return data || null;
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    throw error; // Propagar el error
  }
}

export const ModalDelete = ({ idproveedor, show, onClose }: Props) => {

  const [message, setMessage] = useState(""); 

  if (!show) return null;

  const IdProveedor: number = idproveedor;

  const handleClickDelete = async () => {
    try {
      const response = await deleteProducto(IdProveedor);
      setMessage("Proveedor eliminado correctamente.");
    } catch (error) {
      setMessage("Error al eliminar el proveedor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-md p-4 w-[30%]">
          <div className="flex justify-center items-center">
            <Subtitle value="¿Seguro desea eliminar el pedido?" />
          </div>
              <div className="flex justify-center items-center mt-2">
                <div className="grid grid-cols-2 space-x-3">
                  <div>
                    <Button type="delete" onClick={handleClickDelete} />
                  </div>
                  <div>
                    <Button type="close" onClick={onClose} />
                  </div>
                </div>
              </div>

              {message && (
                <div className="flex justify-center items-center mt-4">
                  <div className={`bg-${message.includes('Error') ? 'red' : 'green'}-400 px-10 py-1 rounded-sm`}>
                    <p className="text-white">
                    {message}
                    </p>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};
