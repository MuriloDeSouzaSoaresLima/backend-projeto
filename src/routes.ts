import express from "express";
import { SERVER_ROUTES } from "./appConfig";
import AlunoController from "./controller/AlunoControler";
import Curso from "./controller/CursoControler
import Matricula from "./controller/MatriculaControler";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensagem: "Rota padrão" })
});

// CRUD Aluno
router.get(SERVER_ROUTES.LISTAR_ALUNOS, AlunoController.todos);
router.post(SERVER_ROUTES.NOVO_ALUNO, AlunoController.cadastrar);
router.put(SERVER_ROUTES.REMOVER_ALUNO, AlunoController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_ALUNO, AlunoController.atualizar);

//CRUD Livro
router.get(SERVER_ROUTES.LISTAR_CURSOS, Curso.todos);
router.post(SERVER_ROUTES.NOVO_CURSO, Curso.cadastrar);
router.put(SERVER_ROUTES.REMOVER_CURSO, Curso.remover);
router.put(SERVER_ROUTES.ATUALIZAR_CURSO, Curso.atualizar);

//CRUD Emprestimo
router.get(SERVER_ROUTES.LISTAR_MATRICULA, Matricula.todos);
router.post(SERVER_ROUTES.NOVO_MATRICULA, Matricula.cadastrar);
router.put(SERVER_ROUTES.ATUALIZAR_MATRICULA, Matricula.atualizar);
router.put(SERVER_ROUTES.REMOVER_ALUNO.MATRICULA, Matricula.remover);

export { router }