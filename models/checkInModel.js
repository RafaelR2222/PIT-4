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
                checkin.cinData = new Date(row["cin_data"]).toLocaleDateString('pt-BR'); 
            
                let dataCheckOut = row["cin_cout_data"]
                if (dataCheckOut === 'Invalid Date' || dataCheckOut == undefined || dataCheckOut == null ) {
                    checkin.cinCoutData = "";
                } else {
                    checkin.cinCoutData = new Date(dataCheckOut).toLocaleDateString('pt-BR');
                }
                checkin.cinCinDataEsperada = new Date(row["cin_cinData_esperada"]).toLocaleDateString('pt-BR');
                checkin.cinCoutDataEsperada = row["cin_coutData_esperada"]
                checkin.cinDataReserva = new Date(row["cin_dataReserva"]).toLocaleDateString('pt-BR');
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

module.exports = CheckinModel;
