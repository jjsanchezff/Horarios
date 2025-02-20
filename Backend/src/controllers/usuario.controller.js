import { supabase } from "../config/conexiondb.js";

export class UsuarioController {
    static async obtenerUsuarios(req, res) {
        try {
            const { data, error } = await supabase.from('usuario').select();
            if (error) throw error;
            res.render('partials/registrarAlumno')
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async registroUsuario(req, res) {
        res.render('partials/registrarAlumno')
    }


    static async crearUsuario(req, res) {
        try {
            const datos = req.body
            console.log("Se recibió los siguientes datos:")
            console.log(datos)
            const { data, error } = await supabase.from('usuario').insert({
                nombres: datos.nombres,
                apellidos: datos.apellidos,
                codigo: datos.codigo,
                correo: datos.correo,
                clave: datos.clave,
                id_rol: datos.id_rol
            });
            if (error) throw error;
            res.send('Usuario registrado correctamente.');
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async crearDocente(req, res) {
        try {
            const datos = req.body
            console.log("Se recibió los siguientes datos:")
            console.log(datos)
            const { data, error } = await supabase.from('usuario').insert({
                nombres: datos.nombres,
                apellidos: datos.apellidos,
                codigo: datos.codigo,
                correo: datos.correo,
                clave: datos.clave,
                id_rol: datos.id_rol,
            }).select();

            const { data2, error2 } = await supabase.from('docente').insert({
                grado: datos.grado,
                id_usuario: data[0].id_usuario
            })

            if (error) throw error;
            console.log('Docente registrado correctamente.')

            res.send('Docente registrado correctamente.');
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async crearEstudiante(req, res) {
        try {
            const datos = req.body
            console.log("Se recibió los siguientes datos:")
            console.log(datos)
            const { data, error } = await supabase.from('usuario').insert({
                nombres: datos.nombres,
                apellidos: datos.apellidos,
                codigo: datos.codigo,
                correo: datos.correo,
                clave: datos.clave,
                id_rol: datos.id_rol,
            }).select();

            const { data2, error2 } = await supabase.from('estudiante').insert({
                anio_ingreso: datos.anio_ingreso,
                id_usuario: data[0].id_usuario
            })

            if (error) throw error;
            console.log('Estudiante registrado correctamente.')

            res.send('Estudiante registrado correctamente.');
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }


    static async logearUsuario(req, res) {
        try {
            const datos = req.body;
            console.log("Se recibió los siguientes datos:");
            console.log(datos);

            if (!datos.codigo || !datos.clave) {
                return res.status(400).send('Datos incompletos.');
            }

            const { data, error } = await supabase.from('usuario').select().eq('codigo', datos.codigo).eq('clave', datos.clave);

            if (error) {
                console.error('Error al intentar iniciar sesión:', error);
                throw error;
            }

            if (data.length === 0) {
                return res.status(401).send('Usuario no encontrado.');
            }

            // Guardar información del usuario en la sesión
            req.session.user = data[0];
            console.log('Usuario autenticado correctamente.');

            if (data[0].id_rol === 1) {
                res.redirect('/api/vistaDocente');
            }
            else if (data[0].id_rol === 4) {
                res.redirect('/api/vistaDocente');
            }


        } catch (error) {
            console.error('Error en el controlador de login:', error);
            res.status(500).json({ success: false, message: 'Ocurrió un error inesperado.' });
        }
    }
    static async crearSecretaria(req, res) {
        try {
            const datos = req.body
            console.log("Se recibió los siguientes datos:")
            console.log(datos)
            const { data, error } = await supabase.from('usuario').insert({
                nombres: datos.nombres,
                apellidos: datos.apellidos,
                codigo: datos.codigo,
                correo: datos.correo,
                clave: datos.clave,
                id_rol: datos.id_rol,
            }).select();

            if (error) throw error;
            console.log('Secretaria registrado correctamente.')

            res.send('Secretaria registrado correctamente.');
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }


}
