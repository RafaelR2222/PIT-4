const express = require('express');
const CompraController = require('../controllers/compraController');

class CompraRoute {

    #router;

    get router(){
        return this.#router;
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new CompraController();
        this.#router.get('/', ctrl.listarView);
        this.#router.post('/listar', ctrl.listarCompras);  
        this.#router.get('/visualizar/:id', ctrl.visualizarView);   
        this.#router.get('/cadastrar', ctrl.cadastrarView);
        this.#router.post('/gravar-compra', ctrl.gravarCompra);
        this.#router.post('/excluir', ctrl.excluir);
        this.#router.get('/alterar/:id', ctrl.alterarView);
        this.#router.post('/alterar', ctrl.alterar);
    }
}

module.exports = CompraRoute