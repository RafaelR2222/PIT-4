const QuartoModel = require("../models/quartoModel");
const cookieParser = require('cookie-parser');

class QuartoController {
    
    quartoView(req, res) {
        res.render('quarto/quarto');
    }

    async gravarQuarto(req, res) {
        let quarto = new QuartoModel();
        quarto.qrNome = req.body.nome;
        quarto.qrDescricao = req.body.descricao;
        quarto.qrNumeroQuarto = req.body.numero;
        quarto.qrQuartoStatus = req.body.status;
        await quarto.gravarQuarto();
        return res.send({ ok: true, message: "Quarto cadastrado com sucesso" });
    }

    async obterQuarto(req, res) {
        let quarto = new QuartoModel();
        let listaQuartos = await quarto.obterQuarto();
        return res.send({ listaQuartos });
    }

    async obterQuartoPorId(req, res) {
        let quarto = new QuartoModel();
        let listaQuarto = await quarto.obterQuartoPorId(req.params.id);
        return res.send({ listaQuarto });
    }

    
    async obterQuartoDesocupado(req, res) {
        let quarto = new QuartoModel();
        let listaQuartos = await quarto.obterQuartoDesocupado();
        return res.send({ listaQuartos });
    }

    async editarQuartoReserva(req, res) {
        let quarto = new QuartoModel();
        await quarto.editarQuartoReserva(req.params.id);
        return res.send({ ok: true, message: "Quarto alterado com sucesso" });
    }
}

module.exports = QuartoController;