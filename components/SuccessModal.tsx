import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Button } from "./ui/button";

interface Props {
  show: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ show, onClose }: Props) => {
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="bg-white  rounded-md  p-4 text-center text-2xl w-56 h-56">
          <div className="grid grid-rows-3">
            <div className="flex items-center justify-center">
              <IoCheckmarkCircleOutline className="text-green-400" size={55} />
            </div>
            <div className="mt-8">
              <p className="text-lg">Operación Exitosa!</p>
            </div>
            <div className="mt-8">
              <Button
                className="bg-green-400 hover:bg-green-500 w-40"
                onClick={onClose}
              >
                ok
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
