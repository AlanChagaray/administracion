import React from "react";
import { Button } from "./Button";
import { Subtitle } from "./Subtitle";


interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm : () => void;
}

export const ModalLogout = ({ show, onClose ,onConfirm   }: Props) => {
  if (!show) return null;

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-white  rounded-md  p-4 text-center text-2xl">
        <div >
          <Subtitle value='¿Seguro desea cerrar sesión?'/>
          <div className='flex justify-center space-x-3 mt-3'>
          <div>
            <Button type='submit' onClick={onConfirm} value="Salir" />
          </div>
          <div>
            <Button type='close' onClick={onClose} />
          </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};
