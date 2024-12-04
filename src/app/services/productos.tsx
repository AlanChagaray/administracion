import axios from "axios";


export async function productosBuscar(params = {}) {
    try {
      const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/productos', { params });
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return [];
    }
  }
  
 export async function productosObtener(idproducto: any) {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/productos?idproducto=${idproducto}`
      );
      return data || null;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  }