import { DatabaseModel } from "./DatabaseModel";

// Recupera conexão com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa uma Matrícula no sistema
 */
export class Matricula {
    private id_matricula: number = 0; // Identificador único da Matrícula
    private id_aluno: number; // Identificador do Aluno
    private id_curso: number; // Identificador do Curso
    private data_matricula: Date; // Data da Matrícula
    private status_matricula: boolean = true; // Status da Matrícula no sistema

    /**
     * Construtor da classe Matricula
     * 
     * @param id_aluno Identificador do Aluno
     * @param id_curso Identificador do Curso
     * @param data_matricula Data da Matrícula
     */
    public constructor(_id_aluno: number, _id_curso: number, _data_matricula: Date) {
        this.id_aluno = _id_aluno;
        this.id_curso = _id_curso;
        this.data_matricula = _data_matricula;
    }

    // GETTERS e SETTERS

    /**
     * Retorna o id da Matrícula
     * @returns id_matricula
     */
    public getIdMatricula(): number {
        return this.id_matricula;
    }

    /**
     * Atribui o parâmetro ao atributo id_matricula
     * @param _id_matricula
     */
    public setIdMatricula(_id_matricula: number): void {
        this.id_matricula = _id_matricula;
    }

    /**
     * Retorna o id do Aluno
     * @returns id_aluno
     */
    public getIdAluno(): number {
        return this.id_aluno;
    }

    /**
     * Atribui o parâmetro ao atributo id_aluno
     * @param _id_aluno
     */
    public setIdAluno(_id_aluno: number): void {
        this.id_aluno = _id_aluno;
    }

    /**
     * Retorna o id do Curso
     * @returns id_curso
     */
    public getIdCurso(): number {
        return this.id_curso;
    }

    /**
     * Atribui o parâmetro ao atributo id_curso
     * @param _id_curso
     */
    public setIdCurso(_id_curso: number): void {
        this.id_curso = _id_curso;
    }

    /**
     * Retorna a data da matrícula
     * @returns data_matricula
     */
    public getDataMatricula(): Date {
        return this.data_matricula;
    }

    /**
     * Atribui o parâmetro ao atributo data_matricula
     * @param _data_matricula
     */
    public setDataMatricula(_data_matricula: Date): void {
        this.data_matricula = _data_matricula;
    }

    /**
     * Retorna o status da matrícula no sistema
     * @returns status_matricula
     */
    public getStatusMatricula(): boolean {
        return this.status_matricula;
    }

    /**
     * Atribui o parâmetro ao atributo status_matricula
     * @param _status_matricula
     */
    public setStatusMatricula(_status_matricula: boolean): void {
        this.status_matricula = _status_matricula;
    }

    // MÉTODOS PARA ACESSO AO BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    /**
     * Retorna uma lista com todas as matrículas ativas no banco de dados
     * 
     * @returns Lista com todas as matrículas ativas
     */
    static async listarMatriculas(): Promise<Array<Matricula> | null> {
        let listaDeMatriculas: Array<Matricula> = [];

        try {
            const querySelect = `SELECT * FROM matricula WHERE status_matricula = TRUE;`;
            const respostaBD = await database.query(querySelect);

            respostaBD.rows.forEach((m: any) => {
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
     * @param matricula Objeto Matricula com os dados a serem cadastrados
     * @returns Boolean indicando sucesso ou fracasso
     */
    static async cadastrarMatricula(matricula: Matricula): Promise<boolean> {
        let insertResult = false;

        try {
            const queryInsert = `
                INSERT INTO matricula (id_aluno, id_curso, data_matricula, status_matricula)
                VALUES (
                    ${matricula.getIdAluno()},
                    ${matricula.getIdCurso()},
                    '${matricula.getDataMatricula().toISOString().split('T')[0]}',
                    TRUE
                )
                RETURNING id_matricula;`;

            const result = await database.query(queryInsert);

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
     * Remove (inativa) uma matrícula no banco de dados
     * @param id_matricula ID da matrícula a ser removida
     * @returns Boolean indicando sucesso ou fracasso
     */
    static async removerMatricula(id_matricula: number): Promise<boolean> {
        let queryResult = false;

        try {
            const queryDelete = `UPDATE matricula SET status_matricula = FALSE WHERE id_matricula = ${id_matricula};`;

            await database.query(queryDelete).then((result) => {
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
     * @param matricula Objeto Matricula com os dados atualizados
     * @returns Boolean indicando sucesso ou fracasso
     */
    static async atualizarMatricula(matricula: Matricula): Promise<boolean> {
        let queryResult = false;

        try {
            const queryUpdate = `
                UPDATE matricula SET 
                    id_aluno = ${matricula.getIdAluno()},
                    id_curso = ${matricula.getIdCurso()},
                    data_matricula = '${matricula.getDataMatricula().toISOString().split('T')[0]}'
                WHERE id_matricula = ${matricula.id_matricula};`;

            await database.query(queryUpdate).then((result) => {
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
