import { Router } from "express";   
import autoresRoutes from "./autores.routes.js";

const router = Router();

router.use('/autores', autoresRoutes);

export default router;