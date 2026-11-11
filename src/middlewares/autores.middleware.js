import { selectById } from "../models/autores.model.js";

/**
 * Comprueba que el autor indicado en la URL existe en la base de datos.
 * Si existe, lo guarda en req.autor para que lo use el controller.
 * @param {import('express').Request} req - Petición de Express. Params: idAutor.
 * @param {import('express').Response} res - Respuesta de Express.
 * @param {import('express').NextFunction} next - Pasa al siguiente middleware o controller.
 * @returns {Promise<void>} Responde con 404 si el autor no existe.
 */
const comprobarId = async (req, res, next) => {
    const { idAutor } = req.params;
    const autor = await selectById(idAutor);
    if (!autor) {
        return res.status(404).json({ message: 'No existe el autor con ese id' });
    }
    req.autor = autor;
    next();
}

/**
 * Comprueba que el body trae los campos obligatorios para crear un autor (nombre y email).
 * @param {import('express').Request} req - Petición de Express.
 * @param {import('express').Response} res - Respuesta de Express.
 * @param {import('express').NextFunction} next - Pasa al siguiente middleware o controller.
 * @returns {Promise<void>} Responde con 400 si falta algún campo obligatorio.
 */
const validarAutor = async (req, res, next) => {
    const { nombre, email } = req.body ?? {};
    if (!nombre || !email) {
        return res.status(400).json({ message: 'Nombre y email son obligatorios' });
    }
    next();
}

export { comprobarId, validarAutor };