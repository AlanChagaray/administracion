import React, { useEffect, useRef, useState } from 'react'
import { clientesObtener } from '@/app/services/clientes'
import { Button } from '@/components/Button'
import { Title } from '@/components/Title'
import { Input } from '@/components/ui/input'
import { ModalClientes } from './ModalClientes'

export const AddCliente = ({ cliente, onCliente }: any) => {
  const formRef: any = useRef();
  const [idcliente, setIdcliente] = useState(null);
  const [modalClientesOpen, setModalClientesOpen] = useState(false);
  const [formData, setFormData] = useState({
    idcliente: null,
    nombre: "",
    apellido: "",
    documento: "",
    telefono: "",
    email: ""
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        idcliente : cliente.idcliente || "", 
        nombre : cliente.nombre,
        apellido : cliente.apellido,
        documento : cliente.documento,
        telefono : cliente.telefono,
        email : cliente.email
      });
    }
  }, []);
  

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    onCliente(formData);

    formRef.current.reset();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOpenClientesModal = async () => {
    setModalClientesOpen(true);
  };

  const handleConfirmCliente = async (idcliente: any) => {
    setIdcliente(idcliente);
    const cliente = await clientesObtener(idcliente);

    setFormData({
      idcliente: cliente[0].idcliente || "",
      nombre: cliente[0].nombre || "",
      apellido: cliente[0].apellido || "",
      documento: cliente[0].documento || "",
      telefono: cliente[0].telefono || "",
      email: cliente[0].email || "",
    });
  };

  const handleCleanCliente = () => {
    setIdcliente(null);
    setFormData({
      nombre: "",
      apellido: "",
      documento: "",
      telefono: "",
      email: "",
      idcliente: null
    });
  };

  return (
    <>
    <div className="flex justify-center">
      <div className="w-[80%] shadow-md bg-white p-4 ">
        <div className='flex justify-center'>
          <Title value='Agregar cliente'/>
        </div>
        <div className="mb-3">
          <ul className="flex space-x-3">
            <li>
              <Button
                type="add"
                value="Buscar cliente"
                onClick={handleOpenClientesModal}
              />
            </li>

            {idcliente && (
              <li>
                <Button
                  type="clean"
                  value="Limpiar"
                  onClick={handleCleanCliente}
                />
              </li>
            )}
          </ul>
        </div>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="grid grid-rows-2 space-y-2">
            <div className="grid grid-cols-3 space-x-3">
              <div>
                <label>Nombre</label>
                <Input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  disabled={idcliente ? true : false}
                />
              </div>
              <div>
                <label>Apellido</label>
                <Input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  disabled={idcliente ? true : false}
                />
              </div>
              <div>
                <label>Documento</label>
                <Input
                  type="text"
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  disabled={idcliente ? true : false}
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
                  disabled={idcliente ? true : false}
                />
              </div>
              <div>
                <label>Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={idcliente ? true : false}
                />
              </div>
            </div>
            <div className="justify-center items-center flex mt-3">
              <Button type="submit" value='Siguiente' />
            </div>
          </div>
        </form>
      </div>
      </div>
      {modalClientesOpen && (
        <ModalClientes
          show={modalClientesOpen}
          onClose={() => { setModalClientesOpen(false);}}
          onConfirm={handleConfirmCliente}
        />
      )}
    </>
  );
};
