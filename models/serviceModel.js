const Database = require('../utils/database');
const conexao = new Database();

class ServicoModel {
    #servId;
    #servDesc;
    #servVal;

    constructor(servId, servDesc, servVal) {
        this.#servId = servId;
        this.#servDesc = servDesc;
        this.#servVal = servVal;
    }

    toJSON() {
        return {
            servId: this.#servId,
            servDesc: this.#servDesc,
            servVal: this.#servVal
        };
    }

    // Getters and Setters for all fields
    get servId() { return this.#servId; }
    set servId(servId) { this.#servId = servId; }

    get servDesc() { return this.#servDesc; }
    set servDesc(servDesc) { this.#servDesc = servDesc; }

    get servVal() { return this.#servVal; }
    set servVal(servVal) { this.#servVal = servVal; }

    // Method to save a service to the database
    async gravarServico() {
        let sql = `INSERT INTO tb_servicos (serv_desc, serv_val) VALUES (?, ?)`;
        let valores = [this.#servDesc, this.#servVal];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Method to update a service in the database
    async editarServico(servId) {
        let sql = `UPDATE tb_servicos SET serv_desc = ?, serv_val = ? WHERE serv_id = ?`;
        let valores = [this.#servDesc, this.#servVal, servId];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Method to delete a service by its ID
    async deletarServico(servId) {
        let sql = "DELETE FROM tb_servicos WHERE serv_id = ?";
        let valores = [servId];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Method to get all services from the database
    async obterServicos() {
        let sql = "SELECT * FROM tb_servicos";
        let rows = await conexao.ExecutaComando(sql);
        let servicos = [];

        if (rows.length > 0) {
            for (let row of rows) {
                let servico = new ServicoModel();
                servico.servId = row["serv_id"];
                servico.servDesc = row["serv_desc"];
                servico.servVal = row["serv_val"];
                servicos.push(servico.toJSON());
            }
        }

        return servicos;
    }

    // Method to get a service by its ID
    async obterServicoPorId(servId) {
        let sql = "SELECT * FROM tb_servicos WHERE serv_id = ?";
        let valores = [servId];
        let rows = await conexao.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let servico = new ServicoModel();
            servico.servId = rows[0]["serv_id"];
            servico.servDesc = rows[0]["serv_desc"];
            servico.servVal = rows[0]["serv_val"];
            return servico;
        }

        return null;
    }
}

module.exports = ServicoModel;
