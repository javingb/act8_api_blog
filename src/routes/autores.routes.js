import { Router } from "express";
import { getAll, getById, create } from "../controllers/autores.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:idAutor", getById);
router.post("/", create);


export default router;