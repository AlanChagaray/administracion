import { clientesBuscar, clientesObtener } from "@/app/services/clientes";
import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import { Subtitle } from "@/components/Subtitle";
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

import React, { useEffect, useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: (idcliente: any) => void;
}

export const ModalClientes = ({ show, onClose, onConfirm }: Props) => {
  if (!show) return null;

  const [idcliente, setIdcliente] = useState(null);
  const [cliente, setCliente] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [searchParams, setSearchParams] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  
  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      const data = await clientesBuscar(searchParams);
      setClientes(data);
      setLoading(false);
    };
    fetchClientes();
  }, [searchParams]);

  const handleChangeSearch = (value, field) => {
    setSearchParams({
      ...searchParams,
      [field]: value,
    });
  };

  const handleClean = () => {
    setSearchParams({ nombre: "", apellido: "", telefono: "" });
  };

  const handleGet = async (idcliente: any) => {
    setIdcliente(idcliente);
    const data = await clientesObtener(idcliente);
    setCliente(data);
    setShowButton(true);
  };

  const handleAdd = () => {
    if (idcliente) {
      onConfirm(idcliente);
      onClose();
    }
    setShowButton(false);
  };

  const handleCancel = () => {
    setIdcliente(null);
    setShowButton(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clientes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-md p-4 text-center text-2xl w-70% h-auto">
          <Subtitle value="Seleccione cliente" />
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
                      <SelectValue placeholder="nombre" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.map((cliente) => (
                        <SelectItem
                          key={cliente.idcliente}
                          value={cliente.nombre}
                        >
                          {cliente.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </li>
                {/* <li>
                  <Select
                    value={searchParams.apellido}
                    onValueChange={(value) =>
                      handleChangeSearch(value, "apellido")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="apellido" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.map((cliente) => (
                        <SelectItem
                          key={cliente.idcliente}
                          value={cliente.apellido ?? cliente.apellido }
                        >
                          {cliente.apellido ?? cliente.apellido }
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </li>
                <li>
                  <Select
                    value={searchParams.telefono}
                    onValueChange={(value) =>
                      handleChangeSearch(value, "telefono")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="telefono" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        ...new Set(clientes.map((cliente) => cliente.telefono)),
                      ].map((telefono, index) => (
                        <SelectItem key={index} value={telefono ?? telefono}>
                          {telefono ??telefono}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </li> */}

                <li className="content-center">
                  <Button type="clean" onClick={handleClean} />
                </li>
              </ul>
            </div>
            <br />
            <div>
              {loading ? (
                <Spinner />
              ) : clientes.length > 0 && !idcliente ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Id cliente</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Apellido</TableHead>
                        <TableHead>Telefono</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.map((cliente) => (
                        <TableRow key={cliente.idcliente}>
                          <TableCell>{cliente.idcliente}</TableCell>
                          <TableCell>{cliente.nombre}</TableCell>
                          <TableCell>{cliente.apellido}</TableCell>
                          <TableCell>{cliente.telefono}</TableCell>
                          <TableCell>
                            {!showButton && (
                              <Button
                                type="add"
                                value="Agregar"
                                onClick={() => handleGet(cliente.idcliente)}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-center mt-4">
                    {[
                      ...Array(
                        Math.ceil(clientes.length / itemsPerPage)
                      ).keys(),
                    ].map((number) => (
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
              ) : idcliente ? (
                <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Id cliente</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Apellido</TableHead>
                        <TableHead>Telefono</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                  {cliente.map((c) => (
                        <TableRow key={c.idcliente}>
                          <TableCell>{c.idcliente}</TableCell>
                          <TableCell>{c.nombre}</TableCell>
                          <TableCell>{c.apellido}</TableCell>
                          <TableCell>{c.telefono}</TableCell>
                        </TableRow>
                ))}
                </TableBody>
                </Table>
              ) : (
                <>
                  <div>
                    <p>No se encontraron registros.</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 mt-3">
            <div>
              <Button type="close" onClick={onClose} />
            </div>
            {showButton ? (
              <div className="grid grid-cols-2">
                <div>
                  {" "}
                  <Button type="success" onClick={handleAdd} />{" "}
                </div>
                <div>
                  {" "}
                  <Button type="close" value="Cancelar" onClick={handleCancel} />{" "}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
