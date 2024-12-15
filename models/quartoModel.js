const Database = require('../utils/database')

const conexao = new Database();

class QuartoModel {
    #qrIdQuarto;
    #qrNome;
    #qrDescricao;
    #qrNumeroQuarto;
    #qrQuartoStatus;
    #qrQuartoValor

    // Constructor to initialize the fields
    constructor(qrIdQuarto, qrNome, qrDescricao, qrNumeroQuarto, qrQuartoStatus,qrQuartoValor) {
        this.#qrIdQuarto = qrIdQuarto;
        this.#qrNome = qrNome;
        this.#qrDescricao = qrDescricao;
        this.#qrNumeroQuarto = qrNumeroQuarto;
        this.#qrQuartoStatus = qrQuartoStatus;
        this.#qrQuartoValor = qrQuartoValor;
    }

    // Getter and Setter for qrIdQuarto
    get qrIdQuarto() {
        return this.#qrIdQuarto;
    }

    set qrIdQuarto(qrIdQuarto) {
        this.#qrIdQuarto = qrIdQuarto;
    }

    // Getter and Setter for qrNome
    get qrNome() {
        return this.#qrNome;
    }

    set qrNome(qrNome) {
        this.#qrNome = qrNome;
    }

    // Getter and Setter for qrDescricao
    get qrDescricao() {
        return this.#qrDescricao;
    }

    set qrDescricao(qrDescricao) {
        this.#qrDescricao = qrDescricao;
    }

    // Getter and Setter for qrNumeroQuarto
    get qrNumeroQuarto() {
        return this.#qrNumeroQuarto;
    }

    set qrNumeroQuarto(qrNumeroQuarto) {
        this.#qrNumeroQuarto = qrNumeroQuarto;
    }

    // Getter and Setter for qrQuartoStatus
    get qrQuartoStatus() {
        return this.#qrQuartoStatus;
    }

    set qrQuartoStatus(qrQuartoStatus) {
        this.#qrQuartoStatus = qrQuartoStatus;
    }

    get qrQuartoValor(){
        return this.#qrQuartoValor 
    }

    set qrQuartoValor(qrQuartoValor){
        this.#qrQuartoValor = qrQuartoValor;
    }

    toJSON() {
        return {
            qrIdQuarto: this.#qrIdQuarto,
            qrNome: this.#qrNome,
            qrDescricao: this.#qrDescricao,
            qrNumeroQuarto: this.#qrNumeroQuarto,
            qrQuartoStatus: this.#qrQuartoStatus,
            qrQuartoValor: this.#qrQuartoValor
        };
    }
    
    async obterQuartoPorId(id) {
        let sql = "select * from tb_quartos where qr_id_quarto = ?";
        let valores = [id];
        let quartos = []
        let rows = await conexao.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let quarto = new QuartoModel();
            quarto.qrIdQuarto = rows[0]["qr_id_quarto"];
            quarto.qrNome = rows[0]["qr_nome"];
            quarto.qrDescricao = rows[0]["qr_descricao"];
            quarto.qrNumeroQuarto = rows[0]["qr_numero_quarto"];
            quarto.qrQuartoStatus = rows[0]["qr_quarto_status"];
            quarto.qrQuartoValor = rows[0]["qr_quarto_valor"];

            quartos.push(quarto.toJSON());
            return quartos
        }
    }

    async obterQuartoDesocupado() {
        let sql = "select * from tb_quartos where qr_quarto_status = 'desocupado'";

        let rows = await conexao.ExecutaComando(sql);

        let listaQuartos = []

        if (rows.length > 0) {
            for(let i = 0; i< rows.length; i++) {
                listaQuartos.push(new QuartoModel(rows[i]["qr_id_quarto"], rows[i]["qr_nome"], rows[i]["qr_descricao"], rows[i]["qr_quarto_status"]))
            }
            return listaQuartos;
        }
    }

    async obterQuarto() {
        let sql = "select * from tb_quartos";

        let rows = await conexao.ExecutaComando(sql, valores);

        let listaQuarto = []
        if(rows.length > 0) {
            for(let i = 0; i< rows.length; i++) {
                listaQuarto.push(new QuartoModel(rows[i]["qr_id_quarto"], rows[i]["qr_nome"], rows[i]["qr_descricao"], rows[i]["qr_quarto_status"]))
            }
        }
        return listaQuarto;
    }

    async editarQuartoReserva(quartoId) {
        let sql = `update tb_quartos set qr_quarto_status = 'ocupado' where qr_id_quarto = ?`;
        let valor = [quartoId];

        let resultado = await conexao.ExecutaComandoNonQuery(sql, valor);

        return resultado;
    }

}

module.exports = QuartoModel;