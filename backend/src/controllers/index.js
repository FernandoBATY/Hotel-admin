const { query } = require('../db');

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
            const result = await query(
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
        const { reserva_id, items } = req.body; // items: [{ platillo_id, cantidad }]
        if (!reserva_id || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Datos incompletos o incorrectos para crear el pedido.' });
        }

        const client = await query('BEGIN'); // Iniciar transacción

        try {
            // Obtener precios de los platillos y verificar existencia
            const platilloIds = items.map(item => item.platillo_id);
            const platillosResult = await query(
                `SELECT platillo_id, precio, disponible FROM Platillo WHERE platillo_id = ANY($1::int[])`,
                [platilloIds]
            );

            const platillosMap = new Map(platillosResult.rows.map(p => [p.platillo_id, p]));

            let totalPedido = 0;
            for (const item of items) {
                const platillo = platillosMap.get(item.platillo_id);
                if (!platillo) {
                    throw new Error(`Platillo con ID ${item.platillo_id} no encontrado.`);
                }
                if (!platillo.disponible) {
                    throw new Error(`Platillo ${platillo.nombre} (ID: ${item.platillo_id}) no está disponible.`);
                }
                if (typeof item.cantidad !== 'number' || item.cantidad <= 0) {
                    throw new Error(`Cantidad inválida para el platillo ID ${item.platillo_id}.`);
                }
                totalPedido += platillo.precio * item.cantidad;
            }

            // Insertar en PedidoServicio
            const pedidoResult = await query(
                `INSERT INTO PedidoServicio (reserva_id, fecha_pedido, total, estado)
                 VALUES ($1, CURRENT_TIMESTAMP, $2, 'pendiente') RETURNING *`,
                [reserva_id, totalPedido]
            );
            const nuevoPedido = pedidoResult.rows[0];
            const pedido_id = nuevoPedido.pedido_id;

            // Insertar en DetallePedido
            for (const item of items) {
                const platillo = platillosMap.get(item.platillo_id);
                const subtotal = platillo.precio * item.cantidad;
                await query(
                    `INSERT INTO DetallePedido (pedido_id, platillo_id, cantidad, subtotal)
                     VALUES ($1, $2, $3, $4)`,
                    [pedido_id, item.platillo_id, item.cantidad, subtotal]
                );
            }

            await query('COMMIT'); // Confirmar transacción
            res.status(201).json(nuevoPedido);
        } catch (err) {
            await query('ROLLBACK'); // Revertir transacción en caso de error
            res.status(500).json({ error: 'Error al crear pedido', details: err.message });
        }
    }

    // Obtener todos los pedidos (para Admin)
    async getAllPedidos(req, res) {
        try {
            const result = await query(
                `SELECT ps.*,
                        c.nombre AS cliente_nombre,
                        h.tipo AS habitacion_tipo, 
                        r.fecha_entrada, r.fecha_salida
                 FROM PedidoServicio ps
                 JOIN Reservacion r ON ps.reserva_id = r.reserva_id
                 JOIN Cliente c ON r.cliente_id = c.cliente_id
                 JOIN Habitacion h ON r.habitacion_id = h.habitacion_id
                 ORDER BY ps.fecha_pedido DESC`
            );
            res.json(result.rows);
        } catch (err) {
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
}

module.exports = IndexController;