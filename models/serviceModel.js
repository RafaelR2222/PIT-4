const Database = require('../utils/database');
const conexao = new Database();

class ServiceModel {
    #servId;
    #servDesc;
    #servVal;
    #idServContratado;
    #idService;
    #idCliente;
    #qtdService;
    #valTotalService;
    #emailCliente;
    #nomeService


    constructor(servId, servDesc, servVal, idServContratado, idService, idCliente, qtdService, valTotalService, emailCliente, nomeService) {
        this.#servId = servId || null;
        this.#servDesc = servDesc || '';
        this.#servVal = servVal || 0;
        this.#idServContratado = idServContratado || null;
        this.#idService = idService || null;
        this.#idCliente = idCliente || null;
        this.#qtdService = qtdService || 0;
        this.#valTotalService = valTotalService || 0;
        this.#emailCliente = emailCliente || '';
        this.#nomeService = nomeService || '';
    }

    toJSON() {
        return {
            servId: this.#servId,
            servDesc: this.#servDesc,
            servVal: this.#servVal,
            idServContratado: this.#idServContratado,
            idService: this.#idService,
            idCliente: this.#idCliente,
            qtdService: this.#qtdService,
            valTotalService: this.#valTotalService,
            emailCliente: this.#emailCliente,
            nomeService: this.#nomeService
        };
    }

    // Getters and Setters for all fields
    get servId() { return this.#servId; }
    set servId(value) { this.#servId = value; }

    get servDesc() { return this.#servDesc; }
    set servDesc(value) { this.#servDesc = value; }

    get servVal() { return this.#servVal; }
    set servVal(value) { this.#servVal = value; }

    get idServContratado() { return this.#idServContratado; }
    set idServContratado(value) { this.#idServContratado = value; }

    get idService() { return this.#idService; }
    set idService(value) { this.#idService = value; }

    get idCliente() { return this.#idCliente; }
    set idCliente(value) { this.#idCliente = value; }

    get qtdService() { return this.#qtdService; }
    set qtdService(value) { this.#qtdService = value; }

    get valTotalService() { return this.#valTotalService; }
    set valTotalService(value) { this.#valTotalService = value; }

    get emailCliente() { return this.#emailCliente; }
    set emailCliente(value) { this.#emailCliente = value; }

    get nomeService() { return this.#nomeService; }
    set nomeService(value) { this.#nomeService = value; }

    // Method to save a service to the database
    async gravarService() {
        let sql = `INSERT INTO tb_servicos (serv_desc, serv_val) VALUES (?, ?)`;
        let valores = [this.#servDesc, this.#servVal];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Method to update a service in the database
    async editarService(servId) {
        let sql = `UPDATE tb_servicos SET serv_desc = ?, serv_val = ? WHERE serv_id = ?`;
        let valores = [this.#servDesc, this.#servVal, servId];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Method to delete a service by its ID
    async deletarService(servId) {
        let sql = "DELETE FROM tb_servicos WHERE serv_id = ?";
        let valores = [servId];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Method to get all services from the database
    async obterServices() {
        let sql = "SELECT * FROM tb_servicos";
        let rows = await conexao.ExecutaComando(sql);
        let servicos = [];

        if (rows.length > 0) {
            for (let row of rows) {
                let servico = new ServiceModel();
                servico.servId = row["serv_id"];
                servico.servDesc = row["serv_desc"];
                servico.servVal = row["serv_val"];
                servicos.push(servico.toJSON());
            }
        }

        return servicos;
    }

    // Method to get a service by its ID
    async obterServicesPorId(servId) {
        let sql = "SELECT * FROM tb_servicos WHERE serv_id = ?";
        let valores = [servId];
        let rows = await conexao.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let servico = new ServiceModel();
            servico.servId = rows[0]["serv_id"];
            servico.servDesc = rows[0]["serv_desc"];
            servico.servVal = rows[0]["serv_val"];
            return servico;
        }

        return null;
    }
    async obterServicesPorIdCliente(servId) {
        let sql = "SELECT * FROM tb_servicos_contratados WHERE id_cliente = ?";
        let valores = [servId];
        let rows = await conexao.ExecutaComando(sql, valores);
    
        // Se houver resultados
        if (rows.length > 0) {
            let servicos = [];
    
            // Itera sobre todas as linhas de resultado
            for (let row of rows) {
                let servico = new ServiceModel();
                
                // Usando os setters para definir os valores
                servico.servId = row["id_serv_contratado"]; // Setter
                servico.idService = row["id_service"];
                servico.idCliente = row["id_cliente"];
                servico.qtdService = row["qtd_service"];
                servico.valTotalService = row["val_total_service"];
                servico.emailCliente = row["email_cliente"];
                servico.nomeService = row["nome_service"];
                
                // Adiciona o serviço à lista de serviços
                servicos.push(servico.toJSON()); // Usando toJSON para retornar um objeto plano
            }
    
            // Retorna todos os serviços contratados
            return servicos;
        }
    
        // Se não encontrar nenhum serviço, retorna null ou uma lista vazia
        return null; // ou return [];
    }
    
    
}

module.exports = ServiceModel;
