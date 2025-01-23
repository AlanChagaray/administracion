"use client";
import React, { useState, useRef, useEffect } from "react";
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
import { Pedido } from "@/app/types/pedido";

interface Props {
  pedido: Pedido[];
  show: boolean;
  onClose: () => void;
}

function formatDateToISO(dateString: string) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

export const ModalEdit = ({ pedido, show, onClose }: Props) => {

  const formRef: any = useRef([]);
  const senia = pedido[0].senia;
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [payChecked, setPayChecked] = useState(false);
  const [formData, setFormData] = useState({
    idpedido: pedido[0].idpedido || "",
    fecharetiro: formatDateToISO(pedido[0].fecharetiro) || "",
    senia: pedido[0].senia || "",
    total: pedido[0].total || "",
    estado: pedido[0].estado || "",
    descripcion: pedido[0].descripcion || "",
  });

  useEffect(() => {
    setPayChecked(senia === formData.total);
  }, [show, senia, formData.total]);

  if (!show) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/pedidos", formData);
      setMessage("Pedido editado exitosamente.");
      formRef.current.reset();
    } catch (error) {
      setMessage("Error al editar pedido.");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      estado: value,
    });
  };

  const handleClick = (e:any) => {
    
    if(e.target.checked){
      setPayChecked(true);
      setFormData({
        ...formData,
        senia : formData.total
      })
    }else{
      setPayChecked(false);

      setFormData({
        ...formData,
        senia 
      })
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="bg-white  rounded-md p-4 ">
          <div className='flex justify-center mb-3'>
          <Title value='Editar pedido' />
          </div>
          {message ? (
                <div className="justify-center items-center mt-4">
                  <div className={`bg-${message.includes('Error') ? 'red' : 'green'}-400 px-10 py-1 rounded-sm`}>
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
            
            <div className="grid grid-rows-2 space-y-3">
              <div className="grid grid-cols-3 space-x-2">
                <div>
                  <label>Abonado</label>
                  <Input
                    type="number"
                    name="senia"
                    value={formData.senia}
                    onChange={handleChange}
                    disabled={payChecked}
                  />
                </div>
                <div>
                  <label className='flex justify-center' >Pagado</label>
                  <Input
                    type="checkbox"
                    checked={payChecked}
                    onClick={handleClick}
                  />
                </div>
                <div>
                  <label>Total</label>
                  <Input
                    type="number"
                    name="total"
                    value={formData.total}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 space-x-2">
              <div>
                  <label>Fecha de Retiro</label>
                  <Input
                    type="date"
                    name="fecharetiro"
                    value={formData.fecharetiro}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                      <SelectItem value="pendiente">pendiente</SelectItem>
                      <SelectItem value="proceso">proceso</SelectItem>
                      <SelectItem value="finalizado">finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label>Descripción</label>
                <Textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                />
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
        )}
        </div>
      </div>
    </div>
  );
};
