const express = require('express');
const ReservaController = require('../controllers/reservaController');

class ReservaRoute {

    #router

    get router() {
        return this.#router;
    }
    set router(router){
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new ReservaController
        this.#router.get("/", ctrl.reservaView)
    }
}

module.exports = ReservaRoute;