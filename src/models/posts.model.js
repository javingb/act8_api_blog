import db from "../config/db.js";

const SELECT_POSTS = ` SELECT p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria, 
        a.id AS autor_id, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
        FROM post p INNER JOIN autor a ON p.autor_id = a.id
`;

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

const selectAll = async () => {
    const [resultado] = await db.execute(`${SELECT_POSTS} ORDER BY p.fecha_creacion DESC`);
    return resultado.map(formatearPost);
}

const selectById = async (id) => {
    const [resultado] = await db.execute(`${SELECT_POSTS} WHERE p.id = ?`, [id]);
    if (resultado.length === 0) {
        return null;
    }   
    return formatearPost(resultado[0]);
}

const insert = async ({titulo, descripcion, categoria, autor_id}) => {
    const [resultado] = await db.execute(
        'INSERT INTO post (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)', [titulo, descripcion, categoria, autor_id]
    );
    return resultado;
}

export { selectAll, selectById, insert };