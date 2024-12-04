import { NextResponse , NextRequest} from "next/server";
import Finanza from './model';

export async function buscar(req : NextRequest) {
    const { searchParams } = new URL(req.url);

    const mes  = searchParams.get('mes') || null ;
    const anio = searchParams.get('anio') || null;

        const finanzas = await Finanza.search({mes, anio});
        const finanza = await Finanza.getMonth({mes,anio});
        const finanzaAnual = await Finanza.getYear(anio);
        const productos = await Finanza.getProducts({mes, anio})
        return NextResponse.json({
            finanzas,
            finanza,
            finanzaAnual,
            productos
        });
        
}