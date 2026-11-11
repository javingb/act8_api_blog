# API Blog - Actividad 8

API REST desarrollada con **Express** y **MySQL** para gestionar los **posts** de un blog y los **autores** que los escriben.

## Instalación

1. Instalar las dependencias:

```bash
pnpm install
```

2. Crear la base de datos ejecutando el fichero `bbdd/blog.sql`. Crea la base de datos `blog`, las tablas `autor` y `post` y datos de prueba.

3. Crear el fichero `.env` a partir de `.env.example` y rellenar los datos de conexión:

```
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
DB_NAME=blog
```

4. Arrancar el servidor:

```bash
pnpm dev
```

Las peticiones de prueba están en el fichero `requests.http` (extensión REST Client de VS Code).

## Base de datos

- **autor**: id, nombre, email (único), imagen
- **post**: id, titulo, descripcion, fecha_creacion, categoria, autor_id (clave externa a `autor.id`) 