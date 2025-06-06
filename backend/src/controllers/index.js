const { query } = require('../db');
const crypto = require('crypto');
const db = require('../db');

class IndexController {
    // Obtener todas las reservaciones con datos de cliente y habitación
    async getAllReservations(req, res) {
        try {
            const result = await query(
                `SELECT r.reserva_id, r.fecha_entrada, r.fecha_salida, r.estado,
                        c.nombre AS cliente_nombre, c.correo AS cliente_correo,
                        h.tipo AS habitacion_tipo, h.precio AS habitacion_precio
                 FROM Reservacion r
                 JOIN Cliente c ON r.cliente_id = c.cliente_id
                 JOIN Habitacion h ON r.habitacion_id = h.habitacion_id
                 ORDER BY r.fecha_entrada DESC`
            );
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener reservaciones', details: err.message });
        }
    }

    // Crear una nueva reservación
    async createReservation(req, res) {
        try {
            const { cliente_id, habitacion_id, fecha_entrada, fecha_salida } = req.body;
            const result = await query(
                `INSERT INTO Reservacion (cliente_id, habitacion_id, fecha_entrada, fecha_salida)
                 VALUES ($1, $2, $3, $4) RETURNING *`,
                [cliente_id, habitacion_id, fecha_entrada, fecha_salida]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear reservación', details: err.message });
        }
    }

    // Obtener reservación por ID
    async getReservationById(req, res) {
        try {
            const { id } = req.params;
            const result = await query(
                `SELECT r.*, c.nombre AS cliente_nombre, h.tipo AS habitacion_tipo
                 FROM Reservacion r
                 JOIN Cliente c ON r.cliente_id = c.cliente_id
                 JOIN Habitacion h ON r.habitacion_id = h.habitacion_id
                 WHERE r.reserva_id = $1`,
                [id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Reservación no encontrada' });
            }
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener reservación', details: err.message });
        }
    }

    // Actualizar reservación
    async updateReservation(req, res) {
        try {
            const { id } = req.params;
            const { fecha_entrada, fecha_salida, estado } = req.body;
            const result = await query(
                `UPDATE Reservacion
                 SET fecha_entrada = $1, fecha_salida = $2, estado = $3
                 WHERE reserva_id = $4
                 RETURNING *`,
                [fecha_entrada, fecha_salida, estado, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Reservación no encontrada' });
            }
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar reservación', details: err.message });
        }
    }

    // Eliminar reservación
    async deleteReservation(req, res) {
        try {
            const { id } = req.params;
            const result = await query(
                `DELETE FROM Reservacion WHERE reserva_id = $1 RETURNING *`,
                [id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Reservación no encontrada' });
            }
            res.json({ message: 'Reservación eliminada' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar reservación', details: err.message });
        }
    }

    // Obtener todos los platillos
    async getAllPlatillos(req, res) {
        try {
            const result = await db.query(
                `SELECT platillo_id, nombre, descripcion, precio, disponible 
                 FROM Platillo 
                 ORDER BY platillo_id ASC`
            );
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener platillos', details: err.message });
        }
    }

    // Crear un nuevo pedido
    async createPedido(req, res) {
        const { reserva_id, items } = req.body;
        const client = await db.getClient();
        let transactionStarted = false;

        try {
            await client.query('BEGIN');
            transactionStarted = true;

            // Inserta el pedido principal - ajustado para usar timestamp sin fecha_pedido
            const pedidoResult = await client.query(
                `INSERT INTO PedidoServicio (reserva_id, total, estado)
                 VALUES ($1, 0, 'pendiente') 
                 RETURNING pedido_id`,
                [reserva_id]
            );

            const pedido_id = pedidoResult.rows[0].pedido_id;
            let total = 0;

            // Procesa cada item
            for (const item of items) {
                const platilloResult = await client.query(
                    'SELECT precio FROM Platillo WHERE platillo_id = $1',
                    [item.platillo_id]
                );

                if (platilloResult.rows.length === 0) {
                    throw new Error(`Platillo ${item.platillo_id} no encontrado`);
                }

                const precio = platilloResult.rows[0].precio;
                const subtotal = precio * item.cantidad;
                total += subtotal;

                await client.query(
                    `INSERT INTO DetallePedido (pedido_id, platillo_id, cantidad, subtotal)
                     VALUES ($1, $2, $3, $4)`,
                     [pedido_id, item.platillo_id, item.cantidad, subtotal]
                );
            }

            // Actualiza el total
            await client.query(
                'UPDATE PedidoServicio SET total = $1 WHERE pedido_id = $2',
                [total, pedido_id]
            );

            await client.query('COMMIT');
            res.status(201).json({
                success: true,
                pedido_id,
                message: 'Pedido creado exitosamente'
            });

        } catch (err) {
            if (transactionStarted) {
                await client.query('ROLLBACK');
            }
            console.error('Error al crear pedido:', err);
            res.status(500).json({ 
                error: 'Error al crear pedido',
                details: err.message 
            });
        } finally {
            client.release();
        }
    }

    // Obtener todos los pedidos (para Admin)
    async getAllPedidos(req, res) {
        try {
            const result = await db.query(
                `SELECT ps.pedido_id, ps.reserva_id, ps.total, ps.estado,
                        c.nombre AS cliente_nombre,
                        h.tipo AS habitacion_tipo
                 FROM PedidoServicio ps
                 JOIN Reservacion r ON ps.reserva_id = r.reserva_id
                 JOIN Cliente c ON r.cliente_id = c.cliente_id
                 JOIN Habitacion h ON r.habitacion_id = h.habitacion_id
                 ORDER BY ps.pedido_id DESC`
            );
            res.json(result.rows);
        } catch (err) {
            console.error('Error al obtener pedidos:', err);
            res.status(500).json({ error: 'Error al obtener pedidos', details: err.message });
        }
    }

    // Obtener un pedido específico con sus detalles (para Admin)
    async getPedidoById(req, res) {
        try {
            const { id } = req.params;
            const pedidoResult = await query(
                `SELECT ps.*,
                        c.nombre AS cliente_nombre,
                        h.tipo AS habitacion_tipo,
                        r.fecha_entrada, r.fecha_salida
                 FROM PedidoServicio ps
                 JOIN Reservacion r ON ps.reserva_id = r.reserva_id
                 JOIN Cliente c ON r.cliente_id = c.cliente_id
                 JOIN Habitacion h ON r.habitacion_id = h.habitacion_id
                 WHERE ps.pedido_id = $1`,
                [id]
            );

            if (pedidoResult.rows.length === 0) {
                return res.status(404).json({ error: 'Pedido no encontrado' });
            }

            const detallesResult = await query(
                `SELECT dp.*, p.nombre AS platillo_nombre, p.precio AS platillo_precio
                 FROM DetallePedido dp
                 JOIN Platillo p ON dp.platillo_id = p.platillo_id
                 WHERE dp.pedido_id = $1`,
                [id]
            );

            const pedido = pedidoResult.rows[0];
            pedido.items = detallesResult.rows;

            res.json(pedido);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener detalle del pedido', details: err.message });
        }
    }

    async handleQrLogin(req, res) {
        try {
            const { qr_token } = req.params;

            if (!qr_token) {
                return res.status(400).json({ error: 'QR token no proporcionado' });
            }

            const result = await query(
                `SELECT reserva_id, estado, fecha_salida
                 FROM Reservacion
                 WHERE qr_token = $1`,
                [qr_token]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Código QR inválido o expirado' });
            }

            const reservation = result.rows[0];

            // Basic check for active reservation (can be expanded)
            // For now, we consider 'activa' or a future 'fecha_salida' as active
            const isActive = reservation.estado === 'activa' || new Date(reservation.fecha_salida) > new Date();

            if (!isActive) {
                return res.status(403).json({ error: 'La reservación asociada al QR no está activa.' });
            }

            // Redirect to room service page with reserva_id
            // Assuming frontend is served from a directory where /room_service.html is accessible at the root
            res.redirect(`/room_service.html?reserva_id=${reservation.reserva_id}`);

        } catch (err) {
            console.error('Error en handleQrLogin:', err);
            res.status(500).json({ error: 'Error al procesar el login con QR', details: err.message });
        }
    }

    async generateQrTokenForReservation(req, res) {
        try {
            const { reserva_id } = req.params;

            if (!reserva_id) {
                return res.status(400).json({ error: 'ID de reservación no proporcionado' });
            }

            // Check if reservation exists
            const reservationResult = await query('SELECT reserva_id FROM Reservacion WHERE reserva_id = $1', [reserva_id]);
            if (reservationResult.rows.length === 0) {
                return res.status(404).json({ error: 'Reservación no encontrada' });
            }

            const qrToken = crypto.randomBytes(16).toString('hex'); // Generate a 32-character hex token
            const expiresInDays = 7; // Token expiry in days
            const qrTokenExpiresAt = new Date();
            qrTokenExpiresAt.setDate(qrTokenExpiresAt.getDate() + expiresInDays);

            const updateResult = await query(
                `UPDATE Reservacion
                 SET qr_token = $1, qr_token_expires_at = $2
                 WHERE reserva_id = $3
                 RETURNING qr_token`,
                [qrToken, qrTokenExpiresAt, reserva_id]
            );

            if (updateResult.rows.length === 0) {
                // This case should ideally not be reached if the initial check passed
                return res.status(500).json({ error: 'Error al actualizar la reservación con el token QR' });
            }

            const newQrToken = updateResult.rows[0].qr_token;
            // Construct the login URL based on typical environment variables or a fixed domain for now
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Adjust as needed
            const loginUrl = `${baseUrl}/api/qr-login/${newQrToken}`;

            res.json({
                qr_token: newQrToken,
                login_url: loginUrl,
                expires_at: qrTokenExpiresAt.toISOString()
            });

        } catch (err) {
            console.error('Error en generateQrTokenForReservation:', err);
            res.status(500).json({ error: 'Error al generar el token QR', details: err.message });
        }
    }
}

module.exports = IndexController;