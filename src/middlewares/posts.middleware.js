import { selectById } from "../models/posts.model.js";
import { selectById as selectAutorById } from "../models/autores.model.js";

/**
 * Comprueba que el post indicado en la URL existe en la base de datos.
 * Si existe, lo guarda en req.post para que lo use el controller.
 * @param {import('express').Request} req - Petición de Express. Params: idPost.
 * @param {import('express').Response} res - Respuesta de Express.
 * @param {import('express').NextFunction} next - Pasa al siguiente middleware o controller.
 * @returns {Promise<void>} Responde con 404 si el post no existe.
 */
const existePost = async (req, res, next) => {
    const { idPost } = req.params;
    const post = await selectById(idPost);
    if (!post) {
        return res.status(404).json({ message: "No existe el post con el id proporcionado" });
    }
    req.post = post;
    next();
}

/**
 * Comprueba que el body trae los campos obligatorios para crear un post
 * y que el autor indicado en autor_id existe.
 * @param {import('express').Request} req - Petición de Express.
 * @param {import('express').Response} res - Respuesta de Express.
 * @param {import('express').NextFunction} next - Pasa al siguiente middleware o controller.
 * @returns {Promise<void>} Responde con 400 si falta algún campo o el autor no existe.
 */
const validarPost = async (req, res, next) => {
    const { titulo, descripcion, categoria, autor_id } = req.body ?? {};

    if (!titulo || !descripcion || !categoria || !autor_id) {
        return res.status(400).json({ message: "Los campos título, descripción, categoría y autor son obligatorios" });
    }

    const autor = await selectAutorById(autor_id);
    if (!autor) {
        return res.status(400).json({ message: "No existe el autor con el id proporcionado" });
    }
    next();
}

export { existePost, validarPost };