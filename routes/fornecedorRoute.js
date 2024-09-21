const express = require('express');
const fornecedorController = require('../controllers/fornecedorController');
class fornecedorRoute{

    #router;

    get router(){
        return this.#router;
    }

    constructor(){

        this.#router = express.Router();

        let ctrl = new fornecedorController();
        this.#router.get('/', ctrl.listarView);
        this.#router.get('/listar', ctrl.obterFornecedor);
        this.#router.get('/cadastrar', ctrl.cadastrarView);
        this.#router.post('/cadastrar', ctrl.cadastrar);
        this.#router.get('/alterar/:id', ctrl.alterarView);
        this.#router.post('/alterar', ctrl.alterar);
        this.#router.post('/excluir', ctrl.excluir);
        this.#router.post('/filtrar', ctrl.filtrar);
    }

}

module.exports = fornecedorRoute;