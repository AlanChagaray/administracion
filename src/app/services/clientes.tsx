import axios from "axios";

export async function clientesBuscar(params = {}) {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/clientes",
        { params }
      );
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  }
  
  export async function clientesObtener(idcliente: any) {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/clientes?idcliente=${idcliente}`
      );
      return data || null;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  }