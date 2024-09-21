const express = require('express');
const QuartoController = require('../controllers/quartoController');

class QuartoRoute {

    #router

    get router() {
        return this.#router;
    }
    set router(router){
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new QuartoController
        this.#router.get("/", ctrl.quartoView)
    }
}

module.exports = QuartoRoute;