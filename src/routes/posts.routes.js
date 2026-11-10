import { Router } from "express";
import { getAll, getById, create } from "../controllers/posts.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:idPost", getById);
router.post("/", create);

export default router;