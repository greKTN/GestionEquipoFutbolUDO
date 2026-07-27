import { supabase } from "../supabase";

export function subidaArchivos(archivo: File) {
    //sesube el archivo a la carpeta public del bucket de supabase
    return supabase.storage.from('Pagos').upload(`public/${archivo.name}`, archivo)
}

export async function obtenerArchivo(archivo: File) {
    //obtiene la url publica del archivo subido a la carpeta public del bucket de supabase
    const {data: publicUrlData} = supabase.storage.from('Pagos').getPublicUrl(`public/${archivo.name}`);

    const urlComprobante = publicUrlData.publicUrl;

    alert(urlComprobante);
}