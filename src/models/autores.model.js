import db from "../config/db.js";

const selectAll = async () => {
    const [resultado] = await db.execute('SELECT * FROM autor');
    return resultado;
}

const selectById = async (id) => {
    const [resultado] = await db.execute('SELECT * FROM autor WHERE id = ?', [id]);
    if (resultado.length === 0) {
        throw new Error('Autor not found');
    }
    return resultado[0];
}

const insert = async ({nombre, email, imagen}) => {
    const [resultado] = await db.execute(
        'INSERT INTO autor (nombre, email, imagen) VALUES (?, ?, ?)',
        [nombre, email, imagen ?? null]
    );
    return resultado;
}

export { selectAll, selectById, insert };