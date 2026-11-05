import { selectById } from "../models/autores.model.js";

const comrpobarId = async (req, res, next) => {
    const { idAutor } = req.params;
    const autor = await selectById(idAutor);
    if (!autor) {
        return res.status(404).json({ message: 'No existe el autor con ese id' });
    }
    req.autor = autor;
    next();
}

const validarAutor = async (req, res, next) => {
    const { nombre, email } = req.body ?? {};
    if (!nombre || !email) {
        return res.status(400).json({ message: 'Nombre y email son obligatorios' });
    }
    next();
}

export { comrpobarId, validarAutor };