import { Curso } from "../model/Curso";
import { Request, Response } from "express";

/**
 * Interface CursoDTO
 * Define os atributos que devem ser recebidos do cliente nas requisições
 */
interface CursoDTO {
    nome_curso: string; // Título do Curso
    carga: string; // Curso do Curso
    dia_curso: string; // dia_curso do Curso
    hora: string; // Ano de publicação do Curso
    data_inicio?: Date; // ISBN do Curso
    data_fim?: Date; // Quantidade total daquele exemplar

}

/**
 * Controlador para operações relacionadas aos Cursos.
*/
class CursoController extends Curso {
    /**
     * Lista todos os Cursos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de Cursos em formato JSON.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDeCursos = await Curso.listarCursos();

            res.status(200).json(listaDeCursos);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            res.status(400).json("Erro ao recuperar as informações do Curso");
        }
    }

    /**
     * Cadastra um novo curso.
     * @param req Objeto de requisição HTTP com os dados do aluno.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: CursoDTO = req.body;

            // Instanciando objeto Curso
            const novoCurso = new Curso(
                dadosRecebidos.nome_curso,
                dadosRecebidos.carga,
                dadosRecebidos.dia_curso,
                dadosRecebidos.hora,
                dadosRecebidos.data_inicio ?? new Date("1900-01-01"),
                dadosRecebidos.data_fim ?? new Date("1900-01-01")
            );

            // Chama o método para persistir o curso no banco de dados
            const result = await Curso.cadastrarCurso(novoCurso);

            // Verifica se a query foi executada com sucesso
            if (result) {
                return res.status(200).json(`Curso cadastrado com sucesso`);
            } else {
                return res.status(400).json('Não foi possível cadastrar o curso no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o curso: ${error}`);
            return res.status(400).json('Erro ao cadastrar o curso');
        }
    }

    /**
    * Remove um aluno.
    * @param req Objeto de requisição HTTP com o ID do aluno a ser removido.
    * @param res Objeto de resposta HTTP.
    * @returns Mensagem de sucesso ou erro em formato JSON.
    */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idCurso = parseInt(req.query.idCurso as string);
            const result = await Curso.removerCurso(idCurso);

            if (result) {
                return res.status(200).json('Curso removido com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar curso');
            }
        } catch (error) {
            console.log("Erro ao remover o Curso");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    /**
     * Método para atualizar o cadastro de um curso.
     * 
     * @param req Objeto de requisição do Express, contendo os dados atualizados do aluno
     * @param res Objeto de resposta do Express
     * @returns Retorna uma resposta HTTP indicando sucesso ou falha na atualização
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: CursoDTO = req.body;

            // Cria uma nova instância de Curso com os dados atualizados
            const curso = new Curso(
                dadosRecebidos.nome_curso,
                dadosRecebidos.carga,
                dadosRecebidos.dia_curso,
                dadosRecebidos.hora,
                dadosRecebidos.data_inicio ?? new Date("1900-01-01"),
                dadosRecebidos.data_fim ?? new Date("1900-01-01")
            );

            // Define o ID do curso, que deve ser passado na query string
            curso.setIdCurso(parseInt(req.query.idCurso as string));

            // Chama o método para atualizar o cadastro do curso no banco de dados
            if (await Curso.atualizarCurso(curso)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar o curso no banco de dados');
            }
        } catch (error) {
            // Caso ocorra algum erro, este é registrado nos logs do servidor
            console.error(`Erro no modelo: ${error}`);
            // Retorna uma resposta com uma mensagem de erro
            return res.json({ mensagem: "Erro ao atualizar aluno." });
        }
    }
}

export default CursoController;


