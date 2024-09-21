const ReservaModel = require("../models/reservaModel");

class ReservaController {

    async gravarReserva(req, res) {
        let reserva = new ReservaModel();
        reserva.resPesNome = req.body.nome;
        reserva.resPesEmail = req.body.email;
        reserva.resQuartoId = req.body.quarto;
        reserva.resDataCheckin = req.body.dataInicial;
        reserva.resDataCheckout = req.body.dataFinal;
        reserva.resNumAdulto = req.body.adultos;
        reserva.resNumCrianca = req.body.criancas;
        try{
            let gravar = await reserva.gravarReserva();
            if(gravar){
                await reserva.editarQuartoReserva(reserva.resId);
            }
            else{
                return res.send({ ok: false, message: "Reserva falha" });
            }
            return res.send({ ok: true, message: "Reserva efetuada com sucesso" });
        }
        catch(e){
            return res.send({ ok: false, message: "Reserva falha", error: e});
        }
    }

    async listarReserva(req, res) {
        let reserva = new ReservaModel();
        let listaReserva = await reserva.listarReservas(req.params.id);
        return res.send({ listaReserva });
    }

    async excluirReserva(req, res) {
        let reserva = new ReservaModel();
        reserva.resId = req.params.id;
        await reserva.excluirReserva(req.params.id);
        return res.send({ ok: true, message: "Reserva excluida" });
    }

    async editarReserva(req, res) {
        let reserva = new ReservaModel();
        reserva.resId = req.params.id;
        reserva = await reserva.editarReserva(req.params.id);
        return res.send( { ok: true, reserva });
    }
}

module.exports = ReservaController;