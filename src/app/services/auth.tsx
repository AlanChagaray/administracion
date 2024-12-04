import axios from "axios";


export async function authentication(params={}){
    try {
        const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/auth",{params});
        return data;
    } catch (error) {
        console.log('Error autenticacion', error);
        return error;   
    }
}