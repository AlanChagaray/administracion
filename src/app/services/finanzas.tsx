import axios from "axios";


export async function finanzasBuscar(params = {}) {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/finanzas",{params}
      );
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  }
  
export async function finanzasObtener(params = {}) {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/finanzas",
        { params }
      );
      return {
        finanza : Array.isArray(data.finanza) ? data.finanza : [],
        finanzaAnual : Array.isArray(data.finanzaAnual) ? data.finanzaAnual : {},
        productos : Array.isArray(data.productos) ? data.productos : {},
        finanzas : Array.isArray(data.finanzas) ? data.finanzas : {}
      };
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  }
  