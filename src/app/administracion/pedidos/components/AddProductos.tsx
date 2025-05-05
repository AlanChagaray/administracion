import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ModalAddProductos } from "./ModalAddProductos";
import { Button } from "@/components/Button";
import { Title } from "@/components/Title";
import { IoArrowBackOutline } from "react-icons/io5";


export const AddProductos = ({productos, onProductos, onBackCliente} : any ) => {
  const formRef: any = useRef();
  const [totalProductos, setTotalProductos] = useState<any[]>([]); 
  const [modalProductosOpen, setModalProductosOpen] = useState(false);

  useEffect(() => {
    if(productos){
      setTotalProductos(productos);
    }
  }, [productos])
  

  const handleOpenProductosModal = async () => {
    setModalProductosOpen(true);
  };

  const handleConfirmProductos = async (productos: any) => {
    const totalProductos = productos.totalproductos;
    
    const newProductos = Object.keys(totalProductos).map((key) => {
      return totalProductos[key];
    });

    setTotalProductos(newProductos);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    onProductos(totalProductos);
    formRef.current.reset
  };

  return (
    <div className="justify-center flex">
    <div className="w-full lg:max-w-[80%] sm:max-w-[100%]">
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="shadow-md bg-white p-4 ">
        <div className="flex justify-start">
            <button
              onClick={onBackCliente}
              className="flex items-center text-gray-500"
            >
              <IoArrowBackOutline color="grey" size="16" />
              <span className="ml-2">Pagina anterior</span>
            </button>
          </div>
          <div className="flex justify-center">
            <Title value="Agregar productos" />
          </div>
          <div>
            <Button
              type="add"
              value="Productos"
              onClick={handleOpenProductosModal}
            />
          </div>
          <div className="w-full">
            <div className="mt-2">
              {totalProductos.length > 0 ? (
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
                    {totalProductos.map((producto, index) => (
                      <TableRow key={index}>
                        <TableCell>{producto.idproducto}</TableCell>
                        <TableCell>{producto.nombre}</TableCell>
                        <TableCell>{producto.cantidad}</TableCell>
                        <TableCell>{formatCurrency(producto.precioventa)}</TableCell>
                        <TableCell>{formatCurrency(producto.totalProducto)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3}></TableCell>
                      <TableCell className="font-semibold">TOTAL</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency( 
                          totalProductos.reduce( (acc, producto) => acc + producto.totalProducto,0)
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <div>
                  <p>No posee productos.</p>
                </div>
              )}
            </div>
          </div>
        <div className="justify-center items-center flex mt-7">
          <Button type="submit" value="Siguiente" />
        </div>
        </div>
      </form>
      {modalProductosOpen && (
        <ModalAddProductos
          show={modalProductosOpen}
          onClose={() => {
            setModalProductosOpen(false);
          }}
          onConfirm={handleConfirmProductos}
        />
      )}
    </div>
    </div>
  );
};
