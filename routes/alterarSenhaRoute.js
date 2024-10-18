const express = require('express');
const RedefinirSenhaController = require('../controllers/redefinirSenhaController');

class AlterarSenhaRoute {
    #router;

    get router() {
        return this.#router;
    }

    constructor() {
        this.#router = express.Router();
        
        const ctrl = new RedefinirSenhaController();
        this.#router.get("/", ctrl.senhaNovaView); // Bind the controller context
        // this.#router.get("/redefinicao", ctrl.redefinicaoView.bind(ctrl)); // Se necessário

    }
}

module.exports = AlterarSenhaRoute;
