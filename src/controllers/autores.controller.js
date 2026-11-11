import { insert, selectAll, selectById } from "../models/autores.model.js";
import { selectByAutorId } from "../models/posts.model.js";

/**
 * GET /api/autores
 * Recupera todos los autores de la base de datos.
 * @param {import('express').Request} req - Petición de Express.
 * @param {import('express').Response} res - Respuesta de Express.
 * @returns {Promise<void>} Responde con un array de autores (200).
 */
const getAll = async (req, res) => { 
    const autores = await selectAll();
    res.json(autores);
}

/**
 * GET /api/autores/:idAutor
 * Devuelve un único autor. El middleware comprobarId ya lo ha recuperado y guardado en req.autor.
 * @param {import('express').Request} req - Petición de Express (incluye req.autor).
 * @param {import('express').Response} res - Respuesta de Express.
 * @returns {Promise<void>} Responde con el objeto del autor (200).
 */
const getById = async (req, res) => {
    res.json(req.autor);
}

/**
 * POST /api/autores
 * Crea un nuevo autor con los datos del body y lo devuelve.
 * @param {import('express').Request} req - Petición de Express. Body: nombre, email, imagen (opcional).
 * @param {import('express').Response} res - Respuesta de Express.
 * @returns {Promise<void>} Responde con el autor creado (201) o con un error si el email ya existe (400).
 * @throws {Error} Relanza cualquier error distinto de ER_DUP_ENTRY para que lo gestione el error handler.
 */
const create = async (req, res) => {
    try {
        const result = await insert(req.body);
        const autor = await selectById(result.insertId);
        res.status(201).json(autor);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }
        throw error;
    }
}

/**
 * GET /api/autores/:idAutor/posts
 * Recupera todos los posts escritos por el autor indicado en la URL.
 * @param {import('express').Request} req - Petición de Express. Params: idAutor.
 * @param {import('express').Response} res - Respuesta de Express.
 * @returns {Promise<void>} Responde con un array de posts, cada uno con su autor (200). Array vacío si no tiene posts.
 */
const getPosts = async (req, res) => {
    const { idAutor } = req.params;
    const posts = await selectByAutorId(idAutor);
    res.json(posts);
}

export { getAll, getById, create, getPosts };