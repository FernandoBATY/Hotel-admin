CREATE TABLE Cliente (
  cliente_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  correo TEXT UNIQUE NOT NULL,
  contrasena TEXT NOT NULL
);

CREATE TABLE Habitacion (
  habitacion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero INT NOT NULL UNIQUE, 
  tipo TEXT NOT NULL,
  precio DECIMAL NOT NULL,
  disponible BOOLEAN DEFAULT TRUE
);

CREATE TABLE Reservacion (
  reserva_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES Cliente(cliente_id),
  habitacion_id UUID REFERENCES Habitacion(habitacion_id),
  fecha_entrada DATE NOT NULL,
  fecha_salida DATE NOT NULL,
  estado TEXT DEFAULT 'pendiente',
  precio DECIMAL NOT NULL
);

CREATE TABLE Platillo (
  platillo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL NOT NULL,
  disponible BOOLEAN DEFAULT TRUE,
  categoria TEXT NOT NULL
);

CREATE TABLE PedidoServicio (
  pedido_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reserva_id UUID REFERENCES Reservacion(reserva_id),
  fecha_hora TIMESTAMP DEFAULT now(),
  estado TEXT DEFAULT 'pendiente',
  total DECIMAL
);

CREATE TABLE DetallePedido (
  detalle_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID REFERENCES PedidoServicio(pedido_id),
  platillo_id UUID REFERENCES Platillo(platillo_id),
  cantidad INT,
  subtotal DECIMAL
);

CREATE TABLE ArticulosPersonales (
  articulo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL NOT NULL,
  disponible BOOLEAN DEFAULT TRUE
);

CREATE TABLE DetalleArticuloPedido (
  detalle_articulo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID REFERENCES PedidoServicio(pedido_id),
  articulo_id UUID REFERENCES ArticulosPersonales(articulo_id),
  cantidad INT,
  subtotal DECIMAL
);
