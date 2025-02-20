import { Router } from "express";

import { UsuarioController } from "../controllers/usuario.controller.js";

const usuarioRouter = Router()

// Registrar Usuario
usuarioRouter.get("/usuario/registro", UsuarioController.registroUsuario)

usuarioRouter.get("/usuario/obtener", UsuarioController.obtenerUsuarios)
usuarioRouter.post("/usuario/crear", UsuarioController.crearUsuario)
usuarioRouter.post("/docente/crear", UsuarioController.crearDocente)
usuarioRouter.post("/estudiante/crear", UsuarioController.crearEstudiante)

// Login Usuario
usuarioRouter.get("/usuario/login", (req, res) => {
    res.render('partials/loginUsuario');
});

usuarioRouter.post("/usuario/login", UsuarioController.logearUsuario);

export default usuarioRouter