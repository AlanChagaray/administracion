"use client";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { Title } from '@/components/Title';
import { IoEyeOutline,  } from 'react-icons/io5';

async function search(params = {}) {
  try {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/usuarios', { params });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
}

export default function Page() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ idusuario: '', usuario: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(11); 
  

  useEffect(() => {
    async function fetchData() {
      const data = await search();
      setUsuarios(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const data = await search(searchParams);
    setUsuarios(data);
    setLoading(false);
    setCurrentPage(1); 
  }

  const handleCleanSearch = () => {
    setSearchParams({ idusuario: '', usuario: '' });
  };
  
  const handleChange = (value, field) => {
    
    setSearchParams({
      ...searchParams,
      [field]: value
    });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Title value='Usuarios' />
      <div>
        <div className="p-4 w-full shadow-lg ">
          <ul className='flex space-x-3'>
            <li className='content-center'>
              <Button type='add' url='./usuarios/nuevo' />
            </li>
            <li >
              <Select value={searchParams.idusuario}  onValueChange={(value) => handleChange(value, 'idusuario')}>
                <SelectTrigger>
                  <SelectValue placeholder="idusuario" />
                </SelectTrigger>
                <SelectContent >
                  {usuarios.map((usuario) => (
                    <SelectItem
                      key={usuario.idusuario}
                      value={usuario.idusuario}>{usuario.idusuario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>
            <li>
              <Select value={searchParams.usuario}  onValueChange={(value) => handleChange(value, 'usuario')}>
                <SelectTrigger >
                  <SelectValue placeholder="usuario" />
                </SelectTrigger>
                <SelectContent>
                {usuarios.map((u) => (
                    <SelectItem
                      key={u.usuario}
                      value={u.usuario}>{u.usuario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>
            <li className='content-center'>
              <Button type='clean' onClick={handleCleanSearch}/>
            </li>
            <li className='content-center'>
              <Button type='search' onClick={handleSearch}/>
            </li>
          </ul>
        </div>
        <br/>
        <div >
          {loading ? (
              <Spinner/>
          ) : (
            usuarios.length > 0 ? (
              <>
                <Table>
                  <TableHeader >
                    <TableRow>
                      <TableHead>Id Usuario</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Fecha alta</TableHead>
                      <TableHead>ver</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((u) => (
                      <TableRow key={u.idusuario}>
                        <TableCell>{u.idusuario}</TableCell>
                        <TableCell>{u.usuario}</TableCell>
                        <TableCell>{u.rol}</TableCell>
                        <TableCell>{u.fechaalta}</TableCell>
                        <TableCell >
                          <Link href={`usuarios/obtener/${u.idusuario}`}>
                            <IoEyeOutline  size={20} className="text-red-500 hover:text-red-600" />
                          </Link></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                  {[...Array(Math.ceil(usuarios.length / itemsPerPage)).keys()].map(number => (
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
    </>
  );
}
