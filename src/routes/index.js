import express from 'express';
import homeControllers from '../controllers/homeControllers'
let router = express.Router();


let initWebRoutes = (app) => {
    router.get('/',homeControllers.getHomePage)
    router.get('/crud',homeControllers.getCRUD)
    router.post('/post-crud',homeControllers.postCrud)
    router.get('/get-crud',homeControllers.displayGetCrud)
    return app.use('/',router)
}

module.exports = initWebRoutes;