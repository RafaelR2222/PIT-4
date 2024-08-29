const express = require('express');
const BlogController = require('../controllers/BlogController');

class BlogRoute {

    #router

    get router() {
        return this.#router;
    }
    set router(router){
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new BlogController
        this.#router.get("/", ctrl.blogView)
    }
}

module.exports = BlogRoute;