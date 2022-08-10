import express from 'express';
import homeControllers from '../controllers/homeControllers'
let router = express.Router();


let initWebRoutes = (app) => {
    router.get('/',homeControllers.getHomePage)
    router.get('/crud',homeControllers.getCRUD)
    router.post('/post-crud',homeControllers.postCrud)
    router.get('/get-crud',homeControllers.displayGetCrud)
    router.get('/edit-crud',homeControllers.getEditCRUD)
    router.post('/put-crud',homeControllers.putCRUD)
    router.get('/delete-crud',homeControllers.deleteCRUD)
    return app.use('/',router)
}

module.exports = initWebRoutes;