import { supabase } from "../config/conexiondb.js";

export class UsuarioController {
    static async obtenerUsuarios(req, res) {
        try {
            const { data, error } = await supabase.from('usuario').select();
            if (error) throw error;
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }


    static async crearUsuario(req, res) {
        const datos = req.body
        console.log("Se recibió los siguientes datos:")
        console.log(datos)

        try {
            const { data, error } = await supabase.from('usuario').insert({
                nombres: datos.nombres,
                apellidos: datos.apellidos,
                codigo: datos.codigo,
                correo: datos.correo,
                clave: datos.clave,
                id_rol: datos.id_rol
            });
            if (error) throw error;
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }





}
