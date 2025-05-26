import { Router } from "express"
import { analizar } from "../controllers/Analisis_Gts_Ing.controller.js"
import { login } from "../controllers/Login.controller.js"
import { registro } from "../controllers/Registro.controller.js"
import { categorias } from "../controllers/Categorias.controller.js"
import { registrar_movimiento } from "../controllers/Reg_Ing_Eg.controller.js"
import { listar } from "../controllers/List_Gts_Ing.controller.js"
const router = Router()

//Rutas
router.post('/ingreso', login)
router.post('/registro', registro)
router.post('/categorias', categorias)
router.post('/registrar_movimiento', registrar_movimiento)
router.post('/listar_movimientos', listar)
router.post('/analisis', analizar)

export default router