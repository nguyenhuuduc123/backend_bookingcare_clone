import express from 'express';
import homeControllers from '../controllers/homeControllers'
import userController from '../controllers/userController'
let router = express.Router();


let initWebRoutes = (app) => {
    router.get('/',homeControllers.getHomePage)
    router.get('/crud',homeControllers.getCRUD)
    router.post('/post-crud',homeControllers.postCrud)
    router.get('/get-crud',homeControllers.displayGetCrud)
    router.get('/edit-crud',homeControllers.getEditCRUD)
    router.post('/put-crud',homeControllers.putCRUD)
    router.get('/delete-crud',homeControllers.deleteCRUD)
    // api
    router.post('/api/login',userController.handleLogin)
    router.get('/api/get-all-users',userController.handleGetAllUser)
    router.post('/api/create-new-user',userController.handleCreateNewUser)
    return app.use('/',router)
}

module.exports = initWebRoutes;