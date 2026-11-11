import db from "../config/db.js";

/**
 * Query base para recuperar posts junto con los datos de su autor (JOIN).
 * Las columnas del autor llevan alias (autor_nombre...) para no chocar con las del post.
 * @type {string}
 */
const SELECT_POSTS = ` SELECT p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria, 
        a.id AS autor_id, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
        FROM post p INNER JOIN autor a ON p.autor_id = a.id
`;

/**
 * Convierte una fila plana de la query en un post con el autor anidado.
 * @param {Object} fila - Fila devuelta por MySQL (columnas del post + columnas del autor con alias).
 * @returns {Post} Post con los datos del autor en la propiedad "autor".
 */
const formatearPost = (fila) => {
    return {
        id: fila.id,
        titulo: fila.titulo,
        descripcion: fila.descripcion,
        fecha_creacion: fila.fecha_creacion,
        categoria: fila.categoria,
        autor: {
            id: fila.autor_id,
            nombre: fila.autor_nombre,
            email: fila.autor_email,
            imagen: fila.autor_imagen
        }
    };
}

/**
 * Recupera todos los posts con su autor, del más reciente al más antiguo.
 * @returns {Promise<Post[]>} Array con todos los posts.
 */
const selectAll = async () => {
    const [resultado] = await db.execute(`${SELECT_POSTS} ORDER BY p.fecha_creacion DESC`);
    return resultado.map(formatearPost);
}

/**
 * Recupera un post con su autor a partir de su id.
 * @param {number|string} id - Id del post.
 * @returns {Promise<Post|null>} El post, o null si no existe.
 */
const selectById = async (id) => {
    const [resultado] = await db.execute(`${SELECT_POSTS} WHERE p.id = ?`, [id]);
    if (resultado.length === 0) {
        return null;
    }   
    return formatearPost(resultado[0]);
}

/**
 * Inserta un nuevo post en la base de datos. La fecha_creacion la rellena MySQL.
 * @param {Object} post - Datos del post.
 * @param {string} post.titulo - Título del post.
 * @param {string} post.descripcion - Contenido del post.
 * @param {string} post.categoria - Categoría del post.
 * @param {number} post.autor_id - Id del autor del post.
 * @returns {Promise<Object>} Resultado del INSERT (incluye insertId).
 */
const insert = async ({titulo, descripcion, categoria, autor_id}) => {
    const [resultado] = await db.execute(
        'INSERT INTO post (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)', [titulo, descripcion, categoria, autor_id]
    );
    return resultado;
}

/**
 * Recupera todos los posts de un autor con sus datos, del más reciente al más antiguo.
 * @param {number|string} autor_id - Id del autor.
 * @returns {Promise<Post[]>} Array con los posts del autor (vacío si no tiene).
 */
const selectByAutorId = async (autor_id) => {
    const [resultado] = await db.execute(`${SELECT_POSTS} WHERE p.autor_id = ? ORDER BY p.fecha_creacion DESC`, [autor_id]);
    return resultado.map(formatearPost);
}

export { selectAll, selectById, insert, selectByAutorId };