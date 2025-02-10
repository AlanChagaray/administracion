import { Button } from "@/components/Button";
import { Title } from "@/components/Title";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

export const AddPedido = ({ pedido, onPedido, onBackProductos }: any) => {
  const formRef: any = useRef();
  const [formData, setFormData] = useState({
    fecharetiro: "",
    senia: "",
    descripcion: "",
  });

  useEffect(() => {
    if (pedido) {
      setFormData({
        fecharetiro: pedido.fecharetiro,
        senia: pedido.senia,
        descripcion: pedido.descripcion,
      });
    }
  }, [pedido]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onPedido(formData);
    formRef.current.reset();
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="lg:w-[80%] shadow-md bg-white p-4">
          <div className="flex justify-start">
            <button
              onClick={onBackProductos}
              className="flex items-center text-gray-500"
            >
              <IoArrowBackOutline color="grey" size="16" />
              <span className="ml-2">Pagina anterior</span>
            </button>
          </div>
          <div className="flex justify-center">
            <Title value="Detalle pedido" />
          </div>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="grid grid-cols-2 space-x-3">
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
                <label>Abonado</label>
                <Input
                  type="number"
                  name="senia"
                  value={formData.senia}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-3">
              <label>Descripción</label>
              <Textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="justify-center items-center flex mt-3">
              <Button type="submit" value="Siguiente" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
