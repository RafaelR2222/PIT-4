const express = require('express');
const RedefinirSenhaController = require('../controllers/redefinirSenhaController');

class RedefinirSenhaRoute {
    #router;

    get router() {
        return this.#router;
    }

    constructor() {
        this.#router = express.Router();
        
        const ctrl = new RedefinirSenhaController();
        this.#router.post("/obter", ctrl.obterTokenPorEmail);
        this.#router.post("/buscar", ctrl.obterUsuarioPorEmail);
        this.#router.post("/enviarToken", ctrl.enviarTokenPorEmail);
        this.#router.post("/verificarToken", ctrl.verificarTokenValido)
        this.#router.get("/", ctrl.redefinicaoView);
        this.#router.get("/novaSenha", ctrl.senhaNovaView); // Bind the controller context
        // this.#router.get("/redefinicao", ctrl.redefinicaoView.bind(ctrl)); // Se necessário
        this.#router.put("/alterarSenha", ctrl.alterarSenha)
    }
}

module.exports = RedefinirSenhaRoute;
