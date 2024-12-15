const Database = require('../utils/database');
const conexao = new Database();

class CheckinModel {
    #cinId;
    #cinNomePessoa;
    #cinEmail;
    #cinQuartoId;
    #cinQuartoValor;
    #cinNomeQuarto;
    #cinData;
    #cinCoutData;
    #cinCinDataEsperada;
    #cinCoutDataEsperada;
    #cinDataReserva;
    #cinIdReserva;
    #cinNumAdultos;
    #cinNumCriancas;
    #cinIdServContratados;
    #cinNomeServContratados;
    #cinValorServs;

    constructor(cinId, cinNomePessoa, cinEmail, cinQuartoId, cinQuartoValor, cinNomeQuarto, 
                cinData, cinCoutData, cinCinDataEsperada, cinCoutDataEsperada, cinDataReserva, 
                cinIdReserva, cinNumAdultos, cinNumCriancas, cinIdServContratados, 
                cinNomeServContratados, cinValorServs) {
        this.#cinId = cinId;
        this.#cinNomePessoa = cinNomePessoa;
        this.#cinEmail = cinEmail;
        this.#cinQuartoId = cinQuartoId;
        this.#cinQuartoValor = cinQuartoValor;
        this.#cinNomeQuarto = cinNomeQuarto;
        this.#cinData = cinData;
        this.#cinCoutData = cinCoutData;
        this.#cinCinDataEsperada = cinCinDataEsperada;
        this.#cinCoutDataEsperada = cinCoutDataEsperada;
        this.#cinDataReserva = cinDataReserva;
        this.#cinIdReserva = cinIdReserva;
        this.#cinNumAdultos = cinNumAdultos;
        this.#cinNumCriancas = cinNumCriancas;
        this.#cinIdServContratados = cinIdServContratados;
        this.#cinNomeServContratados = cinNomeServContratados;
        this.#cinValorServs = cinValorServs;
    }

    toJSON() {
        return {
            cinId: this.#cinId,
            cinNomePessoa: this.#cinNomePessoa,
            cinEmail: this.#cinEmail,
            cinQuartoId: this.#cinQuartoId,
            cinQuartoValor: this.#cinQuartoValor,
            cinNomeQuarto: this.#cinNomeQuarto,
            cinData: this.#cinData,
            cinCoutData: this.#cinCoutData,
            cinCinDataEsperada: this.#cinCinDataEsperada,
            cinCoutDataEsperada: this.#cinCoutDataEsperada,
            cinDataReserva: this.#cinDataReserva,
            cinIdReserva: this.#cinIdReserva,
            cinNumAdultos: this.#cinNumAdultos,
            cinNumCriancas: this.#cinNumCriancas,
            cinIdServContratados: this.#cinIdServContratados,
            cinNomeServContratados: this.#cinNomeServContratados,
            cinValorServs: this.#cinValorServs,
        };
    }


    get cinId() { return this.#cinId; }
    set cinId(cinId) { this.#cinId = cinId; }

    get cinNomePessoa() { return this.#cinNomePessoa; }
    set cinNomePessoa(cinNomePessoa) { this.#cinNomePessoa = cinNomePessoa; }

    get cinEmail() { return this.#cinEmail; }
    set cinEmail(cinEmail) { this.#cinEmail = cinEmail; }

    get cinQuartoId() { return this.#cinQuartoId; }
    set cinQuartoId(cinQuartoId) { this.#cinQuartoId = cinQuartoId; }

    get cinQuartoValor() { return this.#cinQuartoValor; }
    set cinQuartoValor(cinQuartoValor) { this.#cinQuartoValor = cinQuartoValor; }

    get cinNomeQuarto() { return this.#cinNomeQuarto; }
    set cinNomeQuarto(cinNomeQuarto) { this.#cinNomeQuarto = cinNomeQuarto; }

    get cinData() { return this.#cinData; }
    set cinData(cinData) { this.#cinData = cinData; }

    get cinCoutData() { return this.#cinCoutData; }
    set cinCoutData(cinCoutData) { this.#cinCoutData = cinCoutData; }

    get cinCinDataEsperada() { return this.#cinCinDataEsperada; }
    set cinCinDataEsperada(cinCinDataEsperada) { this.#cinCinDataEsperada = cinCinDataEsperada; }

    get cinCoutDataEsperada() { return this.#cinCoutDataEsperada; }
    set cinCoutDataEsperada(cinCoutDataEsperada) { this.#cinCoutDataEsperada = cinCoutDataEsperada; }

    get cinDataReserva() { return this.#cinDataReserva; }
    set cinDataReserva(cinDataReserva) { this.#cinDataReserva = cinDataReserva; }

    get cinIdReserva() { return this.#cinIdReserva; }
    set cinIdReserva(cinIdReserva) { this.#cinIdReserva = cinIdReserva; }

    get cinNumAdultos() { return this.#cinNumAdultos; }
    set cinNumAdultos(cinNumAdultos) { this.#cinNumAdultos = cinNumAdultos; }

    get cinNumCriancas() { return this.#cinNumCriancas; }
    set cinNumCriancas(cinNumCriancas) { this.#cinNumCriancas = cinNumCriancas; }

    get cinIdServContratados() { return this.#cinIdServContratados; }
    set cinIdServContratados(cinIdServContratados) { this.#cinIdServContratados = cinIdServContratados; }

    get cinNomeServContratados() { return this.#cinNomeServContratados; }
    set cinNomeServContratados(cinNomeServContratados) { this.#cinNomeServContratados = cinNomeServContratados; }

    get cinValorServs() { return this.#cinValorServs; }
    set cinValorServs(cinValorServs) { this.#cinValorServs = cinValorServs; }

    async gravarCheckin(dados) {
        // Definindo a consulta SQL de inserção de dados
        let sql = `
           INSERT INTO tb_checkin 
        (cin_nome_pessoa, cin_email, cin_quarto, cin_quarto_valor, cin_nome_quarto, 
        cin_data, cin_cout_data, cin_cinData_esperada, cin_coutData_esperada, cin_dataReserva, 
        cin_id_reserva, cin_num_adultos, cin_num_criancas, cin_id_servContratados, 
        cin_nome_servContratados, cin_valor_servs)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

        `;
    
        // A lista de dados será passada diretamente para os parâmetros da query
        let valores = dados;
    
        try {
            // Executando o comando SQL no banco de dados
            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
            
            // Retorna o resultado da execução
            return resultado;
        } catch (erro) {
            // Caso ocorra algum erro, logar e retornar o erro
            console.error("Erro ao gravar o check-in:", erro);
            throw new Error("Falha ao tentar gravar o check-in");
        }
    }
    
    

    async editarCheckin(lista) {
        let sql = `UPDATE tb_checkin SET 
                    cin_nome_pessoa = ?, 
                    cin_email = ?, 
                    cin_quarto = ?, 
                    cin_quarto_valor = ?, 
                    cin_nome_quarto = ?, 
                    cin_data = ?, 
                    cin_cout_data = ?, 
                    cin_cinData_esperada = ?, 
                    cin_coutData_esperada = ?, 
                    cin_dataReserva = ?, 
                    cin_id_reserva = ?, 
                    cin_num_adultos = ?, 
                    cin_num_criancas = ?, 
                    cin_id_servContratados = ?, 
                    cin_nome_servContratados = ?, 
                    cin_valor_servs = ? 
                WHERE cin_id = ?`;
    
        let valores =  lista
    
        try {
            // Executando o comando SQL com os parâmetros
            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
            return resultado;
        } catch (erro) {
            console.error("Erro ao editar o check-in:", erro);
            throw new Error("Erro ao editar o check-in.");
        }
    }
    


    async deletarCheckin(cinId) {
        let sql = "DELETE FROM tb_checkin WHERE cin_id = ?";
        let valor = [cinId];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valor);
        return resultado;
    }


    async obterCheckins() {
        let sql = "SELECT * FROM tb_checkin";
        let rows = await conexao.ExecutaComando(sql);
        let checkins = [];
    
        if (rows.length > 0) {
            for (let row of rows) {
                let checkin = new CheckinModel();
                checkin.cinId = row["cin_id"];
                checkin.cinNomePessoa = row["cin_nome_pessoa"];
                checkin.cinEmail = row["cin_email"];
                checkin.cinQuartoId = row["cin_quarto"];
                checkin.cinQuartoValor = row["cin_quarto_valor"];
                checkin.cinNomeQuarto = row["cin_nome_quarto"];
                
                // Formatando a data para incluir apenas o dia, mês e ano
                checkin.cinData = formatDate(row["cin_data"]);
    
                let dataCheckOut = row["cin_cout_data"];
                if (dataCheckOut === 'Invalid Date' || dataCheckOut == undefined || dataCheckOut == null) {
                    checkin.cinCoutData = "";
                } else {
                    checkin.cinCoutData = formatDate(dataCheckOut);
                }
    
                checkin.cinCinDataEsperada = formatDate(row["cin_cinData_esperada"]);
                checkin.cinCoutDataEsperada = row["cin_coutData_esperada"];
                checkin.cinDataReserva = formatDate(row["cin_dataReserva"]);
                checkin.cinIdReserva = row["cin_id_reserva"];
                checkin.cinNumAdultos = row["cin_num_adultos"];
                checkin.cinNumCriancas = row["cin_num_criancas"];
                checkin.cinIdServContratados = row["cin_id_servContratados"];
                checkin.cinNomeServContratados = row["cin_nome_servContratados"];
                checkin.cinValorServs = row["cin_valor_servs"];
            
                // Adicionando o checkin ao array
                checkins.push(checkin.toJSON());
            }
        }
    
        return checkins;
    }

    async atualizarServicosCheckin(email, id_servicos, nome_servicos, valor_servicos) {
        // Verifica se o email existe na tabela tb_checkin
        let sqlCheckin = "SELECT * FROM tb_checkin WHERE cin_email = ?";
        let checkin = await conexao.ExecutaComando(sqlCheckin, email);

        if (checkin.length === 0) {
            // Se o usuário não for encontrado, retorna false
            return false;
        }

        // Obter os dados atuais dos serviços contratados
        let usuario = checkin[0];
        let novoIdServicos = id_servicos;
        let novoNomeServicos = nome_servicos;
        let novoValorServicos = valor_servicos;

        // Verifica se já existem valores para o cin_id_servContratados, cin_nome_servContratados ou cin_valor_servs
        if (usuario.cin_id_servContratados) {
            // Se já existirem, concatena os valores
            novoIdServicos = usuario.cin_id_servContratados + ',' + id_servicos;
        }

        if (usuario.cin_nome_servContratados) {
            // Se já existirem, concatena os nomes dos serviços
            novoNomeServicos = usuario.cin_nome_servContratados + ',' + nome_servicos;
        }

        if (usuario.cin_valor_servs) {
            // Se já houver um valor, soma ao novo valor
            novoValorServicos = parseFloat(usuario.cin_valor_servs) + parseFloat(valor_servicos);
        }

        // Atualiza os serviços contratados no banco de dados
        let updateSql = `
            UPDATE tb_checkin
            SET 
                cin_id_servContratados = ?,
                cin_nome_servContratados = ?,
                cin_valor_servs = ?
            WHERE cin_email = ?
        `;
        
        let updateValores = [novoIdServicos, novoNomeServicos, novoValorServicos, email];
        
        // Executando o update para registrar a atualização dos serviços
        let resultadoUpdateServicos = await conexao.ExecutaComandoNonQuery(updateSql, updateValores);

        // Verifica se a atualização foi bem-sucedida
        if (resultadoUpdateServicos) {
            return true;
        }

        return false;
    }

    async liberarDataCout(cinId) {
        // SQL para atualizar a coluna 'cin_cout_data' para NULL
        let sql = "UPDATE tb_checkin SET cin_cout_data = NULL WHERE cin_id = ?";
        
        // Valor do parâmetro para a consulta
        let valor = [cinId];
        
        // Executa o comando de atualização na tabela
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valor);
        
        // Retorna o resultado da execução do comando
        return resultado;
    }
    
    async obterCheckinPorId(cinId) {
        let sql = "SELECT * FROM tb_checkin WHERE cin_id = ?";
        let valores = [cinId];
        let rows = await conexao.ExecutaComando(sql, valores);
    
        if (rows.length > 0) {
            // Assumindo que o 'rows' já está no formato desejado
            let checkin = {
                cinId: rows[0]["cin_id"],
                cinNomePessoa: rows[0]["cin_nome_pessoa"],
                cinEmail: rows[0]["cin_email"],
                cinQuartoId: rows[0]["cin_quarto"],
                cinQuartoValor: rows[0]["cin_quarto_valor"],
                cinNomeQuarto: rows[0]["cin_nome_quarto"],
                cinData: rows[0]["cin_data"],  // mantemos como string ou formato padrão
                cinCoutData: rows[0]["cin_cout_data"],
                cinCinDataEsperada: rows[0]["cin_cinData_esperada"],
                cinCoutDataEsperada: rows[0]["cin_coutData_esperada"],
                cinDataReserva: rows[0]["cin_dataReserva"],
                cinIdReserva: rows[0]["cin_id_reserva"],
                cinNumAdultos: rows[0]["cin_num_adultos"],
                cinNumCriancas: rows[0]["cin_num_criancas"],
                cinIdServContratados: rows[0]["cin_id_servContratados"],
                cinNomeServContratados: rows[0]["cin_nome_servContratados"],
                cinValorServs: rows[0]["cin_valor_servs"]
            };
    
            // Retornar o objeto no formato JSON
            return JSON.parse(JSON.stringify(checkin));
        }
    
        return null;
    }
    
    
    async obterCheckinPorEmail(cinEmail) {
        let sql = "SELECT * FROM tb_checkin WHERE cin_email = ?";
        let valores = [cinEmail];
        let rows = await conexao.ExecutaComando(sql, valores);
    
        if (rows.length > 0) {
            let checkin = new CheckinModel();
            checkin.cinId = rows[0]["cin_id"];
            checkin.cinNomePessoa = rows[0]["cin_nome_pessoa"];
            checkin.cinEmail = rows[0]["cin_email"];
            checkin.cinQuartoId = rows[0]["cin_quarto"];
            checkin.cinQuartoValor = rows[0]["cin_quarto_valor"];
            checkin.cinNomeQuarto = rows[0]["cin_nome_quarto"];
            checkin.cinData = new Date(rows[0]["cin_data"]).toLocaleString();
            checkin.cinCoutData = new Date(rows[0]["cin_cout_data"]).toLocaleString();
            checkin.cinCinDataEsperada = new Date(rows[0]["cin_cinData_esperada"]).toLocaleString();
            checkin.cinCoutDataEsperada = new Date(rows[0]["cin_coutData_esperada"]).toLocaleString();
            checkin.cinDataReserva = new Date(rows[0]["cin_dataReserva"]).toLocaleString();
            checkin.cinIdReserva = rows[0]["cin_id_reserva"];
            checkin.cinNumAdultos = rows[0]["cin_num_adultos"];
            checkin.cinNumCriancas = rows[0]["cin_num_criancas"];
            checkin.cinIdServContratados = rows[0]["cin_id_servContratados"];
            checkin.cinNomeServContratados = rows[0]["cin_nome_servContratados"];
            checkin.cinValorServs = rows[0]["cin_valor_servs"];
    
            return checkin;
        }
    
        return null;
    }
    
}
function formatDate(dateString) {
    let date;

    // Verifica se a data está no formato 'yyyy-mm-dd'
    if (dateString && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dateString)) {
        let parts = dateString.split('-'); // 'yyyy-mm-dd' -> [yyyy, mm, dd]
        date = new Date(parts[0], parts[1] - 1, parts[2]);
    }
    // Verifica se a data está no formato 'dd/mm/yyyy'
    else if (dateString && /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(dateString)) {
        let parts = dateString.split('/'); // 'dd/mm/yyyy' -> [dd, mm, yyyy]
        date = new Date(parts[2], parts[1] - 1, parts[0]); // Cria a data no formato correto
    }

    // Se a data for válida, formate e retorne, caso contrário, retorna uma string vazia
    if (date instanceof Date && !isNaN(date)) {
        return date.toLocaleDateString('pt-BR');
    }

    return ""; // Se a data não for válida ou estiver nula, retorna uma string vazia
}

module.exports = CheckinModel;
