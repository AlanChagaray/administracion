"use client";
import React, { useState, useEffect } from 'react';
import { proveedoresBuscar, proveedoresObtener } from "@/app/services/proveedores";
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
  const [idproveedor, setIdproducto] = useState(null);
  const [proveedor, setproducto] = useState(null);
  const [proveedores, setproveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ proveedor: '', telefono: '' });

  const [modalViewOpen, setModalViewOpen] = useState(false); 
  const [modalEditOpen, setModalEditOpen] = useState(false); 
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchProveedores = async () => {
    setLoading(true);
    const data = await proveedoresBuscar();
    setproveedores(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProveedores();
  }, []);


  const handleSearch = async () => {
    setLoading(true);
    const data = await proveedoresBuscar(searchParams);
    setproveedores(data);
    setLoading(false);
    setCurrentPage(1);
  }
  const handleCleanSearch = () => {
    setSearchParams({ proveedor: '',  telefono: '' });
  };

  const handleChange = (value, field) => {
    setSearchParams({
      ...searchParams,
      [field]: value
    });
  }

  
  const handleClickView = async (idproveedor) => {

    try {
      const data = await proveedoresObtener(idproveedor);
      setproducto(data);
      setModalViewOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickEdit = async (idproveedor) => {
    try {
      const data = await proveedoresObtener(idproveedor);
      setproducto(data);
      setModalEditOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickDelete = async (idproveedor) => {
    setIdproducto(idproveedor);
    setModalDeleteOpen(true);
  }


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = proveedores.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Title value='Proveedores' />
      <div>
        <div className="p-4 w-full shadow-lg bg-white">
          <ul className='flex space-x-3'>
            <li className='content-center'>
              <Button type='add' url='./proveedores/nuevo' />
            </li>
            <li >
              <Select value={searchParams.proveedor} onValueChange={(value) => handleChange(value, 'proveedor')}>
                <SelectTrigger>
                  <SelectValue placeholder="proveedor" />
                </SelectTrigger>
                <SelectContent >
                  {proveedores.map((proveedor) => (
                    <SelectItem
                      key={proveedor.idproveedor}
                      value={proveedor.proveedor}>{proveedor.proveedor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>

            <li className='content-center'>
              <Button type='clean' onClick={handleCleanSearch} />
            </li>
            <li className='content-center'>
              <Button type='search' onClick={handleSearch} />
            </li>
          </ul>
        </div>
        <br />
        <div >
          {loading ? (
            <Spinner />
          ) : (
            proveedores.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#Id</TableHead>
                      <TableHead>Proovedor</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Telefono</TableHead>
                      {/* <TableHead>Email</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Localidad</TableHead> */}
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((proveedor) => (
                      <TableRow key={proveedor.idproveedor}>
                        <TableCell>{proveedor.idproveedor}</TableCell>
                        <TableCell>{proveedor.proveedor}</TableCell>
                        <TableCell>{proveedor.contacto }</TableCell>
                        <TableCell>{proveedor.telefono}</TableCell>
                        {/* <TableCell>{ formatCurrency( proveedor.precioventa)}</TableCell>
                        <TableCell>{proveedor.descuento ? proveedor.descuento  : '-'}</TableCell>
                        <TableCell>{proveedor.estado}</TableCell> */}
                        <TableCell >
                        <ul className='flex space-x-3'>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickView(proveedor.idproveedor)}>
                              <IoEyeOutline size={20} color='#4379ff' title='ver' />
                            </li>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickEdit(proveedor.idproveedor)}>
                              <IoCreateOutline size={20} color="#ff8d43" title='editar' />
                            </li>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickDelete(proveedor.idproveedor)}>
                              <IoTrashOutline size={20} color="#ff4343" title='eliminar' />
                            </li>
                          </ul>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                  {[...Array(Math.ceil(proveedores.length / itemsPerPage)).keys()].map(number => (
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

      {modalViewOpen && proveedor && (
        <ModalView 
          proveedor={proveedor} 
          show={modalViewOpen} 
          onClose={() => setModalViewOpen(false)} />
      )}

      {modalEditOpen && proveedor && (
        <ModalEdit 
          proveedor={proveedor} 
          show={modalEditOpen} 
          onClose={() => {
            setModalEditOpen(false);
            fetchProveedores(false);
          }} />
      )}

      {modalDeleteOpen  && (
        <ModalDelete 
          idproveedor={idproveedor} 
          show={modalDeleteOpen}  
          onClose={() =>{
            setModalDeleteOpen(false); 
            fetchProveedores();
          }} />
      )}
    </>
  );
}
