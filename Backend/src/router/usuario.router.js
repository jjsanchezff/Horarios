import { Router } from "express";

import { UsuarioController } from "../controllers/usuario.controller.js";

const usuarioRouter = Router()

// Registrar Usuario
usuarioRouter.get("/usuario/registro", UsuarioController.registroUsuario)

usuarioRouter.get("/usuario/obtener", UsuarioController.obtenerUsuarios)
usuarioRouter.post("/usuario/crear", UsuarioController.crearUsuario)
usuarioRouter.post("/docente/crear", UsuarioController.crearDocente)
usuarioRouter.post("/estudiante/crear", UsuarioController.crearEstudiante)

usuarioRouter.get("/usuario/login", UsuarioController.logearUsuario)

export default usuarioRouter