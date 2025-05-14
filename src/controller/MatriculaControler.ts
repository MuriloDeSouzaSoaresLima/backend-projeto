import { Matricula } from "../model/Matricula";
import { Request, Response } from "express";

interface MatriculaDTO {
    id_aluno: number;
    id_curso: number;
    data_matricula: Date;
}

class MatriculaController extends Matricula {
    static async todos(req: Request, res: Response) {
        try {
            const lista = await Matricula.listarMatriculas();
            res.status(200).json(lista);
        } catch (error) {
            console.error("Erro ao buscar matrículas:", error);
            res.status(400).json("Erro ao buscar matrículas");
        }
    }

    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            const dados: MatriculaDTO = req.body;

            const novaMatricula = new Matricula(
                dados.id_aluno,
                dados.id_curso,
                new Date(dados.data_matricula)
            );

            const result = await Matricula.cadastrarMatricula(novaMatricula);
            if (result) {
                return res.status(200).json("Matrícula cadastrada com sucesso");
            } else {
                return res.status(400).json("Não foi possível cadastrar a matrícula");
            }
        } catch (error) {
            console.error("Erro ao cadastrar matrícula:", error);
            return res.status(500).json("Erro interno ao cadastrar matrícula");
        }
    }

    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const id = parseInt(req.query.idMatricula as string);
            const result = await Matricula.removerMatricula(id);
            if (result) {
                return res.status(200).json("Matrícula removida com sucesso");
            } else {
                return res.status(400).json("Erro ao remover matrícula");
            }
        } catch (error) {
            console.error("Erro ao remover matrícula:", error);
            return res.status(500).json("Erro interno ao remover matrícula");
        }
    }

    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const dados: MatriculaDTO = req.body;
            const id = parseInt(req.query.idMatricula as string);

            const matricula = new Matricula(
                dados.id_aluno,
                dados.id_curso,
                new Date(dados.data_matricula)
            );
            matricula.setIdMatricula(id);

            const result = await Matricula.atualizarMatricula(matricula);
            if (result) {
                return res.status(200).json("Matrícula atualizada com sucesso");
            } else {
                return res.status(400).json("Não foi possível atualizar a matrícula");
            }
        } catch (error) {
            console.error("Erro ao atualizar matrícula:", error);
            return res.status(500).json("Erro interno ao atualizar matrícula");
        }
    }
}

export default MatriculaController;
