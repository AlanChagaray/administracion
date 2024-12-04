import React from "react";
import { Button } from "./ui/button";

interface Props {
  show: boolean;
  onClose: () => void;
}

export const PedidoModal = ({ show, onClose }: Props) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-sm border-gray-500 p-4">
        <div className="flex justify-between mb-2">
          <strong>nombre :</strong> <span>alan</span>
        </div>
        <div className="flex justify-between mb-2">
          <strong>seña :</strong> <span>1000</span>
        </div>
        <div className="flex justify-between mb-2">
          <strong>total :</strong> <span>2000</span>
        </div>
        <div className="flex justify-between mb-2">
          <strong>restante :</strong> <span>1000</span>
        </div>
        <div className="flex justify-center">
        <Button className="hover:bg-red-500" onClick={onClose}>
          cerrar
        </Button>
        </div>
      </div>
    </div>
  );
};
