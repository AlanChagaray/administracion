import React from "react";
import { Title } from "@/components/Title";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/Button";
import { IoArrowBackOutline } from "react-icons/io5";
import { formatCurrency, total } from "@/utils/formatCurrency";

interface Props {
  cliente: any;
  productos: any;
  pedido: any;
  total: any;
  onConfirm: () => void,
  onBackPedidos: () => void;
}

export const PreviewPedido = ({ cliente, productos, pedido, total, onConfirm, onBackPedidos}: Props) => {
  
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[80%] shadow-md bg-white p-4">
          <div>
            <div className="flex justify-start">
              <button onClick={onBackPedidos} className="flex items-center text-gray-500">
                <IoArrowBackOutline color="grey" size="16" />
                <span className="ml-2">Pagina anterior</span>
              </button>
            </div>

            <div className="flex justify-center">
              <Title value="Vista previa" />
            </div>

            <div>
              <div className="mt-4">
                <Title value="Datos del cliente" />
                <div>
                  <div className="grid grid-cols-3">
                    <div>
                      <Label>Nombre</Label>
                      <p>{cliente.nombre}</p>
                    </div>
                    <div>
                      <Label>Apellido</Label>
                      <p>{cliente.apellido ? cliente.apellido : "--"}</p>
                    </div>
                    <div>
                      <Label>Documento</Label>
                      <p>{cliente.documento ? cliente.documento : "--"}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3">
                  <div>
                    <Label>Telefono</Label>
                    <p>{cliente.telefono ? cliente.telefono : "--"}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p>{cliente.email ? cliente.email : "--"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <Title value="Productos agregados" />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Id</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Precio unitario</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productos.map((producto, index) => (
                      <TableRow key={index}>
                        <TableCell>{producto.idproducto}</TableCell>
                        <TableCell>{producto.nombre}</TableCell>
                        <TableCell>{producto.cantidad}</TableCell>
                        <TableCell>{formatCurrency(producto.precioventa)}</TableCell>
                        <TableCell>{formatCurrency(producto.precioventa * producto.cantidad)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3}></TableCell>
                      <TableCell className="font-semibold">Abonado</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(pedido.senia)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}></TableCell>
                      <TableCell className="font-semibold">Restante</TableCell>
                      <TableCell>{
                          total - pedido.senia === 0 ?(
                          <p className="text-green-400">pagado</p>
                          ) : (
                            formatCurrency( total - pedido.senia) 
                          )}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}></TableCell>
                      <TableCell className="font-semibold">TOTAL</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(total)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-3">
                <Title value="Detalle del pedido" />
                <div className="grid grid-cols-3">
                  <div>
                    <Label>Fecha de retiro</Label>
                    <p>{pedido.fecharetiro}</p>
                  </div>
                  <div>
                    <Label>Descripción</Label>
                    <p>{pedido.descripcion}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center items-center flex mt-3">
              <Button type="submit" value="Confirmar pedido" onClick={onConfirm} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
