"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { SuccessModal } from "@/components/SuccessModal";
import { Spinner } from "@/components/Spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function getUsuario(id: any) {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +`/usuarios?id=${id}`
    );
    return data || null;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

async function deleteUsuario(id: any) {
  try {
    const { data } = await axios.delete(
      process.env.NEXT_PUBLIC_API_URL +`/usuarios?id=${id}`
    );
    return data || null;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return [];
  }
}

export default function page() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouter();
  const formRef: any = useRef([]);
  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const data = await getUsuario(id);
        setUsuario(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching usuario:", error);
      }
    }
    fetchUsuario();
  }, [id]);

  const handleModalDelete = () => {
    setShowDeleteModal(true);
  };
  const handleModalClose = () => {
    setShowDeleteModal(false);
    setSuccessModal(false);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    setSuccessModal(true);
    // async function fetchDelete(){
    //   try {
    //     const response = await deleteusuario(id);

    //   } catch (error) {

    //   }
    // }
  };



  return (
    <div className="w-full flex  justify-center item-center content-center ">
      {loading ? (
        <Spinner/>
      ) : (
        <div className="w-[50%] shadow-md bg-white p-4 ">
          {usuario.map((u: any) => (
            <div key={id}>
              <Card>
                <CardHeader>
                <CardTitle>{u.idusuario + ' ' + u.nombre + ' ' + u.apellido }</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="grid grid-rows-3 space-y-3">
                <div className="grid grid-cols-2">
                  <div>
                    <label>Documento</label>
                    <p>{u.documento ? u.documento : "-"}</p>
                  </div>
                  <div>
                    <label>Permiso</label>
                    <p>{u.permiso ? u.permiso : "-"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div>
                    <label>Teléfono</label>
                    <p>{u.telefono ? u.telefono : "-"}</p>
                  </div>
                  <div>
                    <label>Email</label>
                    <p>{u.email ? u.email : "-"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 ">
                  <div>
                    <label>Fecha alta</label>
                    <p>{u.fechaalta ? u.fechaalta : "-"}</p>
                  </div>
                  <div>
                    <label>Fecha modificación</label>
                    <p>{u.fechamodificacion ? u.fecharetiro : "-"}</p>
                  </div>
                </div>
                {/* <div className="grid grid-cols-3">
                  <div>
                    <label>Seña</label>
                    <p>${u.senia ? u.senia : "-"}</p>
                  </div>
                  <div>
                    <label>Total</label>
                    <p>${u.total ? u.total : "-"}</p>
                  </div>
                  <div>
                    <label>Restante</label>
                    <p>${u.total && u.senia ? u.total - u.senia : "-"}</p>
                  </div>
                </div> */}

                {/* <div>
                  <label>Estado</label>
                  <p>{u.estado ? u.estado : "-"} </p>
                </div>
                <div>
                  <label>Descripción</label>
                  <p>{u.descripcion ? u.descripcion : "-"}</p>
                </div> */}
              </div>
                </CardContent>
              </Card>
              
            </div>
          ))}
          <br></br>
          <div className="justify-center items-center flex">
            <div className="grid grid-cols-2">
              <div>
                {/* <Button className='bg-blue-400 hover:bg-blue-500' onClick={() => router.push(`/dashboard/usuarios/editar/${id}`)}>
                  Editar
                </Button> */}
                <Button type='edit' onClick={() => router.push(`/administracion/usuarios/editar/${id}`)} />
              </div>
              <div>
                <Button type='delete' onClick={handleModalDelete} />
                {/* <Button className='bg-red-400 hover:bg-red-500' onClick={handleModalDelete}>Eliminar</Button> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex content-center items-center justify-center  ">
          <Card className="bg-white rounded-sm  border-gray-200 p-2">
            <CardContent>
              <CardDescription>seguro desea eliminar usuario?</CardDescription>
              <br />
              <div className="grid grid-cols-2 space-x-3">
                <div>
                  <Button type='delete' onClick={handleDelete} />
                </div>
                <div>
                  <Button type='delete' onClick={handleModalClose} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <SuccessModal show={successModal} onClose={handleModalClose} />
    </div>
  );
}
