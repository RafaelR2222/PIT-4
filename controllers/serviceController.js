const ServiceModel = require("../models/serviceModel"); // A model de Service
const UsuarioModel = require("../models/usuarioModel");
const cookieParser = require('cookie-parser');

class ServiceController {

    // Exibe a lista de serviços
    async serviceView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        let service = new ServiceModel();
        let listaServices = await service.obterServices();
        res.render('service/listar', { lista: listaServices, usuario: usuario, layout: 'layoutADM' });
    }

    // Exibe o formulário de cadastro de serviço
    cadastrarView(req, res) {
        const usuarioCodificado = req.cookies.usuarioAtual;
        let usuario = usuarioCodificado ? decodeURIComponent(usuarioCodificado) : null;
        res.render('service/cadastrar', { usuario: usuario, layout: 'layoutADM' });
    }

    // Realiza o cadastro de um novo serviço
    async gravarService(req, res) {
        let service = new ServiceModel();
        service.servDesc = req.body.servDesc;
        service.servVal = req.body.servVal;

        try {
            let resultado = await service.gravarService();
            if (resultado) {
                return res.send({ ok: true, message: "Serviço registrado com sucesso" });
            } else {
                return res.send({ ok: false, message: "Falha ao registrar o serviço" });
            }
        } catch (error) {
            return res.send({ ok: false, message: "Erro ao cadastrar o serviço", error });
        }
    }

    // Obter todos os serviços
    async obterServices(req, res) {
        let service = new ServiceModel();
        let listaServices = await service.obterServices();
        return res.send({ listaServices });
    }

    // Obter detalhes de um serviço específico
    async obterServicePorId(req, res) {
        let service = new ServiceModel();
        let serviceDetalhado = await service.obterServicesPorId(req.params.id);
        return res.send({ service: serviceDetalhado });
    }

    async obterServicePorIdCliente(req, res) {
        let service = new ServiceModel();
        let serviceDetalhado = await service.obterServicesPorIdCliente(req.body.id);
        return res.send({ service: serviceDetalhado });
    }

    // Excluir um serviço
    async excluirService(req, res) {
        let service = new ServiceModel();
        let resultado = await service.deletarService(req.body.id);
        if (resultado) {
            return res.send({ ok: true, message: "Serviço excluído com sucesso" });
        } else {
            return res.send({ ok: false, message: "Falha ao excluir o serviço" });
        }
    }

    // Editar um serviço
    async editarService(req, res) {
        let service = new ServiceModel();
        service.servId = req.params.id;
        service.servDesc = req.body.servDesc;
        service.servVal = req.body.servVal;

        let resultado = await service.editarService();
        if (resultado) {
            return res.send({ ok: true, message: "Serviço editado com sucesso" });
        } else {
            return res.send({ ok: false, message: "Falha ao editar o serviço" });
        }
    }
}

module.exports = ServiceController;
