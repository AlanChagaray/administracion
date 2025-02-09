"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AddCliente, AddProductos , AddPedido, PreviewPedido } from "../components/"
import { Title } from "@/components/Title";
import { SuccessModal } from "@/components/SuccessModal";
import { ErrorModal } from "@/components/ErrorModal";
import { Cliente } from "@/app/types/Cliente";
import { Pedido } from "@/app/types/Pedido";
import { Producto } from "@/app/types/Producto";

const Page = () => {

  const [dataCliente, setDataCliente] = useState<Cliente | null>(null);
  const [dataProductos, setDataProductos] = useState<Producto[]>([]);
  const [dataPedido, setDataPedido] = useState<Pedido | null>(null);
  const [totalProductos, setTotalProductos] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const formRef: any = useRef();
  const router = useRouter();

  const handlePedidoConfirm = async () => {
    try {
      if (!dataCliente) {
        throw new Error('Cliente no seleccionado');
      }

      let idcliente = dataCliente.idcliente;

      if (!idcliente) {
        const clienteResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL +"/clientes", {
          nombre: dataCliente.nombre,
          apellido: dataCliente.apellido,
          documento: dataCliente.documento,
          telefono: dataCliente.telefono,
          email: dataCliente.email,
        });
        idcliente = clienteResponse.data.idcliente; 
      }
      
      if (!dataPedido) {
        throw new Error('Pedido no seleccionado');
      }

     const pedidoResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL +"/pedidos", {
        idcliente: idcliente,
        fecharetiro: dataPedido.fecharetiro,
        senia: dataPedido.senia,
        total: totalProductos,
        descripcion: dataPedido.descripcion,
      });
      const idpedido = pedidoResponse.data.idpedido;

      if (dataProductos && idpedido) {
        for (const prod of dataProductos) {
          await axios.post(process.env.NEXT_PUBLIC_API_URL +"/vtaproductos", {
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

export default Page;