"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { pedidosBuscar, pedidosObtener } from "@/app/services/pedidos";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { IoEyeOutline, IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { Title } from '@/components/Title';
import { ModalView , ModalEdit, ModalDelete } from './components/'
import { formatCurrency } from '@/utils/formatCurrency';


const Page = () => {
  const [idpedido, setIdpedido] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ nombre: '', estado: ''});
  const [modalViewOpen, setModalViewOpen] = useState(false); 
  const [modalEditOpen, setModalEditOpen] = useState(false); 
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(11); 
  
  useEffect(() => {
    fetchPedidos();   
  }, [fetchPedidos]);

  const fetchPedidos = useCallback( async () => {
    setLoading(true);
    const data = await pedidosBuscar(searchParams);
    setPedidos(data);
    setLoading(false);
  }, [searchParams]);
  
  const handleCleanSearch = () => {
    setSearchParams({  nombre: '',estado: ''});
  };

  const handleChange = (value, field) => {
    setSearchParams({
      ...searchParams,
      [field]: value
    });
  }

  const handleClickView = async (idpedido) => {

    try {
      const data = await pedidosObtener(idpedido);
      setPedido(data);
      setModalViewOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickEdit = async (idpedido) => {
    try {
      const data = await pedidosObtener(idpedido);
      setPedido(data);
      setModalEditOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickDelete = async (idpedido) => {
      setIdpedido(idpedido);
      setModalDeleteOpen(true);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pedidos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Title value='Pedidos' />
      <div>
        <div className="p-4 w-full shadow-lg bg-white">
          <ul className='flex space-x-3'>
            <li className='content-center'>
              <Button type='add' url='./pedidos/nuevo' />
            </li>
            <li >
              <Select value={searchParams.nombre} onValueChange={(value) => handleChange(value, 'nombre')}>
                <SelectTrigger>
                  <SelectValue placeholder="nombre" />
                </SelectTrigger>
                <SelectContent >
                  {[...new Set(pedidos.map((pedido) => pedido.nombre))].map((nombre, index) => (
                    <SelectItem key={index} value={nombre}>
                      {nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>
            <li>
              <Select value={searchParams.estado} onValueChange={(value) => handleChange(value, 'estado')}>
                <SelectTrigger >
                  <SelectValue placeholder="estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente" id="pendiente">pendiente</SelectItem>
                  <SelectItem value="proceso" id="proceso">proceso</SelectItem>
                  <SelectItem value="finalizado" id="finalizado">finalizado</SelectItem>
                </SelectContent>
              </Select>
            </li>
            <li className='content-center'>
              <Button type='clean' onClick={handleCleanSearch} />
            </li>
            {/* <li className='content-center'>
              <Button type='search' onClick={handleSearch} />
            </li> */}
          </ul>
        </div>
        <br />
        <div >
          {loading ? (
            <Spinner />
          ) : (
            pedidos.length > 0 ? (
              <>
                <Table>
                  <TableHeader >
                    <TableRow>
                      <TableHead>#Id</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripcion</TableHead>
                      <TableHead>Fecha retiro</TableHead>
                      <TableHead>Abonado</TableHead>
                      <TableHead>Deuda</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((pedido) => (
                      <TableRow key={pedido.idpedido}>
                        <TableCell>{pedido.idpedido}</TableCell>
                        <TableCell>{pedido.nombre}</TableCell>
                        <TableCell>{pedido.descripcion}</TableCell>
                        <TableCell>{pedido.fecharetiro}</TableCell>
                        <TableCell>
                          {pedido.senia == 0 ? (
                          <p className="text-red-500">no abonado</p>
                          ) : pedido.senia == pedido.total  ? (
                            <p className="text-green-400">pagado</p>
                          ): (
                            formatCurrency( pedido.senia)
                          )}
                        </TableCell>
                        <TableCell>
                          {pedido.total - pedido.senia === 0 ?(
                          <p >----</p>
                          ) :  (
                            formatCurrency( pedido.total - pedido.senia) 
                          )}
                        </TableCell>
                        <TableCell>{formatCurrency( pedido.total)}</TableCell>
                        <TableCell>{pedido.estado}</TableCell>
                        <TableCell >
                          <ul className='flex space-x-3'>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickView(pedido.idpedido)}>
                              <IoEyeOutline size={20} color='#4379ff' title='ver' />
                            </li>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickEdit(pedido.idpedido)}>
                              <IoCreateOutline size={20} color="#ff8d43" title='editar' />
                            </li>
                            <li style={{ cursor: 'pointer' }} onClick={() => handleClickDelete(pedido.idpedido)}>
                              <IoTrashOutline size={20} color="#ff4343" title='eliminar' />
                            </li>
                          </ul>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                  {[...Array(Math.ceil(pedidos.length / itemsPerPage)).keys()].map(number => (
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

      {modalViewOpen && pedido && (
        <ModalView 
          pedido={pedido} 
          show={modalViewOpen} 
          onClose={() => setModalViewOpen(false)} />
      )}

      {modalEditOpen && pedido && (
        <ModalEdit 
          pedido={pedido} 
          show={modalEditOpen} 
          onClose={() => {
            setModalEditOpen(false);
            fetchPedidos();
          }} />
      )}

      {modalDeleteOpen  && (
        <ModalDelete 
          idpedido={idpedido} 
          show={modalDeleteOpen}  
          onClose={() =>{
            setModalDeleteOpen(false); 
            fetchPedidos();
          }} />
      )}
    </>
  );
}

export default Page;