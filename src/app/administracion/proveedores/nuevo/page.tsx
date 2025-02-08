"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/Button";
import { Title } from "@/components/Title";
import { SuccessModal } from "@/components/SuccessModal";
import { ErrorModal } from "@/components/ErrorModal";

const Page = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formData, setFormData] = useState({
    proveedor: "",
    contacto: "",
    telefono: "",
    email: "",
    direccion: "",
    localidad: ""
  });
  const formRef: any = useRef();

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
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL +"/proveedores", formData);
      setShowSuccessModal(true);
      formRef.current.reset();
    } catch (error) {
      setShowErrorModal(true);
    }
  };


  const handleCloseModals = () => {
    setShowErrorModal(false);
    setShowSuccessModal(false);
  };

  return (
    <>
      <Title value="Nuevo proveedor" />
      <div className="w-full flex justify-center item-center content-center ">
        <form
          className="w-[80%] shadow-md bg-white p-4"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="grid grid-rows-3 space-y-2">
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
                  type="text"
                  name="contacto"
                  value={formData.contacto}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Telefono</label>
                <Input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
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
            </div>
            <div className="grid grid-cols-3 space-x-3">
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
            <div className="justify-center items-center flex mt-2">
              <Button type="submit" />
            </div>
          </div>
        </form>
        <SuccessModal show={showSuccessModal} onClose={handleCloseModals} />
        <ErrorModal show={showErrorModal} onClose={handleCloseModals} />
      </div>
    </>
  );
}

export default Page;