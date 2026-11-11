import { Router } from "express";
import { getAll, getById, create, getPosts} from "../controllers/autores.controller.js";
import { comprobarId, validarAutor } from "../middlewares/autores.middleware.js";

const router = Router();

router.get("/", getAll);
router.get("/:idAutor", comprobarId, getById);
router.post("/", validarAutor, create);

// Endpoint para obtener todos los posts de un autor específico
router.get("/:idAutor/posts", comprobarId, getPosts);


export default router;