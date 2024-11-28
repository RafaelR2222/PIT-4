const Database = require('../utils/database');
const conexao = new Database();

class ServicoContratadoModel {
    #idServContratado;
    #idService;
    #idCliente;
    #qtdService;
    #valTotalService;
    #emailCliente;
    #nomeServico;

    constructor(idServContratado, idService, idCliente, qtdService, valTotalService, emailCliente, nomeServico) {
        this.#idServContratado = idServContratado;
        this.#idService = idService;
        this.#idCliente = idCliente;
        this.#qtdService = qtdService;
        this.#valTotalService = valTotalService;
        this.#emailCliente = emailCliente;
        this.#nomeServico = nomeServico;
    }

    toJSON() {
        return {
            idServContratado: this.#idServContratado,
            idService: this.#idService,
            idCliente: this.#idCliente,
            qtdService: this.#qtdService,
            valTotalService: this.#valTotalService,
            emailCliente: this.#emailCliente,
            nomeServico: this.#nomeServico
        };
    }

    // Getters and Setters for all fields
    get idServContratado() { return this.#idServContratado; }
    set idServContratado(idServContratado) { this.#idServContratado = idServContratado; }

    get idService() { return this.#idService; }
    set idService(idService) { this.#idService = idService; }

    get idCliente() { return this.#idCliente; }
    set idCliente(idCliente) { this.#idCliente = idCliente; }

    get qtdService() { return this.#qtdService; }
    set qtdService(qtdService) { this.#qtdService = qtdService; }

    get valTotalService() { return this.#valTotalService; }
    set valTotalService(valTotalService) { this.#valTotalService = valTotalService; }

    get emailCliente() { return this.#emailCliente; }
    set emailCliente(emailCliente) { this.#emailCliente = emailCliente; }

    get nomeServico() { return this.#nomeServico; }
    set nomeServico(nomeServico) { this.#nomeServico = nomeServico; }

    // Method to save a contracted service to the database
    async gravarServicoContratado(id) {
        let sql = `INSERT INTO tb_servicos_contratados (id_service, id_cliente, qtd_service, email_cliente, val_total_service, nome_service) 
                    VALUES (?, ?, ?, ?, ?, ?)`;
        let valores = [id, this.#idCliente, 1, this.#emailCliente, this.#valTotalService, this.#nomeServico];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Method to update a contracted service in the database
    async editarServicoContratado(idServContratado) {
        let sql = `UPDATE tb_servicos_contratados SET id_service = ?, id_cliente = ?, qtd_service = ?, 
                    val_total_service = ? WHERE id_serv_contratado = ?`;
        let valores = [this.#idService, this.#idCliente, this.#qtdService, this.#valTotalService, idServContratado];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Method to delete a contracted service by its ID
    async deletarServicoContratado(idServContratado) {
        let sql = "DELETE FROM tb_servicos_contratados WHERE id_serv_contratado = ?";
        let valores = [idServContratado];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Method to get all contracted services
    async obterServicosContratados() {
        let sql = "SELECT * FROM tb_servicos_contratados";
        let rows = await conexao.ExecutaComando(sql);
        let servicosContratados = [];

        if (rows.length > 0) {
            for (let row of rows) {
                let servicoContratado = new ServicoContratadoModel();
                servicoContratado.idServContratado = row["id_serv_contratado"];
                servicoContratado.idService = row["id_service"];
                servicoContratado.idCliente = row["id_cliente"];
                servicoContratado.qtdService = row["qtd_service"];
                servicoContratado.valTotalService = row["val_total_service"];
                servicoContratado.emailCliente = row["email_cliente"];
                servicoContratado.nomeServico = row["nome_service"];
                servicosContratados.push(servicoContratado.toJSON());
            }
        }

        return servicosContratados;
    }

    // Method to get a contracted service by its ID
    async obterServicoContratadoPorId(idServContratado) {
        let sql = "SELECT * FROM tb_servicos_contratados WHERE id_serv_contratado = ?";
        let valores = [idServContratado];
        let rows = await conexao.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let servicoContratado = new ServicoContratadoModel();
            servicoContratado.idServContratado = rows[0]["id_serv_contratado"];
            servicoContratado.idService = rows[0]["id_service"];
            servicoContratado.idCliente = rows[0]["id_cliente"];
            servicoContratado.qtdService = rows[0]["qtd_service"];
            servicoContratado.valTotalService = rows[0]["val_total_service"];
            return servicoContratado;
        }

        return null;
    }
}

module.exports = ServicoContratadoModel;
