const express = require('express');
const checkoutController = require('../controllers/checkoutController');

class CheckOutRoute {

    #router;

    get router() {
        return this.#router;
    }

    constructor(){

        this.#router = express.Router();

        let ctrl = new checkoutController();

        this.#router.get('/', ctrl.checkoutView);
        this.#router.get('/buscarIdCheckout/:id', ctrl.obterIdCheckout)
        this.#router.get('/listar', ctrl.obterCheckouts);
        this.#router.get('/listarCheckout/:id', ctrl.obterCheckinPorId);
        this.#router.get('/trazerCheckout/:id', ctrl.obterCheckoutPorId);
        this.#router.get('/cadastrar', ctrl.cadastrarView);
        this.#router.get('/alterar', ctrl.alterarView);
        //this.#router.get('/listarCheckoutPorEmail/:email', ctrl.obterCheckoutPorEmail);
        this.#router.post('/cadastrar', ctrl.gravarCheckout);
        this.#router.post('/alterar', ctrl.gravarCheckout);
        this.#router.post('/excluir', ctrl.excluirCheckout);

    }

}

module.exports = CheckOutRoute;
