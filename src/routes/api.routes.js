import { Router } from "express";   
import autoresRoutes from "./autores.routes.js";
import postsRoutes from "./posts.routes.js";

const router = Router();

router.use('/autores', autoresRoutes);
router.use('/posts', postsRoutes);

export default router;