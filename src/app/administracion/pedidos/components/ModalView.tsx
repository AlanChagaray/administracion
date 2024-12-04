import React, { useEffect, useState } from "react";
import { Button } from '@/components/Button';
import { vtaProductosObtener } from "@/app/services/vtaproductos";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency} from "@/utils/formatCurrency";
import { Title } from "@/components/Title";
import { downloadPDF } from "@/app/services/pedidos";
import { Pedido } from "@/app/types/Pedido";
import { Producto } from "@/app/types/Producto";

interface Props {
  pedido : Pedido[];
  show: boolean;
  onClose: () => void;
}

export const ModalView = ({ pedido, show, onClose }: Props) => {
  if (!show) return null;

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const idpedido = pedido[0].idpedido;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data : Producto[]= await vtaProductosObtener( idpedido);
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(pedido, productos);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
    <div className="bg-white  rounded-md p-4 w-[50%]">
    <div className='flex justify-center mb-3'>
          <Title value='Detalle pedido' />
          </div>
      {pedido.map((p: any) => (
            <div key={p.idpedido}>
                <div className="grid grid-rows-2 space-y-3 mt-4">
                <div className="grid grid-cols-3 space-x-3">
                  <div>
                    <label>Cliente</label>
                    <p>{p.nombre + ' ' + p.apellido}</p>
                  </div>
                  <div>
                    <label>Teléfono</label>
                    <p>{p.telefono ? p.telefono : "-"}</p>
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
                { productos.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>#Id</TableHead>
                          <TableHead>Producto</TableHead>
                          <TableHead>Cantidad</TableHead>
                          <TableHead>Precio Unitario</TableHead>
                          <TableHead>Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productos.map((prod, index) => (
                          <TableRow key={index}>
                            <TableCell>{prod.idproducto}</TableCell>
                            <TableCell>{prod.nombre}</TableCell>
                            <TableCell>{prod.cantidad}</TableCell>
                            <TableCell>{ formatCurrency(prod.precioventa)}</TableCell>
                            <TableCell>{ formatCurrency(prod.totalproducto)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                        <TableCell colSpan={3}></TableCell>
                          <TableCell className='font-semibold'>Abonado</TableCell>
                          <TableCell className='font-semibold'>
                          {p.senia == 0 ? (
                          <p className="text-red-500">no abonado</p>
                          ) : p.senia - p.total == 0 ? (
                            <p className="text-green-400">pagado</p>
                          ): (
                            formatCurrency( p.senia)
                          )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell colSpan={3}></TableCell>
                          <TableCell className='font-semibold'>Restante</TableCell>
                          <TableCell className='font-semibold'>
                          {p.total - p.senia === 0 ?(
                          <p >----</p>
                          ) :  (formatCurrency(p.total - p.senia)
                        )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell colSpan={3}></TableCell>
                          <TableCell className='font-semibold'>TOTAL</TableCell>
                          <TableCell className='font-semibold'>{formatCurrency(p.total)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : (
                    <div>No posee productos.</div>
                  ) 
                } 
                
                <div>
                  <label>Descripción</label>
                  <p>{p.descripcion ? p.descripcion : "-"}</p>
                </div>
              </div>
              
            </div>
          ))}
        <div className="flex justify-center mt-2 space-x-3">
        <Button type='delete' onClick={handleDownloadPDF} value='Descargar PDF'/>
        <Button type='close' onClick={onClose} />
        </div>
        </div>
      </div>
    </div>
  );
};
