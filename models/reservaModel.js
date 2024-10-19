const Database = require('../utils/database')

const conexao = new Database();

class ReservaModel {
    #resId;
    #resPesNome;
    #resPesEmail;
    #resQuartoId;
    #resDataCheckin;
    #resDataCheckout;
    #resNumAdulto;
    #resNumCrianca;
    #resDataReserva;

    // Constructor to initialize the fields
    constructor(resId, resPesNome, resPesEmail, resQuartoId, resDataCheckin, resDataCheckout, resNumAdulto, resNumCrianca, resDataReserva) {
        this.#resId = resId;
        this.#resPesNome = resPesNome;
        this.#resPesEmail = resPesEmail;
        this.#resQuartoId = resQuartoId;
        this.#resDataCheckin = resDataCheckin;
        this.#resDataCheckout = resDataCheckout;
        this.#resNumAdulto = resNumAdulto;
        this.#resNumCrianca = resNumCrianca;
        this.#resDataReserva = resDataReserva;
    }

    toJSON() {
        return {
            'resId': this.#resId,
            'resPesNome': this.#resPesNome,
            'resPesEmail': this.#resPesEmail,
            'resQuartoId': this.#resQuartoId.toJSON(),
            'resDataCheckin': this.#resDataCheckin,
            'resDataCheckout': this.#resDataCheckout,
            'resNumAdulto': this.#resNumAdulto,
            'resNumCrianca': this.#resNumCrianca,
            'resDataReserva': this.#resDataReserva
        }
    }

    // Getter and Setter for resId
    get resId() {
        return this.#resId;
    }

    set resId(resId) {
        this.#resId = resId;
    }

    // Getter and Setter for resPesNome
    get resPesNome() {
        return this.#resPesNome;
    }

    set resPesNome(resPesNome) {
        this.#resPesNome = resPesNome;
    }

    // Getter and Setter for resPesEmail
    get resPesEmail() {
        return this.#resPesEmail;
    }

    set resPesEmail(resPesEmail) {
        this.#resPesEmail = resPesEmail;
    }

    // Getter and Setter for resQuartoId
    get resQuartoId() {
        return this.#resQuartoId;
    }

    set resQuartoId(resQuartoId) {
        this.#resQuartoId = resQuartoId;
    }

    // Getter and Setter for resDataCheckin
    get resDataCheckin() {
        return this.#resDataCheckin;
    }

    set resDataCheckin(resDataCheckin) {
        this.#resDataCheckin = resDataCheckin;
    }

    // Getter and Setter for resDataCheckout
    get resDataCheckout() {
        return this.#resDataCheckout;
    }

    set resDataCheckout(resDataCheckout) {
        this.#resDataCheckout = resDataCheckout;
    }

    // Getter and Setter for resNumAdulto
    get resNumAdulto() {
        return this.#resNumAdulto;
    }

    set resNumAdulto(resNumAdulto) {
        this.#resNumAdulto = resNumAdulto;
    }

    // Getter and Setter for resNumCrianca
    get resNumCrianca() {
        return this.#resNumCrianca;
    }

    set resNumCrianca(resNumCrianca) {
        this.#resNumCrianca = resNumCrianca;
    }

    get resDataReserva() {
        return this.#resDataReserva;
    }

    set resDataReserva(resDataReserva) {
        this.#resDataReserva = resDataReserva;
    }


    async gravarReserva() {
        let dataAtual = new Date();
        let sql = `insert into tb_reserva
                    (res_id, res_pesNome, res_pesEmail, res_quartoId, res_dataCheckin, res_dataCheckout, res_numAdulto, res_numCrianca, res_dataReserva)
                    values (0, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let valores = [this.#resPesNome, this.#resPesEmail, this.#resQuartoId, this.#resDataCheckin, this.#resDataCheckout, this.#resNumAdulto, this.#resNumCrianca, dataAtual];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async editarReserva(reservaId) {
        let sql = `update tb_reserva set res_pesNome = ?, res_pesEmail = ?, 
                    res_quartoId = ?, res_dataCheckin = ?, res_dataCheckout = ?, res_numAdulto = ?, res_numCrianca = ?  where res_id = ?`;
        let valores = [this.#resPesNome, this.#resPesEmail, this.#resQuartoId, this.#resDataCheckin, this.#resDataCheckout, this.#resNumAdulto, this.#resNumCrianca, reservaId];

        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

        return resultado;
    }

    async deletarReserva(id) {
            
        let sql = "delete from tb_reserva where res_id = ?";
        let valor = [id];

        let result1 = await conexao.ExecutaComandoNonQuery(sql, valor);

        return result1;
    }

    async obterReserva(id) {
        let sql = "select * from tb_reserva where res_id = ?";
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let reserva = new Reserva();
            reserva.resId = rows[0]["res_id"];
            reserva.resPesNome = rows[0]["res_pesNome"];
            reserva.resPesEmail = rows[0]["res_pesEmail"];
            reserva.resQuartoId = rows[0]["res_quartoId"];
            reserva.resDataCheckin = rows[0]["res_dataCheckin"];
            reserva.resDataCheckout = rows[0]["res_dataCheckout"];
            reserva.resNumAdulto = rows[0]["res_numAdulto"];
            reserva.resNumCrianca = rows[0]["res_numCrianca"];
            reserva.resDataReserva = rows[0]["res_dataReserva"];

            return reserva;
        }

        return null;
    }

}

module.exports = ReservaModel;