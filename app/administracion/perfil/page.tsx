"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SuccessModal } from "@/components/SuccessModal";
import { Spinner } from "@/components/Spinner";

async function usuario_obtener(id: any) {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/usuarios?idusuario=${id}`
    );
    return data || null;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

export default function page() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouter();
  const formRef: any = useRef([]);
  const [pedido, setPedido] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    async function fetchPedido() {
      try {
        const data = await usuario_obtener(id);
        setPedido(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pedido:", error);
      }
    }
    fetchPedido();
  }, [id]);

  const handleModalDelete = () => {
    setShowDeleteModal(true);
  };
  const handleModalClose = () => {
    setShowDeleteModal(false);
    setSuccessModal(false);
  };

  return (
    <div className="w-full flex  justify-center item-center content-center ">
      {loading ? (
        <Spinner/>
      ) : (
        <div className="w-[30%] shadow-md bg-white p-4 ">
          {pedido.map((p: any) => (
            <div key={id}>
              <div className="grid grid-rows-6">
                <div className="grid grid-cols-3 space-x-2">
                  <div>
                    <label>Nombre</label>
                    <p>{p.nombre ? p.nombre : "-"}</p>
                  </div>
                  <div>
                    <label>Apellido</label>
                    <p>{p.apellido ? p.apellido : "-"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div>
                    <label>Teléfono</label>
                    <p>{p.telefono ? p.telefono : "-"}</p>
                  </div>
                  <div>
                    <label>Email</label>
                    <p>{p.email ? p.email : "-"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div>
                    <label>Fecha Alta</label>
                    <p>{p.fechaalta ? p.fechaalta : "-"}</p>
                  </div>
                  <div>
                    <label>Fecha Modificación</label>
                    <p>{p.fechamodificacion ? p.fecharetiro : "-"}</p>
                  </div>
                </div>

                <div>
                  <label>Estado</label>
                  <p>{p.estado ? p.estado : "-"} </p>
                </div>
                
              </div>
            </div>
          ))}
          <br></br>
          <div className="justify-center items-center flex">
            <div className="grid grid-cols-2">
              <div>
                <Button onClick={() => router.push(`/pedidos/editar/${id}`)}>
                  Editar
                </Button>
              </div>
              <div>
                <Button onClick={handleModalDelete}>Eliminar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <SuccessModal show={successModal} onClose={handleModalClose} />
    </div>
  );
}
