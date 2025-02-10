import React, { useEffect, useState } from "react";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { pedidosBuscar } from "@/app/services/pedidos";
import { Spinner } from "@/components/Spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatCurrency";
import { Pedido } from "@/app/types/Pedido";

interface Props {
  cliente: any;
  show: boolean;
  onClose: () => void;
}

export const ModalView = ({ cliente, show, onClose }: Props) => {

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const data = await pedidosBuscar({idcliente : cliente[0].idcliente});
          setPedidos(data);
          setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cliente]);  
  
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="bg-white  rounded-md p-4 lg:w-[50%]">
          {cliente.map((c: any) => (
            <div key={c.idcliente}>
              <Title value={c.nombre + " " + c.apellido} />
              <div className="grid grid-rows-2 space-y-2 mt-4">
                <div className="grid grid-cols-3 space-x-3">
                  <div>
                    <label>DNI</label>
                    <p>{c.documento ? c.documento : "-"}</p>
                  </div>
                  <div>
                    <label>Teléfono</label>
                    <p>{c.telefono ? c.telefono : "-"}</p>
                  </div>
                  <div>
                    <label>Email</label>
                    <p>{c.email ? c.email : "-"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 space-x-3">
                  <div>
                    <label>Fecha alta</label>
                    <p>{c.fechaalta ? c.fechaalta : "-"}</p>
                  </div>
                  <div>
                    <label>Fecha modificación</label>
                    <p>{c.fechamodificacion ? c.fechamodificacion : "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          { loading ? (
              <Spinner/>
            ): pedidos.length > 0  ? (
                <div className='mt-3'>
                  <Title value='Pedidos'/>
                <Table>
                  <TableHeader >
                    <TableRow>
                      <TableHead>#Id</TableHead>
                      <TableHead>Descripcion</TableHead>
                      <TableHead>Fecha retiro</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pedidos.map((pedido) => (
                      <TableRow key={pedido.idpedido}>
                        <TableCell>{pedido.idpedido}</TableCell>
                        <TableCell>{pedido.descripcion}</TableCell>
                        <TableCell>{pedido.fecharetiro}</TableCell>
                        <TableCell>{formatCurrency( pedido.total)}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              ) : (
                <p>No posee pedidos activos</p>
              )
          }
          <div className="flex justify-center mt-2">
            <Button type="close" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};
