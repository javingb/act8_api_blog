SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS blog;
USE blog;

DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS autor;

CREATE TABLE autor (
      id      INT AUTO_INCREMENT PRIMARY KEY,
      nombre  VARCHAR(100) NOT NULL,
      email   VARCHAR(100) NOT NULL UNIQUE,
      imagen  VARCHAR(255)
   );
   
CREATE TABLE post (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      descripcion TEXT NOT NULL,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      categoria VARCHAR(100) NOT NULL,
      autor_id INT NOT NULL,
      FOREIGN KEY (autor_id) REFERENCES autor(id)
         ON DELETE CASCADE
         ON UPDATE CASCADE
);

INSERT INTO autor (nombre, email, imagen) VALUES
('Laura Martín', 'laura.martin@blog.com', 'https://i.pravatar.cc/300?img=47'),
('Carlos Ruiz', 'carlos.ruiz@blog.com', 'https://i.pravatar.cc/300?img=12'),
('Marta Sánchez', 'marta.sanchez@blog.com', 'https://i.pravatar.cc/300?img=32'),
('David López', 'david.lopez@blog.com', 'https://i.pravatar.cc/300?img=68'),
('Lucía Fernández', 'lucia.fernandez@blog.com', NULL);

INSERT INTO post (titulo, descripcion, fecha_creacion, categoria, autor_id) VALUES
('Primeros pasos con Node.js', 'Qué es Node.js y cómo ejecutar nuestro primer script.', '2026-09-15 10:30:00', 'Backend', 1),
('Creando una API con Express', 'Montamos un servidor y definimos rutas GET y POST.', '2026-09-22 18:00:00', 'Backend', 1),
('Relaciones en MySQL', 'Claves foráneas y cómo usar JOIN para unir tablas.', '2026-10-01 09:15:00', 'Bases de datos', 2),
('Flexbox vs Grid', 'Cuándo usar cada uno para maquetar.', '2026-10-05 12:45:00', 'Frontend', 3),
('Introducción a Angular', 'Componentes, servicios y rutas: los pilares de una aplicación Angular.', '2026-10-08 16:20:00', 'Frontend', 3),
('Variables de entorno en Node', 'Cómo usar ficheros .env para no subir contraseñas al repositorio.', '2026-10-12 11:00:00', 'Backend', 2),
('Git para principiantes', 'Los comandos básicos: init, add, commit, push y pull.', '2026-10-15 19:30:00', 'Herramientas', 4),
('Middlewares en Express', 'Qué son los middlewares y cómo usarlos para validar peticiones.', '2026-10-20 10:00:00', 'Backend', 1),
('Normalización de bases de datos', 'Primera, segunda y tercera forma normal explicadas con ejemplos.', '2026-10-24 17:45:00', 'Bases de datos', 2),
('Ramas en Git', 'Cómo trabajar con ramas, hacer merge y resolver conflictos.', '2026-10-29 09:30:00', 'Herramientas', 4),
('Diseño responsive con media queries', 'Adaptar una web a móvil, tablet y escritorio.', '2026-11-03 13:10:00', 'Frontend', 3),
('Códigos de estado HTTP', 'Qué significan 200, 201, 400, 404 y 500 y cuándo usar cada uno.', '2026-11-07 12:00:00', 'Backend', 1);