const express = require('express');
const checkinController = require('../controllers/checkinController');

class checkinRoute{

    #router;

    get router(){
        return this.#router;
    }

    constructor(){

        this.#router = express.Router();

        let ctrl = new checkinController();
        this.#router.get('/', ctrl.checkinView);
        this.#router.get('/listar', ctrl.obterCheckins);
        this.#router.get('/cadastrar', ctrl.cadastrarView);
        this.#router.get('/alterar/:id', ctrl.alterarView);
        this.#router.post('/cadastrar', ctrl.gravarCheckin);
        this.#router.post('/alterar', ctrl.editarCheckin);
        this.#router.post('/excluir', ctrl.excluirCheckin);
       // this.#router.post('/filtrar', ctrl.filtrar);
    }

}

module.exports = checkinRoute;