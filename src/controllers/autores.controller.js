
const getAll = async (req, res) => { 
    const autores = await selectAll();
    res.json(autores);
}

const getById = async (req, res) => {
    res.json(req.autor);
}

const create = async (req, res) => {
    try {
        const result = await insert(req.body);
        const autor = await selectById(result.insertId);
        res.status(201).json(autor);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: 'Duplicate entry' });
        }
        throw error;
    }
}

export { getAll, getById, create };