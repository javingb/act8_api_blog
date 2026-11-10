import { Router } from "express";
import { getAll, getById, create } from "../controllers/posts.controller.js";
import { existePost, validarPost } from "../middlewares/posts.middleware.js";

const router = Router();

router.get("/", getAll);
router.get("/:idPost", existePost, getById);
router.post("/", validarPost, create);

export default router;