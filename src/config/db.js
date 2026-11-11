import { createPool } from "mysql2/promise";

/**
 * Pool de conexiones con MySQL.
 * Los datos de conexión se leen de las variables de entorno del fichero .env.
 */
const pool = createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

export default pool;