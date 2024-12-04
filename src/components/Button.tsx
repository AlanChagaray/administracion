'use client';
import React from 'react';
import Link from 'next/link';
import { IoAddOutline, IoSearch } from 'react-icons/io5';

interface Props {
  type: string,
  value ?: string,
  url ?: string,
  onClick ?: () => void;
}

export const Button = ({ type, value, url, onClick }: Props) => {

    const _url = url || '#'; 

  const renderButtonContent = () => {
    switch (type) {
      case 'search':
        return <button className='bg-blue-500 hover:bg-blue-600 text-white h-8 px-3 py-2 flex items-center justify-center rounded-md' onClick={onClick}><IoSearch size={16} color="white" />{value ? value : 'Buscar'} </button>;
      case 'delete':
        return <button className='bg-red-400 hover:bg-red-500 text-white h-8 px-3 py-2 flex items-center justify-center rounded-md' onClick={onClick}>{value ? value : 'Eliminar'}</button>;
      case 'clean':
        return <button className='bg-red-400 hover:bg-red-500 hover: text-white h-8 px-3 py-2 flex items-center justify-center rounded-md' onClick={onClick}>{value ? value : 'Limpiar'}</button>;
      case 'add':
        return <button  className='bg-green-400 hover:bg-green-500 text-white h-8 px-3 py-2 flex items-center justify-center rounded-md' onClick={onClick}>
                    <Link className="flex items-center space-x-3" href={_url}><IoAddOutline size={15}  color='white' />{value ? value : 'Ingresar nuevo'}</Link>
                </button>;
      case 'success':
        return <button className='bg-green-400 hover:bg-green-500 text-white h-8 px-3 py-2 flex items-center justify-center rounded-md' onClick={onClick}>{value ? value : 'Confirmar'}</button>;
      case 'submit':
        return <button type='submit' className='bg-blue-400 hover:bg-blue-500 text-white h-8 px-3 py-2 flex items-center justify-center rounded-md w-full' onClick={onClick}>{value ? value : 'Guardar'}</button>;
      case 'confirm':
        return <button className='bg-green-400 hover:bg-green-500 text-white h-8 px-3 py-2 flex items-center justify-center rounded-md' onClick={onClick}>{value ? value : 'si'}</button>;
      case 'close':
        // return <button className='bg-blue-400 hover:bg-blue-500 text-white h-8 px-3 py-2 flex items-center justify-center rounded-md' onClick={onClick}>{value ? value : 'Cerrar'}</button>;
        return <button className='border border-gray-400 hover:border-gray-800 text-gray-600 hover:text-gray-800 h-8 px-3 py-2 flex items-center justify-center rounded-md' onClick={onClick}>{value ? value : 'Cerrar'}</button>;
      case 'edit':
        return <button className='bg-yellow-400 hover:bg-yellow-500 text-white h-8 px-3 py-2 flex items-center justify-center rounded-md' onClick={onClick}>{value ? value : 'Editar'}</button>;
        case 'login':
          return <button className='bg-blue-400 hover:bg-blue-500 w-full text-white h-10 px-3 py-2 flex items-center justify-center rounded-md' onClick={onClick}>{value ? value : 'Ingresar'}</button>;
      default:
        return ;
    }
  };

  return (
    <>
      {renderButtonContent()}
    </>
  );
};
