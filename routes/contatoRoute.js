const express = require('express');
const ContatoController = require('../controllers/contatoController');

class ContatoRoute {

    #router

    get router() {
        return this.#router;
    }
    set router(router){
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new ContatoController
        this.#router.get("/", ctrl.contatoView)
    }
}

module.exports = ContatoRoute;