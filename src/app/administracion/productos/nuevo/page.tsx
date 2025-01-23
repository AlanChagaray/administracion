"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/Button";
import { Title } from "@/components/Title";
import { SuccessModal } from "@/components/SuccessModal";
import { ErrorModal } from "@/components/ErrorModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { proveedoresBuscar } from "@/app/services/proveedores";

const Page =() => {

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [proveedores, setProveedores] = useState([]);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    preciocompra: "",
    precioventa: "",
    descuento: "" | null,
    idproveedor: "",
    estado: "",
  });
  const formRef: any = useRef();
  const router = useRouter();

  const fetchProveedores = async () => {
    const data = await proveedoresBuscar();
    setProveedores(data);
  };

  useEffect(() => {
    fetchProveedores();
  }, []);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/productos", formData);
      setShowSuccessModal(true);
      formRef.current.reset();
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: name === "idproveedor" ? parseInt(value) : value, 
    });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push(`/administracion/productos`);
  }

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <Title value="Nuevo producto" />
      <div className="w-full flex justify-center item-center content-center ">
        <form
          className="w-[80%] shadow-md bg-white p-4"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="grid grid-rows-3 space-y-2">
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
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Precio compra</label>
                <Input
                  type="number"
                  name="preciocompra"
                  value={formData.preciocompra}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-3">
              <div>
                <label>Precio venta</label>
                <Input
                  type="number"
                  name="precioventa"
                  value={formData.precioventa}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Descuento</label>
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
                <label>Proveedor</label>
                <Select
                  value={formData.idproveedor}
                  onValueChange={(value)=> handleSelectChange('idproveedor',value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                  {proveedores.map((proveedor) => (
                    <SelectItem
                      key={proveedor.idproveedor}
                      value={proveedor.idproveedor}>{proveedor.proveedor}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Estado</label>
                <Select
                  value={formData.estado}
                  onValueChange={(value)=> handleSelectChange('estado',value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disponible">disponible</SelectItem>
                    <SelectItem value="nodisponible">no disponible</SelectItem>
                    <SelectItem value="oferta">oferta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="justify-center items-center flex mt-2">
              <Button type="submit" />
            </div>
          </div>
        </form>

        {/* Modal de éxito */}
        <SuccessModal show={showSuccessModal} onClose={handleCloseSuccessModal} />

        {/* Modal de error */}
        <ErrorModal show={showErrorModal} onClose={handleCloseErrorModal} />
      </div>
    </>
  );
}

export default Page;