import { Router } from "express";

import { UsuarioController } from "../controllers/usuario.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const usuarioRouter = Router()

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

usuarioRouter.get("/docente/registro",(req, res)=>{
    res.render('partials/registrarProfesor');
})
usuarioRouter.get("/secretaria/registro",(req, res)=>{
    res.render('partials/registrarSecretaria');
})
usuarioRouter.get("/administrador/registro",(req,res) =>{
    res.render("partials/registrarAdministrador");
})
usuarioRouter.get("/usuario/registro/seleccionar",(req,res)=>{
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

export default usuarioRouter