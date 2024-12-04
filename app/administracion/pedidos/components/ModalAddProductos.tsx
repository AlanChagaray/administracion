import { productosBuscar } from "@/app/services/productos";
import { Producto } from "@/app/types";
import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import { Subtitle } from "@/components/Subtitle";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatCurrency";
import React, { useEffect, useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: (total: any) => void;
}

export const ModalAddProductos = ({ show, onClose, onConfirm }: Props) => {
  if (!show) return null;

  const [productos, setProductos] = useState<Producto[]>([]);
  const [totalproductos, setTotalproductos] = useState<
    { idproducto: number; nombre: string; cantidad: number; precioventa:number, totalProducto: number }[]
  >([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ nombre: "", estado : "disponible" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  
  useEffect(() => {
    const fetchproductos = async () => {
      setLoading(true);
      const data = await productosBuscar(searchParams);
      setProductos(data);
      setLoading(false);
    };
    fetchproductos();
  }, [searchParams]);

  const handleChangeSearch = (value: string, field: string) => {
    setSearchParams({
      ...searchParams,
      [field]: value,
    });
  };

  const handleClean = () => {
    setSearchParams({ nombre: "", estado: "disponible" });
  };

  const handleAdd = (idproducto: any, nombre: string, precio: any, e: any) => {
    const cantidad = Number(e.target.value);
    const precioventa = precio ;
    const totalProducto = precio * cantidad;

    setTotalproductos((prevTotal) => {
      let updatedTotalProductos = [...prevTotal];

      // Verifica si el producto ya está en el array
      const productIndex = updatedTotalProductos.findIndex(
        (producto) => producto.idproducto === idproducto
      );

      if (productIndex >= 0) {
        if (cantidad === 0) {
          // Si la cantidad es 0, eliminar el producto del array
          updatedTotalProductos.splice(productIndex, 1);
        } else {
          // Si el producto existe, actualiza la cantidad y el total
          updatedTotalProductos[productIndex] = {
            ...updatedTotalProductos[productIndex],
            cantidad,
            precioventa,
            totalProducto,
          };
        }
      } else {
        // Si el producto no existe y la cantidad es mayor a 0, agregarlo al array
        if (cantidad > 0) {
          updatedTotalProductos.push({
            idproducto,
            nombre,
            cantidad,
            precioventa,
            totalProducto,
          });
        }
      }

      // Recalcula el total general
      const newtotal = updatedTotalProductos.reduce(
        (acc, curr) => acc + curr.totalProducto,
        0
      );
      setTotal(newtotal);

      return updatedTotalProductos;
    });
  };

  const handleConfirm = () => {
    if (total) {
      onConfirm({ totalproductos, total });
      onClose();
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-md p-4 text-center text-2xl w-70% h-auto">
          <Subtitle value="Seleccione producto" />
          <div>
            <div className="p-4 w-full shadow-lg ">
              <ul className="flex space-x-3">
                <li>
                  <Select
                    value={searchParams.nombre}
                    onValueChange={(value) =>
                      handleChangeSearch(value, "nombre")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {productos.map((producto) => (
                        <SelectItem
                          key={producto.idproducto}
                          value={producto.nombre}
                        >
                          {producto.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </li>

                <li className="content-center">
                  <Button type="clean" onClick={handleClean} />
                </li>
              </ul>
            </div>
            <br />
            <div>
              {loading ? (
                <Spinner />
              ) : productos.length > 0 ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Cantidad</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.map((producto) => (
                        <TableRow key={producto.idproducto}>
                          <TableCell>{producto.idproducto}</TableCell>
                          <TableCell>{producto.nombre}</TableCell>
                          <TableCell>
                            {producto.descripcion ? producto.descripcion : ""}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(producto.precioventa)}
                          </TableCell>
                          <TableCell>
                            <Input
                              className="w-16"
                              type="number"
                              min={0}
                              onChange={(value) =>
                                handleAdd(
                                  producto.idproducto,
                                  producto.nombre,
                                  producto.precioventa,
                                  value
                                )
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end mt-3">
                    Total: {formatCurrency(total)}
                  </div>
                  <div className="flex justify-center mt-4">
                    {[...Array(Math.ceil(productos.length / itemsPerPage )).keys()].map((number) => (
                      <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`px-3 py-1 mx-1 ${
                          currentPage === number + 1
                            ? "bg-red-300 text-white"
                            : "bg-white hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {number + 1}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p>No se encontraron registros.</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 mt-2">
            <div>
              <Button type="close" onClick={onClose} />
            </div>
            <div className="flex justify-end">
              <Button type="success" onClick={handleConfirm} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
