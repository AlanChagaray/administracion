import React from "react";
import { Title } from "./Title";
import { Button } from '@/components/Button';

interface Props {
  pedido : any;
  show: boolean;
  onClose: () => void;
}

export const ModalView = ({ pedido, show, onClose }: Props) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
    <div className="bg-white  rounded-md p-4 w-[50%]">

      {pedido.map((p: any) => (
            <div key={p.idpedido}>
              <Title value={p.nombre + ' ' + p.apellido } />
                <div className="grid grid-rows-4 space-y-2 mt-4">
                <div className="grid grid-cols-3 space-x-3">
                  <div>
                    <label>Teléfono</label>
                    <p>{p.telefono ? p.telefono : "-"}</p>
                  </div>
                  <div>
                    <label>Email</label>
                    <p>{p.email ? p.email : "-"}</p>
                  </div>
                  <div>
                    <label>Fecha retiro</label>
                    <p>{p.fecharetiro ? p.fecharetiro : "-"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 space-x-3">
                  <div>
                    <label>Fecha alta</label>
                    <p>{p.fechaalta ? p.fechaalta : "-"}</p>
                  </div>
                  <div>
                    <label>Fecha modificación</label>
                    <p>{p.fechamodificacion ? p.fecharetiro : "-"}</p>
                  </div>
                  <div>
                  <label>Estado</label>
                  <p>{p.estado ? p.estado : "-"} </p>
                </div>
                </div>
                <div className="grid grid-cols-3 space-x-3 ">
                <div>
                    <label>Seña</label>
                    <p>${p.senia ? p.senia : "-"}</p>
                  </div>
                  <div>
                    <label>Total</label>
                    <p>${p.total ? p.total : "-"}</p>
                  </div>
                  <div>
                    <label>Restante</label>
                    <p>${p.total && p.senia ? p.total - p.senia : "-"}</p>
                  </div>
                </div>

                
                <div>
                  <label>Descripción</label>
                  <p>{p.descripcion ? p.descripcion : "-"}</p>
                </div>
              </div>
              
            </div>
          ))}
        <div className="flex justify-center mt-2">
        <Button type='close' onClick={onClose} />
        </div>
        </div>
      </div>
    </div>
  );
};
