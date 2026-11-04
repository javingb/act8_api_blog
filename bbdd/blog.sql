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
('Marta Sánchez', 'marta.sanchez@blog.com', 'https://i.pravatar.cc/300?img=32');

INSERT INTO post (titulo, descripcion, categoria, autor_id) VALUES
('Primeros pasos con Node.js', 'Qué es Node.js y cómo ejecutar nuestro primer script.', 'Backend', 1),
('Creando una API con Express', 'Montamos un servidor y definimos rutas GET y POST.', 'Backend', 1),
('Relaciones en MySQL', 'Claves foráneas y cómo usar JOIN para unir tablas.', 'Bases de datos', 2),
('Flexbox vs Grid', 'Cuándo usar cada uno para maquetar.', 'Frontend', 3);