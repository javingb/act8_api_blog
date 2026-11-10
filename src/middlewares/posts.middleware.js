import { selectById } from "../models/posts.model.js";
import { selectById as selectAutorById } from "../models/autores.model.js";

const existePost = async (req, res, next) => {
    const { idPost } = req.params;
    const post = await selectById(idPost);
    if (!post) {
        return res.status(404).json({ error: "No existe el post con el id proporcionado" });
    }
    req.post = post;
    next();
}

const validarPost = async (req, res, next) => {
    const { titulo, descripcion, categoria, autor_id } = req.body ?? {};

    if (!titulo || !descripcion || !categoria || !autor_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const autor = await selectAutorById(autor_id);
    if (!autor) {
        return res.status(404).json({ error: "No existe el autor con el id proporcionado" });
    }
    next();
}

export { existePost, validarPost };