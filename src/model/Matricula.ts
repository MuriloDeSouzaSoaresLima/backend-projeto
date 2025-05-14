import { DatabaseModel } from "./DatabaseModel";

// Recupera conexão com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa uma Matrícula no sistema
 */
export class Matricula {
    private id_matricula: number = 0;
    private id_aluno: number;
    private id_curso: number;
    private data_matricula: Date;
    private status_matricula: boolean = true;

    constructor(_id_aluno: number, _id_curso: number, _data_matricula: Date) {
        this.id_aluno = _id_aluno;
        this.id_curso = _id_curso;
        this.data_matricula = _data_matricula;
    }

    public getIdMatricula(): number {
        return this.id_matricula;
    }

    public setIdMatricula(_id: number): void {
        this.id_matricula = _id;
    }

    public getIdAluno(): number {
        return this.id_aluno;
    }

    public setIdAluno(_id: number): void {
        this.id_aluno = _id;
    }

    public getIdCurso(): number {
        return this.id_curso;
    }

    public setIdCurso(_id: number): void {
        this.id_curso = _id;
    }

    public getDataMatricula(): Date {
        return this.data_matricula;
    }

    public setDataMatricula(_data: Date): void {
        this.data_matricula = _data;
    }

    public getStatusMatricula(): boolean {
        return this.status_matricula;
    }

    public setStatusMatricula(_status: boolean): void {
        this.status_matricula = _status;
    }

    // MÉTODOS DE ACESSO AO BANCO DE DADOS
    // CRUD - Create, Read, Update, Delete

    /**
     * Retorna uma lista com todas as matrículas ativas no banco de dados
     * 
     * @returns Lista de matrículas ativas ou null em caso de erro
     */
    static async listarMatriculas(): Promise<Array<Matricula> | null> {
        let listaDeMatriculas: Array<Matricula> = [];

        try {
            const querySelectMatricula = `SELECT * FROM matricula WHERE status_matricula = TRUE;`;

            const respostaBD = await database.query(querySelectMatricula);

            respostaBD.rows.forEach((m) => {
                let novaMatricula = new Matricula(m.id_aluno, m.id_curso, m.data_matricula);
                novaMatricula.setIdMatricula(m.id_matricula);
                novaMatricula.setStatusMatricula(m.status_matricula);

                listaDeMatriculas.push(novaMatricula);
            });

            return listaDeMatriculas;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

    /**
     * Cadastra uma nova matrícula no banco de dados
     * 
     * @param Matricula Objeto Matricula contendo os dados a serem cadastrados
     * @returns Boolean indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarMatricula(Matricula: Matricula): Promise<Boolean> {
        let insertResult = false;

        try {
            const queryInsertMatricula = `
                INSERT INTO matricula (id_aluno, id_curso, data_matricula, status_matricula)
                VALUES (
                    ${Matricula.getIdAluno()},
                    ${Matricula.getIdCurso()},
                    '${Matricula.getDataMatricula().toISOString().split("T")[0]}',
                    TRUE
                )
                RETURNING id_matricula;
            `;

            const result = await database.query(queryInsertMatricula);

            if (result.rows.length > 0) {
                console.log(`Matrícula cadastrada com sucesso. ID: ${result.rows[0].id_matricula}`);
                insertResult = true;
            }

            return insertResult;
        } catch (error) {
            console.error(`Erro ao cadastrar matrícula: ${error}`);
            return insertResult;
        }
    }

    /**
     * Remove (inativa) uma matrícula do banco de dados
     * 
     * @param id_matricula ID da matrícula a ser removida
     * @returns Boolean indicando se a remoção foi bem-sucedida
     */
    static async removerMatricula(id_matricula: number): Promise<Boolean> {
        let queryResult = false;

        try {
            const queryDeleteMatricula = `UPDATE matricula SET status_matricula = FALSE WHERE id_matricula = ${id_matricula}`;

            await database.query(queryDeleteMatricula)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                });

            return queryResult;
        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }

    /**
     * Atualiza os dados de uma matrícula no banco de dados
     * 
     * @param Matricula Objeto Matricula com os dados atualizados
     * @returns Boolean indicando se a atualização foi bem-sucedida
     */
    static async atualizarMatricula(Matricula: Matricula): Promise<Boolean> {
        let queryResult = false;

        try {
            const queryAtualizarMatricula = `UPDATE matricula SET 
                                                id_aluno = ${Matricula.getIdAluno()},
                                                id_curso = ${Matricula.getIdCurso()},
                                                data_matricula = '${Matricula.getDataMatricula().toISOString().split("T")[0]}'
                                            WHERE id_matricula = ${Matricula.getIdMatricula()}`;

            await database.query(queryAtualizarMatricula)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                });

            return queryResult;
        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}
