import React from "react";
import { Title } from "@/components/Title";
import { Button } from '@/components/Button';
import { formatCurrency } from "@/utils/formatCurrency";
import { Subtitle } from "@/components/Subtitle";

interface Props {
  proveedor: any;
  show: boolean;
  onClose: () => void;
}

export const ModalView = ({ proveedor, show, onClose }: Props) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="bg-white rounded-md p-4 w-[50%]">
          {proveedor.map((p: any) => (
            <div key={p.idproducto}>
              {/* <Title value={p.nombre} /> */}
              <Subtitle value='Detalle proveedor' />
              <div className="grid grid-rows-3 space-y-2 mt-4">
                <div className="grid grid-cols-3 space-x-3">
                  <div>
                    <label>Proveedor</label>
                    <p>{p.proveedor}</p>
                  </div>
                  <div>
                    <label>Contacto</label>
                    <p>{p.contacto ? p.contacto : "-"}</p>
                  </div>
                  <div>
                    <label>Telefono</label>
                    <p>{p.telefono ? p.telefono : "-"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 space-x-3">
                  <div>
                    <label>Email</label>
                    <p>{p.email ? p.email : "-"}</p>
                  </div>
                  <div>
                    <label>Dirección</label>
                    <p>{p.direccion ? p.direccion : "-"}</p>
                  </div>
                  <div>
                    <label>Localidad</label>
                    <p>{p.localidad ? p.localidad : "-"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 space-x-3">
                <div>
                    <label>Fecha Alta</label>
                    <p>{p.fechaalta ? p.fechaalta : "-"}</p>
                  </div>
                  <div>
                    <label>Fecha Modificación</label>
                    <p>{p.fechamodificacion ? p.fechamodificacion : "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-2">
            <Button type="close" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};
