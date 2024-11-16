
const CheckinModel = require("../models/checkInModel");
const QuartoModel = require("../models/quartoModel");
const cookieParser = require('cookie-parser');
const CompraModel = require("../models/compraModel");
const FornecedorModel = require("../models/fornecedorModel");

class CheckinController {
    
    // Exibe a tela de check-in
    async checkinView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        let fornecedor = new FornecedorModel();
        let listaFornecedor = await fornecedor.listarFornecedor()
        res.render('checkin/listar' , {lista: listaFornecedor, usuario: usuario, layout: 'layoutADM'});
    }

    cadastrarView(req, res) {
        res.render('checkin/cadastrar');
    }

    alterarView(req, res) {
        res.render('checkin/alterar');
    }



    // Realiza o check-in
    async gravarCheckin(req, res) {
        let checkin = new CheckinModel();
        checkin.cinNomePessoa = req.body.nome;
        checkin.cinEmail = req.body.email;
        checkin.cinQuartoId = req.body.quarto;
        checkin.cinCinDataEsperada = new Date(req.body.dataEsperadaCheckin);
        checkin.cinCoutDataEsperada = new Date(req.body.dataEsperadaCheckout);
        checkin.cinNumAdultos = req.body.adultos;
        checkin.cinNumCriancas = req.body.criancas;

        let quartosDisponiveis = await QuartoModel.obterQuartoDesocupado();
        let quartoSelecionado = quartosDisponiveis.find(quarto => quarto.qrIdQuarto == checkin.cinQuarto);

        if (!quartoSelecionado) {
            return res.send({ ok: false, message: "Quarto indisponível para check-in" });
        }

        try {
            let resultado = await checkin.gravarCheckin();
            if (resultado) {
                await QuartoModel.atualizarStatusQuarto(checkin.cinQuarto, 'ocupado');
                return res.send({ ok: true, message: "Check-in realizado com sucesso" });
            } else {
                return res.send({ ok: false, message: "Falha ao realizar o check-in" });
            }
        } catch (error) {
            return res.send({ ok: false, message: "Erro ao processar o check-in", error });
        }
    }

    // Obter todos os check-ins
    async obterCheckins(req, res) {
        let checkin = new CheckinModel();
        let listaCheckins = await checkin.obterCheckins();
        return res.send({ listaCheckins });
    }

    // Obter detalhes de um check-in específico
    async obterCheckinPorId(req, res) {
        let checkin = new CheckinModel();
        let checkinDetalhes = await checkin.obterCheckinPorId(req.params.id);
        return res.send({ checkin: checkinDetalhes });
    }

    // Excluir um check-in
    async excluirCheckin(req, res) {
        let checkin = new CheckinModel();
        let resultado = await checkin.deletarCheckin(req.params.id);
        if (resultado) {
            return res.send({ ok: true, message: "Check-in excluído com sucesso" });
        } else {
            return res.send({ ok: false, message: "Falha ao excluir o check-in" });
        }
    }

    // Editar um check-in
    async editarCheckin(req, res) {
        let checkin = new CheckinModel();
        checkin.cinId = req.params.id;
        checkin.cinNomePessoa = req.body.nome;
        checkin.cinEmail = req.body.email;
        checkin.cinQuarto = req.body.quarto;
        checkin.cinCinDataEsperada = new Date(req.body.dataEsperadaCheckin);
        checkin.cinCoutDataEsperada = new Date(req.body.dataEsperadaCheckout);
        checkin.cinNumAdultos = req.body.adultos;
        checkin.cinNumCriancas = req.body.criancas;

        let resultado = await checkin.editarCheckin();
        if (resultado) {
            return res.send({ ok: true, message: "Check-in editado com sucesso" });
        } else {
            return res.send({ ok: false, message: "Falha ao editar check-in" });
        }
    }
}

module.exports = CheckinController;
