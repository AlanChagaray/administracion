"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Title } from "@/components/Title";

interface Props {
  producto: any;
  show: boolean;
  onClose: () => void;
}

export const ModalEdit = ({ producto, show, onClose }: Props) => {
  if (!show) return null;

  const formRef: any = useRef([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    idproducto: producto[0].idproducto || "",
    nombre: producto[0].nombre || "",
    descripcion: producto[0].descripcion || "",
    preciocompra: producto[0].preciocompra || "",
    precioventa: producto[0].precioventa || "",
    descuento: producto[0].descuento || null,
    idproveedor: producto[0].idproveedor || "",
    estado: producto[0].estado || "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/productos", formData);
      setMessage("Producto editado exitosamente.");
      formRef.current.reset();
    } catch (error) {
      setMessage("Error al editar producto.");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string) => {
    console.log(value);
    setFormData({
      ...formData, 
      "estado" : value,
    });
  };
  // const handleSelectChange = (name: string, value: string) => {
  //   console.log(value);
  //   setFormData({
  //     ...formData, 
  //     [name]: name === "idproveedor" ? parseInt(value) : value, // Convertir a número solo si es idproveedor
  //   });
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="bg-white rounded-md p-4 w-[50%]">
        <div className='flex justify-center mb-3'>
          <Title value='Editar pedido' />
          </div>
          {message ? (
                <div className="justify-center items-center mt-4">
                  <div className={`bg-${message.includes('Error') ? 'red' : 'green'}-400 px-10 py-1 items-center justify-center flex rounded-sm`}>
                    <p className="text-white">
                    {message}
                    </p>
                  </div>
                  <div className="justify-center flex mt-3">
                    <Button type="close" onClick={onClose} />
                  </div>
                </div>
              ) : (
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="grid grid-rows-3 space-y-3">
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
                  <label>Descripción</label>
                  <Input
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 space-x-3">
                <div>
                  <label>Precio Compra</label>
                  <Input
                    type="number"
                    name="preciocompra"
                    value={formData.preciocompra}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Precio</label>
                  <Input
                    type="number"
                    name="precioventa"
                    value={formData.precioventa}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Precio Descuento</label>
                  <Input
                    type="number"
                    name="descuento"
                    value={formData.descuento}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 space-x-3">
                <div>
                  <label>Estado</label>
                  <Select
                    value={formData.estado}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponible">Disponible</SelectItem>
                      <SelectItem value="agotado">Agotado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label>Proveedor</label>
                  <Input
                    type="text"
                    name="idproveedor"
                    value={formData.idproveedor}
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
              )}
        </div>
      </div>
    </div>
  );
};
