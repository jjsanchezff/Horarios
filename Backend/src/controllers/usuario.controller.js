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


            if (data[0].id_rol === 1)
                res.redirect('/api/usuario/director');


            const { data: data2, error: error2 } = await supabase.from('docente').select().eq('id_usuario', data[0].id_usuario);
            const { data: dataCursos, error: errorCursos } = await supabase.from('curso').select('nombre');

            const { data: dataHorario, error: errorHorario } = await supabase.from('preferencia_horario').select().eq('id_docente', data2[0].id_docente);

            console.log('Horario:', dataHorario);

            if (errorCursos) {
                console.error('Error al intentar obtener los cursos:', errorCursos);
                throw errorCursos;
            }

            if (error) {
                console.error('Error al intentar iniciar sesión:', error);
                throw error;
            }

            if (data.length === 0) {
                return res.status(401).send('Usuario no encontrado.');
            }

            req.session.cursos = dataCursos;

            // Guardar información del usuario en la sesión
            data[0].id_docente = data2[0].id_docente;
            req.session.user = data[0];
            req.session.horario = dataHorario;

            console.log(req.session.user);
            console.log('Usuario autenticado correctamente.');


            if (data[0].id_rol === 2) {
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

    static async crearPreferenciaHorario(req, res) {
        try {
            const datos = req.body;
            console.log("Se recibió los siguientes datos del form:");
            console.log(datos);

            if (!datos.aula || !datos.tipoSesion || !datos.id_curso) {
                return res.status(400).json({ success: false, message: 'Datos incompletos.' });
            }

            const horaInicio = new Date(`1970-01-01 ${datos.hora_inicio}`).toTimeString().split(' ')[0];
            const horaFin = new Date(`1970-01-01 ${datos.hora_fin}`).toTimeString().split(' ')[0];

            console.log('Hora de inicio:', horaInicio);
            console.log('Hora de fin:', horaFin);

            const { data, error } = await supabase.from('preferencia_horario').insert({
                dia: datos.dia,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                horas: 1,
                aula: datos.aula,
                id_docente: datos.id_docente,
                id_periodo: datos.id_periodo,
                id_curso: datos.id_curso,
                sesion: datos.tipoSesion,
            });

            if (error) throw error;

            res.json({ success: true, message: 'Preferencia de horario guardada correctamente.' });
        } catch (error) {
            console.error('Error en el controlador de preferencia de horario:', error);
            res.status(500).json({ success: false, message: 'Ocurrió un error inesperado.' });
        }
    }
}
