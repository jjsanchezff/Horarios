import { Router } from "express";

import { UsuarioController } from "../controllers/usuario.controller.js";

const usuarioRouter = Router()

usuarioRouter.get("/usuario/obtener", UsuarioController.obtenerUsuarios)
usuarioRouter.post("/usuario/crear", UsuarioController.crearUsuario)

export default usuarioRouter