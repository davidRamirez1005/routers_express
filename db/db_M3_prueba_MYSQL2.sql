CREATE DATABASE db_M3_prueba_MYSQL2_node_joseDavid;


USE db_M3_prueba_MYSQL2_node_joseDavid;

CREATE TABLE tb_usuarios_M3(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom_com VARCHAR(30) NOT NULL,
    edad INTEGER NOT NULL
);

CREATE TABLE tb_mascota(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom_com VARCHAR(30) NOT NULL,
    raza VARCHAR(10) NOT NULL,
    edad INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios_M3(id)
);

CREATE TABLE tb_carros(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(30) NOT NULL,
    modelo VARCHAR(30) NOT NULL,
    anio INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios_M3(id)
);

CREATE VIEW vw_cliente_mascota_carro AS
SELECT u.nom_com AS cliente, m.nom_com AS mascota, c.marca AS carro
FROM tb_usuarios_M3 u
LEFT JOIN tb_mascota m ON u.id = m.id_usuario
LEFT JOIN tb_carros c ON u.id = c.id_usuario;


-- Insertar datos en tb_usuarios_M3
INSERT INTO tb_usuarios_M3 (nom_com, edad) VALUES ('Usuario 1', 25);
INSERT INTO tb_usuarios_M3 (nom_com, edad) VALUES ('Usuario 2', 30);
INSERT INTO tb_usuarios_M3 (nom_com, edad) VALUES ('Usuario 3', 35);
INSERT INTO tb_usuarios_M3 (nom_com, edad) VALUES ('Usuario 4', 40);

-- Insertar datos en tb_mascota (relacionado con algunos usuarios)
INSERT INTO tb_mascota (nom_com, raza, edad, id_usuario) VALUES ('Mascota 1', 'Raza 1', 3, 1);
INSERT INTO tb_mascota (nom_com, raza, edad, id_usuario) VALUES ('Mascota 2', 'Raza 2', 4, 1);
INSERT INTO tb_mascota (nom_com, raza, edad, id_usuario) VALUES ('Mascota 3', 'Raza 3', 2, 3);
INSERT INTO tb_mascota (nom_com, raza, edad, id_usuario) VALUES ('Mascota 3', 'Raza 3', 2, 5);

-- Insertar datos en tb_carros (relacionado con algunos usuarios)
INSERT INTO tb_carros (marca, modelo, anio, id_usuario) VALUES ('Marca 1', 'Modelo 1', 2018, 2);
INSERT INTO tb_carros (marca, modelo, anio, id_usuario) VALUES ('Marca 2', 'Modelo 2', 2020, 4);
INSERT INTO tb_carros (marca, modelo, anio, id_usuario) VALUES ('Marca 3', 'Modelo 3', 2020, 21);