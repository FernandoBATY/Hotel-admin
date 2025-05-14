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
}

module.exports = IndexController;