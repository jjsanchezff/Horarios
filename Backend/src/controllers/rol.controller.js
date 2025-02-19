import { supabase } from "../config/conexiondb.js";

export class RolController {
    static async obtenerRoles(req, res) {
        try {
            const { data, error } = await supabase.from('rol').select();
            if (error) throw error;
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async crearRol(req, res) {
        const datos = req.body
        console.log("Se recibió los siguientes datos:")
        console.log(datos)

        try {
            // const { data, error } = await supabase.from('rol').insert([datos]);
            const { data, error } = await supabase.from('rol').insert({
                nombre: datos.nombre,
                descripcion: datos.descripcion
            });
            if (error) throw error;
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async obtenerRol(req, res) {
        const id = req.params.id
        try {
            const { data, error } = await supabase.from('rol').select().eq('id_rol', id);
            if (error) throw error;
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async actualizarRol(req, res) {
        const id = req.params.id
        const datos = req.body
        console.log("Se recibió los siguientes datos:")
        console.log(datos)

        try {
            const { data, error } = await supabase.from('rol').update({
                nombre: datos.nombre,
                descripcion: datos.descripcion
            }).eq('id_rol', id);
            if (error) throw error;
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async eliminarRol(req, res) {

    }


}

