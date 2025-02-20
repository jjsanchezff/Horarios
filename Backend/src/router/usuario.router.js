import { Router } from "express";

import { UsuarioController } from "../controllers/usuario.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const usuarioRouter = Router()


import { supabase } from "../config/conexiondb.js";

// Registrar Usuario
usuarioRouter.get("/usuario/registro", UsuarioController.registroUsuario)

usuarioRouter.get("/usuario/obtener", UsuarioController.obtenerUsuarios)
usuarioRouter.post("/usuario/crear", UsuarioController.crearUsuario)
usuarioRouter.post("/docente/crear", UsuarioController.crearDocente)
usuarioRouter.post("/estudiante/crear", UsuarioController.crearEstudiante)
usuarioRouter.post("/secretaria/crear", UsuarioController.crearSecretaria)

// Verificar si el usuario ya está autenticado
usuarioRouter.get("/usuario/login", (req, res) => {
    if (req.session && req.session.user) {
        // Si el usuario está autenticado, redirige al dashboard
        res.redirect('/api/dashboard');
    } else {
        // Si no está autenticado, muestra el formulario de login
        res.render('partials/loginUsuario');
    }
});

usuarioRouter.get("/docente/registro", (req, res) => {
    res.render('partials/registrarProfesor');
})
usuarioRouter.get("/secretaria/registro", (req, res) => {
    res.render('partials/registrarSecretaria');
})
usuarioRouter.get("/administrador/registro", (req, res) => {
    res.render("partials/registrarAdministrador");
})
usuarioRouter.get("/usuario/registro/seleccionar", (req, res) => {
    res.render('partials/ventana');
})

usuarioRouter.post("/usuario/login", UsuarioController.logearUsuario);

// Añade una ruta para el dashboard
usuarioRouter.get("/dashboard", (req, res) => {
    if (req.session && req.session.user) {
        res.send('Bienvenido al dashboard!');
    } else {
        res.redirect('/api/usuario/login');
    }
});

usuarioRouter.get("/vistaDocente", (req, res) => {
    const user = req.session.user;
    const cursos = req.session.cursos;
    if (req.session && req.session.user) {
        res.render('partials/pantallaDocente', {
            nombres: user.nombres,
            apellidos: user.apellidos,
            codigo: user.codigo,
            correo: user.correo,
            id_usuario: user.id_usuario,
            id_docente: user.id_docente,
            cursos: cursos
        });
    } else {
        res.redirect('/api/usuario/login');
    }

});


usuarioRouter.get("/cursos", async (req, res) => {
    console.log("fljska")
    const { data: data2, error: error2 } = await supabase.from('curso').select();
    console.log('Cursos:', data2);
})

usuarioRouter.get("/usuario/director", async (req, res) => {
    try {
        const { data: docentes, error } = await supabase
            .from("docente")
            .select("*, usuario(*)")
            .order("id_docente", { ascending: true }); // Ordena directamente en la consulta

        if (error) {
            throw error;
        }

        console.log(docentes);
        res.render("partials/pantallaDirector", { docentes });

    } catch (err) {
        console.error("Error al obtener los docentes:", err.message);
        res.status(500).send("Error interno del servidor");
    }
});

usuarioRouter.get("/docente/:id", async (req,res) =>{
    try {
        const id = req.params.id; 
        const { data, error } = await supabase
            .from('docente').select("*, usuario(*)").eq('id_docente', id)
        if(error) {
            throw error;
        }

        if (!data || data.length === 0) {
            return res.status(404).send("Docente no encontrado");
        }
        
        const { data:data2, error:error2} = await supabase.from('preferencia_horario').select("*").eq('id_docente', id)
         if(error) {
             throw error;
         }
        const horariosProfesor = data2
        // console.log(horariosProfesor)
        const docente = data[0]
        
        res.render('partials/profesorHorarioFinal',{docente : docente, horariosProfesor : horariosProfesor})
    }
    catch (err) {
        console.error("Error al obtener los docentes:", err.message);
        res.status(500).send("Error interno del servidor");
    }
})

// Nueva ruta para guardar las preferencias de horario
usuarioRouter.post("/preferencia_horario", UsuarioController.crearPreferenciaHorario);

export default usuarioRouter