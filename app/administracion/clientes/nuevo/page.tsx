"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/Button";
import { Title } from "@/components/Title";
import { SuccessModal } from "@/components/SuccessModal";
import { ErrorModal } from "@/components/ErrorModal";

export default function page() {
  const formRef: any = useRef();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    telefono: "",
    email: "",
  });

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
      const response = await axios.post("/api/clientes", formData);
      setShowSuccessModal(true);
      formRef.current.reset();
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push(`/administracion/clientes`);
  }

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
  return (
    <>
      <Title value="Nuevo cliente" />
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
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
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
          <div className="justify-center items-center flex">
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
