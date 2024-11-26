const express = require('express');
const ContratarServicoController = require('../controllers/servicoContratadoController');

class contratarServicoRoute {
    #router;

    get router() {
        return this.#router;
    }

    constructor() {
        this.#router = express.Router(); // Inicializa o router corretamente
        let ctrl = new ContratarServicoController();

        // Rota para listar todos os serviços
        this.#router.get('/', ctrl.serviceView);

        // // Rota para mostrar o formulário de cadastro de serviço
        // this.#router.get('/cadastrar', ctrl.cadastrarView);

        // Rota para cadastrar um novo serviço
        this.#router.post('/gravar', ctrl.contratarServico);

        // // Rota para obter todos os serviços
        // this.#router.get('/obter', ctrl.obterServices);

        // // Rota para obter os detalhes de um serviço por ID
        // this.#router.get('/obter/:id', ctrl.obterServicePorId);

        // // Rota para obter os detalhes de um serviço por ID do cliente
        // this.#router.get('/obterCliente/:idCliente', ctrl.obterServicePorIdCliente);

        // // Rota para excluir um serviço
        // this.#router.delete('/excluir', ctrl.excluirService);

        // // Rota para editar um serviço
        // this.#router.put('/editar/:id', ctrl.editarService);
    }
}

module.exports = contratarServicoRoute;
