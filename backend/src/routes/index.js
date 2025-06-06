const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/index');
const controller = new IndexController();

// Rutas de reservaciones
router.get('/api/reservations', controller.getAllReservations);
router.post('/api/reservations', controller.createReservation);
router.get('/api/reservations/:id', controller.getReservationById);
router.put('/api/reservations/:id', controller.updateReservation);
router.delete('/api/reservations/:id', controller.deleteReservation);

// Rutas de platillos
router.get('/api/platillos', controller.getAllPlatillos);

// Rutas de pedidos
router.post('/api/pedidos', controller.createPedido);
router.get('/api/pedidos', controller.getAllPedidos);
router.get('/api/pedidos/:id', controller.getPedidoById);

// Rutas de QR
router.get('/api/qr-login/:qr_token', controller.handleQrLogin);
router.get('/api/reservations/:reserva_id/qr', controller.generateQrTokenForReservation);

module.exports = router;