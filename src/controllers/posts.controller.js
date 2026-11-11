import { selectAll, selectById, insert } from "../models/posts.model.js";

/**
 * GET /api/posts
 * Recupera todos los posts con los datos completos de su autor.
 * @param {import('express').Request} req - Petición de Express.
 * @param {import('express').Response} res - Respuesta de Express.
 * @returns {Promise<void>} Responde con un array de posts (200).
 */
const getAll = async (req, res) => {
    const posts = await selectAll();
    res.json(posts);
}

/**
 * GET /api/posts/:idPost
 * Devuelve un único post con su autor. El middleware existePost ya lo ha recuperado y guardado en req.post.
 * @param {import('express').Request} req - Petición de Express (incluye req.post).
 * @param {import('express').Response} res - Respuesta de Express.
 * @returns {Promise<void>} Responde con el objeto del post (200).
 */
const getById = async (req, res) => {
    res.json(req.post);
}

/**
 * POST /api/posts
 * Crea un nuevo post con los datos del body y lo devuelve con los datos de su autor.
 * @param {import('express').Request} req - Petición de Express. Body: titulo, descripcion, categoria, autor_id.
 * @param {import('express').Response} res - Respuesta de Express.
 * @returns {Promise<void>} Responde con el post creado (201).
 */
const create = async (req, res) => {
        const result = await insert(req.body);
        const post = await selectById(result.insertId);
        res.status(201).json(post);
}

export { getAll, getById, create };