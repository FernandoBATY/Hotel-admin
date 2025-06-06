const API_BASE_URL = 'http://192.168.1.9:3000/api';

async function cargarPedidos() {
    try {
        const res = await fetch(`${API_BASE_URL}/pedidos`);
        if (!res.ok) throw new Error('No se pudieron cargar los pedidos');
        const pedidos = await res.json();
        const tbody = document.getElementById('pedidosTableBody');
        tbody.innerHTML = '';

        pedidos.forEach(pedido => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pedido.pedido_id}</td>
                <td>${pedido.reserva_id}</td>
                <td>${pedido.cliente_nombre || ''}</td>
                <td>${pedido.habitacion_tipo || ''}</td>
                <td>$${parseFloat(pedido.total).toFixed(2)}</td>
                <td class="estado-${pedido.estado.toLowerCase()}">${pedido.estado}</td>
                <td>
                    <button onclick="verDetalles(${pedido.pedido_id})">Ver detalles</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        alert('Error al cargar los pedidos');
    }
}

async function verDetalles(pedidoId) {
    abrirModal('Cargando...');
    try {
        const res = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}`);
        if (!res.ok) throw new Error('No se pudo cargar el detalle');
        const pedido = await res.json();
        let html = `
            <h2>Detalles del Pedido</h2>
            <p><strong>Pedido ID:</strong> ${pedido.pedido_id}</p>
            <p><strong>Cliente:</strong> ${pedido.cliente_nombre || ''}</p>
            <p><strong>Habitación:</strong> ${pedido.habitacion_tipo || ''}</p>
            <p><strong>Reservación:</strong> ${pedido.reserva_id}</p>
            <p><strong>Estado:</strong> ${pedido.estado}</p>
            <p><strong>Fecha entrada:</strong> ${pedido.fecha_entrada ? new Date(pedido.fecha_entrada).toLocaleString() : ''}</p>
            <p><strong>Fecha salida:</strong> ${pedido.fecha_salida ? new Date(pedido.fecha_salida).toLocaleString() : ''}</p>
            <hr>
            <strong>Platillos pedidos:</strong>
            <ul>
        `;
        pedido.items.forEach(item => {
            html += `<li>${item.platillo_nombre} x${item.cantidad} - $${parseFloat(item.subtotal).toFixed(2)}</li>`;
        });
        html += `</ul>
            <p><strong>Total:</strong> $${parseFloat(pedido.total).toFixed(2)}</p>
            <p><strong>Entregar en:</strong> Habitación ${pedido.habitacion_tipo || ''}</p>
        `;
        abrirModal(html);
    } catch (err) {
        abrirModal('Error al cargar el detalle');
    }
}

function abrirModal(html) {
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('modalBg').classList.add('active');
}
function cerrarModal() {
    document.getElementById('modalBg').classList.remove('active');
}
// Cerrar modal al hacer click fuera del contenido
document.getElementById('modalBg').onclick = function(e) {
    if (e.target === this) cerrarModal();
};

cargarPedidos();
