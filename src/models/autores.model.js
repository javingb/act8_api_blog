import db from "../config/db.js";

/**
 * Recupera todos los autores.
 * @returns {Promise<Autor[]>} Array con todos los autores.
 */
const selectAll = async () => {
    const [resultado] = await db.execute('SELECT * FROM autor');
    return resultado;
}

/**
 * Recupera un autor por su id.
 * @param {number|string} id - Id del autor.
 * @returns {Promise<Autor|null>} El autor, o null si no existe.
 */
const selectById = async (id) => {
    const [resultado] = await db.execute('SELECT * FROM autor WHERE id = ?', [id]);
    if (resultado.length === 0) {
        return null;
    }
    return resultado[0];
}

/**
 * Inserta un nuevo autor en la base de datos.
 * @param {Object} autor - Datos del autor.
 * @param {string} autor.nombre - Nombre del autor.
 * @param {string} autor.email - Email del autor.
 * @param {string} [autor.imagen] - URL de la imagen (opcional).
 * @returns {Promise<Object>} Resultado del INSERT (incluye insertId).
 */
const insert = async ({nombre, email, imagen}) => {
    const [resultado] = await db.execute(
        'INSERT INTO autor (nombre, email, imagen) VALUES (?, ?, ?)',
        [nombre, email, imagen ?? null]
    );
    return resultado;
}

export { selectAll, selectById, insert };