import { Router } from "express";
import { getAll, getById, create } from "../controllers/autores.controller.js";
import { comrpobarId, validarAutor } from "../middlewares/autores.middleware.js";

const router = Router();

router.get("/", getAll);
router.get("/:idAutor", comrpobarId, getById);
router.post("/", validarAutor, create);


export default router;