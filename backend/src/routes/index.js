const express = require('express');
const IndexController = require('../controllers/index');

const setRoutes = (app) => {
    const router = express.Router();
    const indexController = new IndexController();

    router.get('/reservations', indexController.getAllReservations);
    router.post('/reservations', indexController.createReservation);
    router.get('/reservations/:id', indexController.getReservationById);
    router.put('/reservations/:id', indexController.updateReservation);
    router.delete('/reservations/:id', indexController.deleteReservation);

    router.get('/platillos', indexController.getAllPlatillos);

    router.post('/pedidos', indexController.createPedido);
    router.get('/pedidos', indexController.getAllPedidos);
    router.get('/pedidos/:id', indexController.getPedidoById);

    app.use('/api', router);
};

module.exports = setRoutes;