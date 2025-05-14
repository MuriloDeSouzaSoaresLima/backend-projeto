import { DatabaseModel } from "./DatabaseModel";

// Recupera conexão com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa um aluno no sistema
 */
export class Aluno {
    private id_aluno: number = 0; // Identificador único do aluno
    private nome_aluno: string; // Nome do aluno
    private data_nascimento: Date; // Data de nascimento do aluno
    private email: string; //E-mail do aluno
    private senha: string; // Celular do aluno
    private statusAluno: boolean = true; // Controla o status do aluno no sistema

    /**
     * Construtor da classe Aluno
     * 
     * @param nome_aluno Nome do Aluno
     * @param data_nascimento Data de nascimento do Aluno
     * @param email Email do Aluno
     * @param senha Celular do Aluno
     */
    public constructor(_nome: string, _dataNascimento: Date, _email: string, _senha: string) {
        this.nome_aluno = _nome;
        this.data_nascimento = _dataNascimento;
        this.email = _email;
        this.senha = _senha;
    }

    //métodos GETTERS and SETTERS
    /**
     * Retorna o id do aluno
     * @returns id: id aluno
     */
    public getId_aluno(): number {
        return this.id_aluno;
    }

    /**
     * Atribui o parâmetro ao atributo id_aluno
     * 
     * @param _id_aluno : id_aluno
     */
    public setId_aluno(_id_aluno: number): void {
        this.id_aluno = _id_aluno;
    }

    /**
     * Retorna o nome_aluno do aluno
     * @returns nome_aluno: nome_aluno aluno
     */
    public getNome() {
        return this.nome_aluno;
    }

    /**
     * Atribui o parâmetro ao atributo nome_aluno
     * 
     * @param _nome : nome_aluno do aluno
     */
    public setNome(_nome: string) {
        this.nome_aluno = _nome;
    }

    /**
     * Retorna a data_nascimento do aluno
     * @returns datanascimento: data_nascimento aluno
     */
    public getDataNascimento() {
        return this.data_nascimento;
    }

    /**
     * Atribui o parâmetro ao atributo data_nascimento
     * 
     * @param _dataNascimento : data_nascimento do aluno
     */
    public setDataNascimento(_dataNascimento: Date) {
        this.data_nascimento = _dataNascimento;
    }

    /**
     * Retorna o email do aluno
     * @returns email: email aluno
     */
    public getEmail() {
        return this.email;
    }

    /**
    * Atribui o parâmetro ao atributo email
    * 
    * @param _email : senha do aluno
    */
    public setEmail(_email: string) {
        this.email = _email;
    }

    /**
     * Retorna o senha do aluno
     * @returns senha: senha aluno
     */
    public getSenha() {
        return this.senha;
    }

    /**
     * Atribui o parâmetro ao atributo senha
     * 
     * @param _senha : senha do aluno
     */
    public setSenha(_senha: string) {
        this.senha = _senha;
    }

    /**
     * Retorna o status do aluno no sistema
     * 
     * @return Status do aluno no sistema
     */
    public getStatusAluno(): boolean {
        return this.statusAluno;
    }

    /**
     * Atribui um valor ao status do aluno
     * 
     * @param _statusAluno : Valor a ser atribuido ao status do aluno
     */
    public setStatusAluno(_statusAluno: boolean) {
        this.statusAluno = _statusAluno;
    }

    static validacaoObjeto(aluno: Aluno): boolean {
        return !!(aluno && aluno.getNome() && aluno.getEmail() && aluno.getSenha());
    }

    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    /**
     * Retorna uma lista com todos os alunos cadastrados no banco de dados
     * 
     * @returns Lista com todos os alunos cadastrados no banco de dados
     */
    static async listarAlunos(): Promise<Array<Aluno> | null> {
        // Criando lista vazia para armazenar os alunos
        let listaDeAlunos: Array<Aluno> = [];

        try {
            // Query para consulta no banco de dados
            const querySelectAluno = `SELECT * FROM Aluno WHERE status_aluno = TRUE;`;

            // executa a query no banco de dados
            const respostaBD = await database.query(querySelectAluno);

            // percorre cada resultado retornado pelo banco de dados
            // aluno é o apelido que demos para cada linha retornada do banco de dados
            respostaBD.rows.forEach((aluno: any) => {

                // criando objeto aluno
                let novoAluno = new Aluno(
                    aluno.nome_aluno,
                    aluno.data_nascimento,
                    aluno.email,
                    aluno.senha
                );
                // adicionando o ID ao objeto
                novoAluno.setId_aluno(aluno.id_aluno);
                novoAluno.setStatusAluno(aluno.status_aluno);

                // adicionando a pessoa na lista
                listaDeAlunos.push(novoAluno);
            });

            // retornado a lista de pessoas para quem chamou a função
            return listaDeAlunos;
        } catch (error) {
            // exibe detalhes do erro no console
            console.log(`Erro ao acessar o modelo: ${error}`);
            // retorna nulo
            return null;
        }
    }

    /**
     * Retorna as informações de um aluno informado pelo ID
     * 
     * @param id_aluno Identificador único do aluno
     * @returns Objeto com informações do aluno
     */
    static async listarAluno(id_aluno: number): Promise<Aluno | null> {
        try {
            // Bloco try: aqui tentamos executar o código que pode gerar um erro.
            // Se ocorrer algum erro dentro deste bloco, ele será capturado pelo catch.

            // Define a query SQL para selecionar um aluno com base no ID fornecido
            const querySelectAluno = `SELECT * FROM aluno WHERE id_aluno = ${id_aluno}`;

            // Executa a consulta no banco de dados e aguarda o resultado
            const respostaBD = await database.query(querySelectAluno);

            // Cria um novo objeto da classe Aluno com os dados retornados do banco
            let aluno = new Aluno(
                respostaBD.rows[0].nome_aluno,             // Nome do aluno
                respostaBD.rows[0].data_nascimento,  // Data de nascimento do aluno
                respostaBD.rows[0].email,            // E-mail do aluno
                respostaBD.rows[0].senha           // Celular do aluno
            );

            // Define o ID do aluno no objeto Aluno
            aluno.setId_aluno(respostaBD.rows[0].id_aluno);

            // Define o status do aluno (ativo, inativo, etc.)
            aluno.setStatusAluno(respostaBD.rows[0].status_aluno);

            // Retorna o objeto aluno preenchido com os dados do banco
            return aluno;
        } catch (error) {
            // Bloco catch: se algum erro ocorrer no bloco try, ele será capturado aqui.
            // Isso evita que o erro interrompa a execução do programa.

            // Exibe uma mensagem de erro no console para facilitar o debug
            console.log(`Erro ao realizar a consulta: ${error}`);

            // Retorna null para indicar que não foi possível buscar o aluno
            return null;
        }
    }

    /**
     * Cadastra um novo aluno no banco de dados
     * @param aluno Objeto Aluno contendo as informações a serem cadastradas
     * @returns Boolean indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarAluno(aluno: Aluno): Promise<number> {
        try {
            if (this.validacaoObjeto(aluno)) {
                // Cria a consulta (query) para inserir o registro de um aluno no banco de dados, retorna o ID do aluno que foi criado no final
                const queryInsertAluno = `INSERT INTO Aluno (nome_aluno, data_nascimento, email, senha)
                                            VALUES (
                                                '${aluno.getNome().toUpperCase()}',
                                                '${aluno.getDataNascimento()}',
                                                '${aluno.getEmail().toLowerCase()}',
                                                '${aluno.getSenha()}'
                                            )
                                            RETURNING id_aluno;`;

                // Executa a query no banco de dados e armazena o resultado
                const result = await database.query(queryInsertAluno);

                // verifica se a quantidade de linhas que foram alteradas é maior que 0
                if (result.rows.length > 0) {
                    // Exibe a mensagem de sucesso
                    console.log(`Aluno cadastrado com sucesso. ID: ${result.rows[0].id_aluno}`);
                    // retorna verdadeiro
                    return 1;
                }
            }

            // caso a consulta não tenha tido sucesso, retorna falso
            return 9;
            // captura erro
        } catch (error) {
            // Exibe mensagem com detalhes do erro no console
            console.error(`Erro ao cadastrar aluno: ${error}`);
            // retorna falso
            return 0;
        }
    }

    /**
     * Remove um aluno do banco de dados
     * @param id_aluno ID do aluno a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static async removerAluno(id_aluno: number): Promise<number> {
        // variável para controle de resultado da consulta (query)
        try {
            // recupera o objeto do aluno a ser deletado
            const aluno = await this.listarAluno(id_aluno);

            // verifica se o objeto é válido e depois se o status_aluno é TRUE
            if (aluno && aluno.getStatusAluno()) {
                // Cria a consulta (query) para remover o aluno
                const queryDeleteEmprestimoAluno = `UPDATE emprestimo 
                                                        SET status_emprestimo_registro = FALSE
                                                        WHERE id_aluno=${id_aluno};`;

                // remove os emprestimos associado ao aluno
                await database.query(queryDeleteEmprestimoAluno);

                // Construção da query SQL para deletar o Aluno.
                const queryDeleteAluno = `UPDATE aluno 
                                            SET status_aluno = FALSE
                                            WHERE id_aluno=${id_aluno};`;

                // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
                await database.query(queryDeleteAluno)
                    .then((result) => {
                        if (result.rowCount != 0) {
                            return 1; // Se a operação foi bem-sucedida, define queryResult como true.
                        }
                    });
            }
            // retorna o resultado da query
            return 9;

            // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            // retorna false
            return 0;
        }
    }


    /**
    * Atualiza os dados de um aluno no banco de dados.
    * @param aluno Objeto do tipo Aluno com os novos dados
    * @returns true caso sucesso, false caso erro
    */
    static async atualizarAluno(aluno: Aluno): Promise<number> {
        try {
            // recupera o objeto do aluno a ser deletado
            const alunoConsulta = await this.listarAluno(aluno.id_aluno);

            if (alunoConsulta && alunoConsulta.getStatusAluno()) {
                // Construção da query SQL para atualizar os dados do aluno no banco de dados.
                const queryAtualizarAluno = `UPDATE Aluno SET 
                                                nome_aluno = '${aluno.getNome().toUpperCase()}', 
                                                data_nascimento = '${aluno.getDataNascimento()}', 
                                                senha = '${aluno.getSenha()}', 
                                                email = '${aluno.getEmail().toLowerCase()}'                                            
                                                WHERE id_aluno = ${aluno.id_aluno}`;

                // Executa a query de atualização e verifica se a operação foi bem-sucedida.
                await database.query(queryAtualizarAluno)
                    .then((result) => {
                        if (result.rowCount != 0) {
                            return 1; // Se a operação foi bem-sucedida, define queryResult como true.
                        }
                    });
            }

            // Retorna o resultado da operação para quem chamou a função.
            return 9;
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            return 0;
        }
    }
}