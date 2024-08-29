const express = require('express');
const ProdutoController = require('../controllers/produtoController');

class ProdutoRoute {

    #router;

    get router(){
        return this.#router;
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new ProdutoController();
        this.#router.get('/', ctrl.listarView);
        this.#router.get('/obter/:id', ctrl.obterProduto);
        this.#router.get('/cadastrar', ctrl.cadastrarView);
        this.#router.post('/cadastrar', ctrl.cadastrar);
        this.#router.post('/excluir', ctrl.excluir);
        this.#router.get('/alterar/:id', ctrl.alterarView);
        this.#router.post('/alterar', ctrl.alterar);
    }
}

module.exports = ProdutoRoute