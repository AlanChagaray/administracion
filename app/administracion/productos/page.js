"use client";
import React, { useState, useEffect } from 'react';
import { productosBuscar, productosObtener } from "@/app/services/productos";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { IoEyeOutline, IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { Title } from '@/components/Title';
import { ModalEdit } from './components/ModalEdit';
import { ModalView } from './components/ModalView';
import { ModalDelete } from './components/ModalDelete';
import { formatCurrency } from '@/utils/formatCurrency';


export default function Page() {
  const [idproducto, setIdproducto] = useState(null);
  const [producto, setproducto] = useState(null);
  const [productos, setproductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ nombre: '', apellido: '', telefono: '' });

  const [modalViewOpen, setModalViewOpen] = useState(false); 
  const [modalEditOpen, setModalEditOpen] = useState(false); 
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  useEffect(() => {
    fetchproductos();
  }, [searchParams]);

  const fetchproductos = async () => {
    setLoading(true);
    const data = await productosBuscar(searchParams);
    setproductos(data);
    setLoading(false);
  };

  const handleCleanSearch = () => {
    setSearchParams({ nombre: '', apellido: '', telefono: '' });
  };

  const handleChange = (value, field) => {
    setSearchParams({
      ...searchParams,
      [field]: value
    });
  }

  
  const handleClickView = async (idproducto) => {

    try {
      const data = await productosObtener(idproducto);
      setproducto(data);
      setModalViewOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickEdit = async (idproducto) => {
    try {
      const data = await productosObtener(idproducto);
      setproducto(data);
      setModalEditOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickDelete = async (idproducto) => {
    setIdproducto(idproducto);
    setModalDeleteOpen(true);
  }


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Title value='Productos' />
      <div>
        <div className="p-4 w-full shadow-lg bg-white">
          <ul className='flex space-x-3'>
            <li className='content-center'>
              <Button type='add' url='./productos/nuevo' />
            </li>
            <li >
              <Select value={searchParams.nombre} onValueChange={(value) => handleChange(value, 'nombre')}>
                <SelectTrigger>
                  <SelectValue placeholder="producto" />
                </SelectTrigger>
                <SelectContent >
                  {productos.map((producto) => (
                    <SelectItem
                      key={producto.idproducto}
                      value={producto.nombre}>{producto.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>
            <li >
              <Select value={searchParams.estado} onValueChange={(value) => handleChange(value, 'estado')}>
                <SelectTrigger>
                  <SelectValue placeholder="estado" />
                </SelectTrigger>
                <SelectContent >
                  {[...new Set(productos.map((producto) => producto.estado))].map((estado, index) => (
                    <SelectItem key={index} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>

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
            productos.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#Id</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Costo</TableHead>
                      <TableHead>Precio Venta</TableHead>
                      <TableHead>%Descuento</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((producto) => (
                      <TableRow key={producto.idproducto}>
                        <TableCell>{producto.idproducto}</TableCell>
                        <TableCell>{producto.nombre}</TableCell>
                        <TableCell>{producto.descripcion ? producto.descripcion : '-'}</TableCell>
                        <TableCell>{formatCurrency(producto.preciocompra)}</TableCell>
                        <TableCell>{ formatCurrency( producto.precioventa)}</TableCell>
                        <TableCell>{producto.descuento ? producto.descuento  : '-'}</TableCell>
                        <TableCell>{producto.estado}</TableCell>
                        <TableCell >
                        <ul className='flex space-x-3'>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickView(producto.idproducto)}>
                              <IoEyeOutline size={20} color='#4379ff' title='ver' />
                            </li>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickEdit(producto.idproducto)}>
                              <IoCreateOutline size={20} color="#ff8d43" title='editar' />
                            </li>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickDelete(producto.idproducto)}>
                              <IoTrashOutline size={20} color="#ff4343" title='eliminar' />
                            </li>
                          </ul>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                  {[...Array(Math.ceil(productos.length / itemsPerPage)).keys()].map(number => (
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

      {modalViewOpen && producto && (
        <ModalView 
          producto={producto} 
          show={modalViewOpen} 
          onClose={() => setModalViewOpen(false)} />
      )}

      {modalEditOpen && producto && (
        <ModalEdit 
          producto={producto} 
          show={modalEditOpen} 
          onClose={() => {
            setModalEditOpen(false);
            fetchproductos(false);
          }} />
      )}

      {modalDeleteOpen  && (
        <ModalDelete 
          idproducto={idproducto} 
          show={modalDeleteOpen}  
          onClose={() =>{
            setModalDeleteOpen(false); 
            fetchproductos();
          }} />
      )}
    </>
  );
}
