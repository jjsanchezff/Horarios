import { Router } from "express"

import { RolController } from "../controllers/rol.controller.js"

const rolRouter = Router()

rolRouter.get("/rol/obtener", RolController.obtenerRoles)
rolRouter.get("/rol/obtener/:id", RolController.obtenerRol)
rolRouter.post("/rol/crear", RolController.crearRol)
rolRouter.put("/rol/actualizar/:id", RolController.actualizarRol)
rolRouter.delete("/rol/eliminar/:id", RolController.eliminarRol)

export default rolRouter