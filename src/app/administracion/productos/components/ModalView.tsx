import React, { useEffect, useState } from "react";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { formatCurrency } from "@/utils/formatCurrency";
import { Subtitle } from "@/components/Subtitle";
import { proveedoresObtener } from "@/app/services/proveedores";

interface Props {
  producto: any;
  show: boolean;
  onClose: () => void;
}

export const ModalView = ({ producto, show, onClose }: Props) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="bg-white rounded-md p-4 w-[50%]">
          {producto.map((p: any) => (
            <div key={p.idproducto}>
              {/* <Title value={p.nombre} /> */}
              <Subtitle value="Detalle producto" />
              <div className="grid grid-rows-4 space-y-2 mt-4">
                <div className="grid grid-cols-3 space-x-3">
                  <div>
                    <label>Producto</label>
                    <p>{p.nombre}</p>
                  </div>
                  <div>
                    <label>Descripción</label>
                    <p>{p.descripcion ? p.descripcion : "-"}</p>
                  </div>
                  <div>
                    <label>Estado</label>
                    <p>{p.estado ? p.estado : "-"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 space-x-3">
                  <div>
                    <label>Precio Costo</label>
                    <p>
                      {p.preciocompra ? formatCurrency(p.preciocompra) : "-"}
                    </p>
                  </div>
                  <div>
                    <label>Precio Venta</label>
                    <p>{p.precioventa ? formatCurrency(p.precioventa) : "-"}</p>
                  </div>
                  <div>
                    <label>%Descuento</label>
                    <p>{p.descuento ? p.descuento : "-"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 space-x-3">
                  <div>
                    <label>Proveedor</label>
                    <p>{p.nombre ? p.nombre : "-"}</p>
                  </div>
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
