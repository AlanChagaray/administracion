import axios from "axios";

 export async function vtaProductosObtener(idpedido: any) {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/vtaproductos?idpedido=${idpedido}`
      );
      return data || null;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  }