import { Router } from "express";

import { UsuarioController } from "../controllers/usuario.controller.js";

const usuarioRouter = Router()

// Registrar Usuario
usuarioRouter.get("/usuario/registro", UsuarioController.registroUsuario)

usuarioRouter.get("/usuario/obtener", UsuarioController.obtenerUsuarios)
usuarioRouter.post("/usuario/crear", UsuarioController.crearUsuario)
usuarioRouter.post("/docente/crear", UsuarioController.crearDocente)
usuarioRouter.post("/estudiante/crear", UsuarioController.crearEstudiante)
usuarioRouter.post("/secretaria/crear", UsuarioController.crearSecretaria)
// Login Usuario
usuarioRouter.get("/usuario/login", (req, res) => {
    res.render('partials/loginUsuario');
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
usuarioRouter.post("/usuario/login", UsuarioController.logearUsuario);

export default usuarioRouter