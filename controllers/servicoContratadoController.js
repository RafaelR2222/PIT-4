const ServicosContratadosModel = require("../models/servicosContratadosModel"); // A model de Service
const UsuarioModel = require("../models/usuarioModel");
const cookieParser = require('cookie-parser');
const CheckinModel = require("../models/checkInModel");
const ServiceModel = require('../models/serviceModel');

class ContratarServicoController {

    // Exibe a lista de serviços
    async serviceView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;

        let checkin = new CheckinModel();
        let listaCheckins = await checkin.obterCheckins()

        let servicos = new ServiceModel();
        let servicosExistentes = await servicos.obterServices();

        let servicosContratados = new ServicosContratadosModel();
        let listaServicos = await servicosContratados.obterServicosContratados();

        res.render('service/listar', {servicosExistentes: servicosExistentes, listaServicos: listaServicos, listaCheckin: listaCheckins, usuario: usuario, layout: 'layoutADM' });
    }

    // Exibe o formulário de cadastro de serviço
    async cadastrarView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        let servicos = new ServicosContratadosModel();
        let listaServicos = await servicos.obterServicosContratados();
        res.render('service/cadastrar', { listaServicos: listaServicos, usuario: usuario, layout: 'layoutADM' });
    }

    // Realiza o cadastro de um novo serviço
    async contratarServico(req, res) {
        let servico = new ServicosContratadosModel();
        let id = req.params.id;

        try {
            let resultado = await servico.gravarServicoContratado(id);
            if (resultado) {
                return res.send({ ok: true, message: "Serviço registrado com sucesso" });
            } else {
                return res.send({ ok: false, message: "Falha ao registrar o serviço" });
            }
        } catch (error) {
            return res.send({ ok: false, message: "Erro ao cadastrar o serviço", error });
        }
    }
}
module.exports = ContratarServicoController;