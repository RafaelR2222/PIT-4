const ProdutoModel = require("../models/produtoModel");
const Database = require('../utils/database')
const ReservaModel = require("../models/reservaModel");
class ReservaController {

    async gravarReserva(req, res) {
        let reserva = new ReservaModel();
        reserva.resPesNome = req.body.nome;
        reserva.resPesEmail = req.body.email;
        reserva.resQuartoId = req.body.quarto;
        reserva.resDataCheckin = req.body.dataInicial;
        reserva.resDataCheckout = req.body.dataFinal;
        reserva.resNumAdulto = req.body.adults;
        reserva.resNumCrianca = req.body.crianca;
        await reserva.gravarReserva();
        res.redirect('/reserva');
    }

    async listarReserva(req, res) {
        let reserva = new ReservaModel();
        let listaReserva = await reserva.listarReservas(req.body.id);
        res.send({ listaReserva });
    }

    async excluirReserva(req, res) {
        let reserva = new ReservaModel();
        reserva.resId = req.params.id;
        await reserva.excluirReserva(req.body.id);
        res.send({ ok: true, message: "Reserva excluida" });
    }

    async editarReserva(req, res) {
        let reserva = new ReservaModel();
        reserva.resId = req.params.id;
        reserva = await reserva.editarReserva(req.body.id);
        res.send( { ok: true, reserva });
    }
}

module.exports = ReservaController;