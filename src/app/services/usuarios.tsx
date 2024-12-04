import axios from "axios";

export async function usuariosBuscar(params = {}) {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/usuarios",
        { params }
      );
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  }
  
  export async function usuariosObtener(idusuario: any) {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/usuarios?idusuario=${idusuario}`
      );
      return data || null;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  }