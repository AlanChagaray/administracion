"use client";
import React, { useState, useEffect } from 'react';
import { clientesBuscar, clientesObtener } from "@/app/services/clientes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { IoEyeOutline, IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { Title } from '@/components/Title';
import { ModalEdit } from './components/ModalEdit';
import { ModalView } from './components/ModalView';
import { ModalDelete } from './components/ModalDelete';


export default function Page() {
  const [idcliente, setIdcliente] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ nombre: '', apellido: '', telefono: '' });

  const [modalViewOpen, setModalViewOpen] = useState(false); 
  const [modalEditOpen, setModalEditOpen] = useState(false); 
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchClientes = async () => {
    setLoading(true);
    const data = await clientesBuscar(searchParams);
    setClientes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClientes();
  }, [searchParams]);

  const handleCleanSearch = () => {
    setSearchParams({ nombre: '', apellido: '', telefono: '' });
  };

  const handleChange = (value, field) => {
    setSearchParams({
      ...searchParams,
      [field]: value
    });
  }

  
  const handleClickView = async (idcliente) => {

    try {
      const data = await clientesObtener(idcliente);
      setCliente(data);
      setModalViewOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickEdit = async (idcliente) => {
    try {
      const data = await clientesObtener(idcliente);
      setCliente(data);
      setModalEditOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickDelete = async (idcliente) => {
    setIdcliente(idcliente);
    setModalDeleteOpen(true);
  }


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clientes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Title value='Clientes' />
      <div>
        <div className="p-4 w-full shadow-lg bg-white">
          <ul className='flex space-x-3'>
            <li className='content-center'>
              <Button type='add' url='./clientes/nuevo' />
            </li>
            <li >
              <Select value={searchParams.nombre} onValueChange={(value) => handleChange(value, 'nombre')}>
                <SelectTrigger>
                  <SelectValue placeholder="nombre" />
                </SelectTrigger>
                <SelectContent >
                  {/* {clientes.map((cliente) => (
                    <SelectItem
                      key={cliente.idcliente}
                      value={cliente.nombre}>{cliente.nombre}
                    </SelectItem>
                  ))} */}
                  {[...new Set(clientes.map((cliente) => cliente.nombre))].map((nombre, index) => (
                    <SelectItem key={index} value={nombre}>
                      {nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>
            {/* <li >
              <Select value={searchParams.apellido} onValueChange={(value) => handleChange(value, 'apellido')}>
                <SelectTrigger>
                  <SelectValue placeholder="apellido" />
                </SelectTrigger>
                <SelectContent >
                  {clientes.map((cliente) => (
                    <SelectItem
                      key={cliente.idcliente}
                      value={cliente.apellido}>{cliente.apellido}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>
            <li >
              <Select value={searchParams.telefono} onValueChange={(value) => handleChange(value, 'telefono')}>
                <SelectTrigger>
                  <SelectValue placeholder="telefono" />
                </SelectTrigger>
                <SelectContent >
                  {[...new Set(clientes.map((cliente) => cliente.telefono))].map((telefono, index) => (
                    <SelectItem key={index} value={telefono}>
                      {telefono}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li> */}

            <li className='content-center'>
              <Button type='clean' onClick={handleCleanSearch} />
            </li>
          </ul>
        </div>
        <br />
        <div >
          {loading ? (
            <Spinner />
          ) : (
            clientes.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#Id</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Apellido</TableHead>
                      <TableHead>Telefono</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((cliente) => (
                      <TableRow key={cliente.idcliente}>
                        <TableCell>{cliente.idcliente}</TableCell>
                        <TableCell>{cliente.nombre }</TableCell>
                        <TableCell>{cliente.apellido}</TableCell>
                        <TableCell>{cliente.telefono}</TableCell>
                        <TableCell>{cliente.email}</TableCell>
                        <TableCell >
                        <ul className='flex space-x-3'>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickView(cliente.idcliente)}>
                              <IoEyeOutline size={20} color='#4379ff' title='ver' />
                            </li>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickEdit(cliente.idcliente)}>
                              <IoCreateOutline size={20} color="#ff8d43" title='editar' />
                            </li>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickDelete(cliente.idcliente)}>
                              <IoTrashOutline size={20} color="#ff4343" title='eliminar' />
                            </li>
                          </ul>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                  {[...Array(Math.ceil(clientes.length / itemsPerPage)).keys()].map(number => (
                    <button key={number + 1} onClick={() => paginate(number + 1)} className={`px-3 py-1 mx-1 ${currentPage === number + 1 ? 'bg-red-300 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}`}>
                      {number + 1}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div ><p>No se encontraron registros.</p></div>
              </>
            )
          )}
        </div>
      </div>

      {modalViewOpen && cliente && (
        <ModalView 
          cliente={cliente} 
          show={modalViewOpen} 
          onClose={() => setModalViewOpen(false)} />
      )}

      {modalEditOpen && cliente && (
        <ModalEdit 
          cliente={cliente} 
          show={modalEditOpen} 
          onClose={() => {
            setModalEditOpen(false);
            fetchClientes(false);
          }} />
      )}

      {modalDeleteOpen  && (
        <ModalDelete 
          idcliente={idcliente} 
          show={modalDeleteOpen}  
          onClose={() =>{
            setModalDeleteOpen(false); 
            fetchClientes();
          }} />
      )}
    </>
  );
}
