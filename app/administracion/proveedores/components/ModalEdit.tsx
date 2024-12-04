"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Subtitle } from "@/components/Subtitle";

interface Props {
  proveedor: any;
  show: boolean;
  onClose: () => void;
}

export const ModalEdit = ({ proveedor, show, onClose }: Props) => {
  if (!show) return null;

  const formRef: any = useRef([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    idproveedor: proveedor[0].idproveedor || "",
    proveedor: proveedor[0].proveedor || "",
    contacto: proveedor[0].contacto || "",
    telefono: proveedor[0].telefono || "",
    email: proveedor[0].email || "",
    direccion: proveedor[0].direccion || "",
    localidad: proveedor[0].localidad || ""
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/proveedores", formData);
      setMessage("Proveedor editado exitosamente.");
      formRef.current.reset();
    } catch (error) {
      setMessage("Error al editar proveedor.");
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
        <div className="bg-white rounded-md p-4 w-[50%]">
            <div>
            <Subtitle value='Editar proveedor'/>
            </div>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="grid grid-rows-3 space-y-3">
              <div className="grid grid-cols-3 space-x-3">
                <div>
                  <label>Proveedor</label>
                  <Input
                    type="text"
                    name="proveedor"
                    value={formData.proveedor}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Contacto</label>
                  <Input
                    name="contacto"
                    value={formData.contacto}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Telefono</label>
                  <Input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 space-x-3">
                <div>
                  <label>Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Dirección</label>
                  <Input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Localidad</label>
                  <Input
                    type="text"
                    name="localidad"
                    value={formData.localidad}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-4">
              <div className="grid grid-cols-2 space-x-3">
                <Button type="submit" />
                <Button type="close" onClick={onClose} />
              </div>
            </div>
          </form>

          {message && (
            <div className="flex justify-center items-center mt-4">
              <div
                className={`bg-${
                  message.includes("Error") ? "red" : "green"
                }-400 px-10 py-1 rounded-sm`}
              >
                <p className="text-white">{message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
