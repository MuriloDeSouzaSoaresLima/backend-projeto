import { DatabaseModel } from "./DatabaseModel";

// Recupera conexão com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa um Curso no sistema
 */
export class Curso {
    private id_curso: number = 0; // Identificador único do Curso
    private nome_curso: string; // Título do Curso
    private carga: string; // Curso do Curso
    private dia_curso: string; // Editora do Curso
    private hora: string; // Ano de publicação do Curso
    private data_inicio: Date; // ISBN do Curso
    private data_fim: Date; // Quantidade total daquele exemplar
    private status_curso: boolean = true; // Status do Curso no sistema

    /**
    * Construtor da classe Curso
    * 
    * @param nome_curso Título do Curso
    * @param carga Curso do Curso
    * @param dia_curso Editora do Curso
    * @param hora Ano de publicação do Curso
    * @param data_inicio ISBN do Curso
    */
    public constructor(_nome_curso: string, _carga: string, _dia_curso: string, _hora: string,
        _data_inicio: Date, _data_fim: Date) {

        this.nome_curso = _nome_curso;
        this.carga = _carga;
        this.dia_curso = _dia_curso;
        this.hora = _hora;
        this.data_inicio = _data_inicio;
        this.data_fim = _data_fim;
    }

    //métodos GETTERS and SETTERS
    /**
     * Retorna o id do Curso
     * @returns id: id_curso
     */
    public getIdCurso(): number {
        return this.id_curso;
    }

    /**
     * Atribui o parâmetro ao atributo idAluno
     * 
     * @param _idCurso : id_curso
     */
    public setIdCurso(_idCurso: number): void {
        this.id_curso = _idCurso;
    }

    /**
    * Retorna o nome_curso do Curso
    * @returns nome_curso: _nome_curso
    */
    public getNomeCurso(): string {
        return this.nome_curso;
    }

    /**
     * Atribui o parâmetro ao atributo nome_curso
     * 
     * @param _nome_curso : nome_curso
     */
    public setNomeCurso(_nome_curso: string): void {
        this.nome_curso = _nome_curso;
    }

    /**
    * Retorna o carga do Curso
    * @returns carga: _carga
    */
    public getCarga(): string {
        return this.carga;
    }

    /**
     * Atribui o parâmetro ao atributo carga
     * 
     * @param _carga : carga
     */
    public setCarga(_carga: string): void {
        this.carga = _carga;
    }

    /**
    * Retorna a dia_curso do Curso
    * @returns dia_curso: _dia_curso
    */
    public getDiaCurso(): string {
        return this.dia_curso;
    }

    /**
     * Atribui o parâmetro ao atributo dia_curso
     * 
     * @param _dia_curso : dia_curso
     */
    public setDiaCurso(_dia_curso: string): void {
        this.dia_curso = _dia_curso;
    }

    /**
    * Retorna o ano de publicação do Curso
    * @returns hora: _hora
    */
    public getHora(): string {
        return this.hora;
    }

    /**
     * Atribui o parâmetro ao ano de publicação nome_curso
     * 
     * @param _hora : hora
     */
    public setHora(_hora: string): void {
        this.hora = _hora;
    }

    /**
     * Retorna o ISBN do Curso
     * @returns data_inicio: _data_inicio
     */
    public getDataInicio(): Date {
        return this.data_inicio;
    }

    /**
     * Atribui o parâmetro ao atributo ISBN
     * 
     * @param _data_inicio : data_inicio
     */
    public setDataInicio(_data_inicio: Date): void {
        this.data_inicio = _data_inicio;
    }

    /**
    * Retorna a quantidade total de Curso
    * @returns quantidade total: data_fim
    */
    public getDataFim(): Date {
        return this.data_fim;
    }

    /**
     * Atribui o parâmetro ao atributo quantidade total
     * 
     * @param _data_fim : data_fim
     */
    public setDataFim(_data_fim: Date): void {
        this.data_fim = _data_fim;
    }

    /**
     * Retorna o status do Curso no sistema
     * 
     * @returns Status do Curso no sistema
     */
    public getStatusCurso(): boolean {
        return this.status_curso;
    }

    /**
     * Atribui o parâmetro ao atributo status Curso
     * 
     * @param _statusCurso : Status do Curso no sistema
     */
    public setStatusCurso(_statusCurso: boolean) {
        this.status_curso = _statusCurso;
    }

    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    /**
     * Retorna uma lista com todos os cursos cadastrados no banco de dados
     * 
     * @returns Lista com todos os cursos cadastrados no banco de dados
     */
    static async listarCursos(): Promise<Array<Curso> | null> {
        // Criando lista vazia para armazenar os cursos
        let listaDeCursos: Array<Curso> = [];

        try {
            // Query para consulta no banco de dados
            const querySelectCurso = `SELECT * FROM Curso WHERE status_curso = TRUE;`;

            // executa a query no banco de dados
            const respostaBD = await database.query(querySelectCurso);

            // percorre cada resultado retornado pelo banco de dados
            // Curso é o apelido que demos para cada linha retornada do banco de dados
            respostaBD.rows.forEach((Curso) => {
                // criando objeto Curso
                let novoCurso = new Curso(
                    Curso.nome_curso,
                    Curso.data_inicio,
                    Curso.data_fim,
                    Curso.carga,
                    Curso.dia_curso,
                    Curso.hora

                );
                // adicionando o ID ao objeto
                novoCurso.setIdCurso(Curso.id_curso);
                novoCurso.setStatusCurso(Curso.status_curso);

                // adicionando um Curso na lista
                listaDeCursos.push(novoCurso);
            });

            // retornado a lista de cursos para quem chamou a função
            return listaDeCursos;

            // captura qualquer erro que aconteça
        } catch (error) {
            // exibe detalhes do erro no console
            console.log(`Erro ao acessar o modelo: ${error}`);
            // retorna um valor nulo
            return null;
        }
    }

    /**
     * Cadastra um novo Curso no banco de dados
     * @param Curso Objeto Curso contendo as informações a serem cadastradas
     * @returns Boolean indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarCurso(Curso: Curso): Promise<Boolean> {
        // variável de controle da execução da query
        let insertResult = false;

        try {
            // Cria a consulta (query) para inserir Curso na tabela retornado o ID do Curso
            const queryInsertCurso = `
                INSERT INTO Curso (nome_curso, data_inicio, data_fim, carga, dia_curso, hora)
                VALUES (
                    '${Curso.getNomeCurso().toUpperCase()}',
                    '${Curso.getDataInicio()}',
                    '${Curso.getDataFim()}',
                    '${Curso.getCarga().toUpperCase()}',
                    '${Curso.getDiaCurso().toUpperCase()}',
                    '${Curso.getHora().toUpperCase()}',
                )
                RETURNING id_curso;`;

            // executa a consulta no banco e armazena o resultado
            const result = await database.query(queryInsertCurso);

            // verifica se o número de linhas alteradas no banco de dados é maior que 0
            if (result.rows.length > 0) {
                // exibe mensagem de sucesso no console
                console.log(`Curso cadastrado com sucesso. ID: ${result.rows[0].id_curso}`);
                // altera o valor da variável de controle para verdadeiro
                insertResult = true;
            }

            // retorna o valor da variável de controle
            return insertResult;
            // captura qualquer tipo de erro que possa acontecer
        } catch (error) {
            // exibe detalhes do erro no console
            console.error(`Erro ao cadastrar Curso: ${error}`);
            // retorna o valor da variável de controle
            return insertResult;
        }
    }

    /**
     * Remove um Curso do banco de dados
     * @param id_curso ID do Curso a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static async removerCurso(id_curso: number): Promise<Boolean> {
        // variável de controle da execução da query
        let queryResult = false;

        try {
            // Cria a consulta para rmeover empréstimo do banco de dados
            const queryDeleteCurso = `UPDATE curso
                                                    SET status_curso = FALSE 
                                                    WHERE id_curso=${id_curso}`;

            // executa a query para remover empréstimo
            await database.query(queryDeleteCurso);


            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteCurso)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // retorna o valor da variável de controle
            return queryResult;

            // captura qualquer erro que possa acontecer
        } catch (error) {
            // Exibe detalhes do erro no console
            console.log(`Erro na consulta: ${error}`);
            // retorna o valor fa variável de controle
            return queryResult;
        }
    }

    /**
     * Atualiza os dados de um Curso no banco de dados.
     * @param Curso Objeto do tipo Curso com os novos dados
     * @returns true caso sucesso, false caso erro
     */
    static async atualizarCurso(Curso: Curso): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.
        try {
            // Construção da query SQL para atualizar os dados do Curso no banco de dados.
            const queryAtualizarCurso = `UPDATE Curso SET 
                                            nome_curso = '${Curso.getNomeCurso().toUpperCase()}', 
                                            data_inicio = '${Curso.getDataInicio()}',
                                            data_fim = '${Curso.getDataFim()}',
                                            carga = '${Curso.getCarga().toUpperCase()}',
                                            dia_curso = '${Curso.getDiaCurso().toUpperCase()}', 
                                            hora = '${Curso.getHora().toUpperCase()}',                                          
                                        WHERE id_curso = ${Curso.id_curso}`;

            // Executa a query de atualização e verifica se a operação foi bem-sucedida.
            await database.query(queryAtualizarCurso)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // Retorna o resultado da operação para quem chamou a função.
            return queryResult;
            // captura qualquer erro que possa acontecer
        } catch (error) {
            // exibe detalhes do erro no console
            console.log(`Erro na consulta: ${error}`);
            // retorna o valor da variável de controle
            return queryResult;
        }
    }
}
