CREATE TABLE aluno(
    id_aluno SERIAL PRIMARY KEY,
    nome_aluno VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    status_aluno BOOLEAN NOT NULL
);

CREATE TABLE curso(
    id_curso SERIAL PRIMARY KEY,
    nome_curso VARCHAR(100) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    carga VARCHAR(5) NOT NULL,
    dia_curso VARCHAR (100) NOT NULL,
    hora VARCHAR(5) NOT NULL,
    status_curso BOOLEAN NOT NULL
);

CREATE TABLE matricula(
    id_matricula SERIAL PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_curso INT NOT NULL,
    data_matricula DATE NOT NULL,
    status_matricula BOOLEAN NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
);

INSERT INTO aluno (nome_aluno, data_nascimento, email, senha, status_aluno) VALUES
('Ana Paula Silva', '2002-03-15', 'ana.silva@email.com', 'senha123', TRUE),
('Bruno Oliveira', '2001-11-22', 'bruno.oliveira@email.com', 'senha456', TRUE),
('Carla Mendes', '2003-07-09', 'carla.mendes@email.com', 'senha789', TRUE),
('Diego Santos', '2000-05-30', 'diego.santos@email.com', 'minhasenha', TRUE),
('Eduarda Lima', '2002-12-05', 'eduarda.lima@email.com', '1234senha', TRUE);

INSERT INTO curso (nome_curso, data_inicio, data_fim, carga, dia_curso, hora, status_curso) VALUES
('Desenvolvimento Web', '2025-02-01', '2025-08-01', '300h', 'Segunda a Sexta', '13h30', TRUE),
('Banco de Dados', '2025-03-15', '2025-09-15', '250h', 'Terças e Quintas', '19h00', TRUE),
('Lógica de Programação', '2025-01-10', '2025-06-10', '200h', 'Segundas e Quartas', '18h00', TRUE),
('Redes de Computadores', '2025-04-05', '2025-10-05', '180h', 'Sábados', '08h00', TRUE),
('Inteligência Artificial', '2025-05-01', '2025-11-01', '300h', 'Segunda a Sexta', '14h00', TRUE);


INSERT INTO matricula (id_aluno, id_curso, data_matricula, status_matricula) VALUES
(1, 1, '2025-05-10', TRUE),
(2, 2, '2025-05-11', TRUE),
(3, 3, '2025-05-12', TRUE),
(4, 4, '2025-05-13', TRUE),
(5, 5, '2025-05-14', TRUE);