"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AddCliente, AddProductos , AddPedido, PreviewPedido } from "../components/"
import { Title } from "@/components/Title";
import { SuccessModal } from "@/components/SuccessModal";
import { ErrorModal } from "@/components/ErrorModal";
import { Cliente } from "@/app/types/Cliente";
import { Pedido } from "@/app/types/pedido";
import { Producto } from "@/app/types/Producto";

export default function page() {
  const formRef: any = useRef();
  const router = useRouter();
  const [dataCliente, setDataCliente] = useState<Cliente>([]);
  const [dataProductos, setDataProductos] = useState<Producto[]>([]);
  const [dataPedido, setDataPedido] = useState<Pedido>([]);
  const [totalProductos, setTotalProductos] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


  const handlePedidoConfirm = async (e: any) => {
    e.preventDefault();
    try {
      
      let idcliente = dataCliente.idcliente;

      if (!idcliente) {
        const clienteResponse = await axios.post("/api/clientes", {
          nombre: dataCliente.nombre,
          apellido: dataCliente.apellido,
          documento: dataCliente.documento,
          telefono: dataCliente.telefono,
          email: dataCliente.email,
        });
        idcliente = clienteResponse.data.idcliente; 
      }
      
     const pedidoResponse = await axios.post("/api/pedidos", {
        idcliente: idcliente,
        fecharetiro: dataPedido.fecharetiro,
        senia: dataPedido.senia,
        total: totalProductos,
        descripcion: dataPedido.descripcion,
      });
      const idpedido = pedidoResponse.data.idpedido;

      if (dataProductos && idpedido) {
        for (const prod of dataProductos) {
          await axios.post("/api/vtaproductos", {
            idpedido: idpedido,
            idproducto: prod.idproducto,
            cantidad: prod.cantidad,
            totalproducto: prod.totalproducto
          });
        }
      }
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error al guardar pedido:", error);
      setShowErrorModal(true);
    }
  };

  const total = (productos:any) => {
    var total = 0;
      for (const prod of productos) {
        total += prod.precioventa * prod.cantidad;
      }
    return total;
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push(`/administracion/pedidos`);
  }

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };


  const handleClienteConfirmado = (clienteData: any) => {
    setDataCliente(clienteData);
    setCurrentStep(2);
  };
  const handleProductosConfirmado = (productosData: any) => {
    setDataProductos(productosData);
    setTotalProductos(total(productosData));
    setCurrentStep(3);
  };
  const handlePedido = (pedidoData: any) => {
    setDataPedido(pedidoData);
    setCurrentStep(4);
  };

  const handleClienteBack = () => { setCurrentStep(1); }
  const handleDetalleBack = () => { setCurrentStep(2); }
  const handlePreviewBack = () => { setCurrentStep(3); }
  
  return (
    <>
      <Title value="Nuevo pedido" />
      {currentStep == 1 && (
          <AddCliente 
            onCliente={handleClienteConfirmado} 
            cliente={dataCliente}
          />
        )}
      {currentStep == 2 && (
          <AddProductos
            productos={dataProductos} 
            onProductos={handleProductosConfirmado}
            onBackCliente={handleClienteBack}
          />
        )}
      {currentStep == 3 && (
          <AddPedido 
            pedido={dataPedido} 
            onPedido={handlePedido}
            onBackProductos={handleDetalleBack}
          />
        )}
      {currentStep == 4 && (
          <PreviewPedido 
            cliente={dataCliente} 
            productos ={dataProductos} 
            pedido={dataPedido} 
            total ={totalProductos} 
            onConfirm={handlePedidoConfirm}
            onBackPedidos={handlePreviewBack}
          />
        )}

        <SuccessModal show={showSuccessModal} onClose={handleCloseSuccessModal} />

        <ErrorModal show={showErrorModal} onClose={handleCloseErrorModal} />

    </>
  );
}
