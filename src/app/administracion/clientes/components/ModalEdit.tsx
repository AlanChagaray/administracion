"use client";
import { useState, useRef } from "react";
import axios from "axios";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";

interface Props {
  cliente: any;
  show: boolean;
  onClose: () => void;
}

export const ModalEdit = ({ cliente, show, onClose }: Props) => {

  const formRef: any = useRef([]);
  const [message, setMessage] = useState(""); 
  const [formData, setFormData] = useState({
    idcliente: cliente[0].idcliente || "",
    nombre: cliente[0].nombre || "",
    apellido: cliente[0].apellido || "",
    documento: cliente[0].documento || "",
    telefono: cliente[0].telefono || "",
    email: cliente[0].email || "",
  });

  if (!show) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(process.env.NEXT_PUBLIC_API_URL +"/clientes", formData);
      setMessage("Cliente editado correctamente.");
      formRef.current.reset();
    } catch (error) {
      setMessage("Error al editar cliente.");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="bg-white  rounded-md p-4 ">
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="flex justify-center">
            <Title value='Editar cliente' />
            </div>
            <div className="grid grid-rows-2 space-y-2 mt-3">
              <div className="grid grid-cols-3 space-x-3">
                <div>
                  <label>Nombre</label>
                  <Input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Apellido</label>
                  <Input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Documento</label>
                  <Input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 space-x-3">
                <div>
                  <label>Teléfono</label>
                  <Input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Email (opcional)</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-2">
              <div className="grid grid-cols-2 space-x-3">
                <div>
                  <Button type="submit" />
                </div>
                <div>
                  <Button type="close" onClick={onClose} />
                </div>
              </div>
            </div>
          </form>

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
