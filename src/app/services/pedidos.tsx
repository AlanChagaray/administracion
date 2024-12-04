import axios from "axios";

export async function pedidosBuscar(params = {}) {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/pedidos",
      { params }
    );
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

export async function pedidosObtener(idpedido: any) {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/pedidos?id=${idpedido}`
    );
    return data || null;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

export async function pedidosEliminar(idpedido: any) {
  try {
    const { data } = await axios.delete(
      process.env.NEXT_PUBLIC_API_URL + `/pedidos?idpedido=${idpedido}`
    );
    return data || null;
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    throw error;
  }
}

export async function downloadPDF(pedido: any, productos: any) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/pdf",
      { pedido, productos },
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Pedido_Nro#${pedido[0].idpedido}.pdf`); // Nombre del archivo PDF
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
}


