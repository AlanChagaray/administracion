import axios from "axios";
import VtaProductos from '../api/vtaproductos/model';


// export async function proveedoresBuscar(params = {}) {
//     try {
//       const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/proveedores', { params });
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error al obtener los datos:', error);
//       return [];
//     }
//   }
  
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