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

        let ctrl = new ReservaController;
        this.#router.get("/", ctrl.reservaView);
        this.#router.get("/reservas",ctrl.listarView);
        this.#router.get("/alterar/:id" , ctrl.alterarView);
        this.#router.get("/obter/:id", ctrl.obterReserva); // obter reservas por ID
        this.#router.post("/listar", ctrl.listarReservas); // obter todas as reservas ou por termo e busca
        this.#router.post("/gravar", ctrl.gravarReserva);
        this.#router.put("/editar/:id", ctrl.editarReserva);
        this.#router.delete("/deletar/:id", ctrl.excluirReserva);

    }
}

module.exports = ReservaRoute;