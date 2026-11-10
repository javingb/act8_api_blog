import { selectAll, selectById, insert } from "../models/posts.model.js";

const getAll = async (req, res) => {
    const posts = await selectAll();
    res.json(posts);
}

const getById = async (req, res) => {
    res.json(req.post);
}

const create = async (req, res) => {
        const result = await insert(req.body);
        const post = await selectById(result.insertId);
        res.status(201).json(post);
}

export { getAll, getById, create };