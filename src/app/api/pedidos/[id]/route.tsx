
// import {pool} from '@/config/db'
// import { NextResponse } from "next/server";

// export async function GET(request : any) {
  
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id') || null; // Manejar 'null' si el parámetro 'id' no está presente
  
//     const sql = 'CALL AdmPedidosObtener (?);';

//     const [query] = await pool.query(sql, [id]);
//     const result = Array.isArray(query) && query.length > 0 && Array.isArray(query[0]) ? query[0] : null;

//     return NextResponse.json(result);
//   }
  
