
-- Individual: 3 habitaciones, $350
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 1, 'individual', 350, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 2, 'individual', 350, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 3, 'individual', 350, TRUE);

-- Sencilla: 5 habitaciones, $350
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 4, 'sencilla', 350, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 5, 'sencilla', 350, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 6, 'sencilla', 350, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 7, 'sencilla', 350, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 8, 'sencilla', 350, TRUE);

-- Balcón: 4 habitaciones, $450
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 9, 'balcon', 450, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 10, 'balcon', 450, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 11, 'balcon', 450, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 12, 'balcon', 450, TRUE);

-- Doble sencilla: 5 habitaciones, $500
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 13, 'doble_sencilla', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 14, 'doble_sencilla', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 15, 'doble_sencilla', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 16, 'doble_sencilla', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 17, 'doble_sencilla', 500, TRUE);

-- Doble matrimonial: 5 habitaciones, $500
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 18, 'doble_matrimonial', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 19, 'doble_matrimonial', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 20, 'doble_matrimonial', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 21, 'doble_matrimonial', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 22, 'doble_matrimonial', 500, TRUE);

-- Jacuzzi: 3 habitaciones, $700
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 23, 'jacuzzi', 700, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 24, 'jacuzzi', 700, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 25, 'jacuzzi', 700, TRUE);

-- Kingsize: 4 habitaciones, $500
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 26, 'kingsize', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 27, 'kingsize', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 28, 'kingsize', 500, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 29, 'kingsize', 500, TRUE);

-- Expréss: 4 habitaciones, $250
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 30, 'express', 250, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 31, 'express', 250, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 32, 'express', 250, TRUE);
INSERT INTO Habitacion (habitacion_id, numero, tipo, precio, disponible) VALUES (gen_random_uuid(), 33, 'express', 250, TRUE);


INSERT INTO ArticulosPersonales (nombre, descripcion, precio, disponible) VALUES
('Shampoo de sobre', 'Shampoo en presentación de sobre', 18, TRUE),
('Shampoo de frasco', 'Shampoo en presentación de frasco', 25, TRUE),
('Pasta de dientes', 'Pasta dental', 25, TRUE),
('Cepillo de dientes', 'Cepillo para dientes', 25, TRUE),
('Cepillo para cabello', 'Cepillo para peinar el cabello', 25, TRUE),
('Peine', 'Peine para el cabello', 25, TRUE),
('Gel', 'Gel para el cabello', 25, TRUE),
('Crema', 'Crema para la piel', 25, TRUE),
('Estropajo', 'Estropajo para la limpieza', 25, TRUE),
('Rastrillo', 'Rastrillo para afeitar', 25, TRUE),
('Toallas sanitarias', 'Toallas higiénicas', 25, TRUE),
('Condones', 'Condones', 35, TRUE),
('Renta de cobija', 'Cobija para alquiler', 50, TRUE),
('Renta de toalla', 'Toalla para alquiler', 20, TRUE);


INSERT INTO Platillo (nombre, descripcion, precio, categoria) VALUES
-- Desayunos
('Desayuno Regional', 'Enchiladas suizas, Enmoladas', 120, 'Desayuno'),
('Desayuno Mexicano', 'Enchiladas (verde, rojas, o gratinadas), Chilaquiles', 100, 'Desayuno'),
('Desayuno Estudiantil', 'Sándwich de pollo (papas a la francesa), Sándwich de un case (papas a la francesa), Croissant de jamón y queso (papas a la francesa)', 100, 'Desayuno'),
('Desayuno Ranchero', 'Huevos rancheros, Bistec al gusto (mexicana, a la plancha)', 100, 'Desayuno'),
('Desayuno Omelette', 'Omelette de pollo, Omelette de verduras al vapor, Omelette de jamón con queso, Omelette de chorizo con queso', 100, 'Desayuno'),
('Desayuno Continental', 'Huevos al gusto (jamón, chorizo, estrellados a la mexicana)', 100, 'Desayuno'),
('Desayuno Feliz', 'Hot cakes, Waffles', 100, 'Desayuno'),

-- Bebidas Calientes
('Café de olla', 'Bebida caliente tradicional mexicana', 25, 'Bebidas'),
('Café americano', 'Café filtrado', 30, 'Bebidas'),
('Capuchino', 'Café con leche espumosa', 50, 'Bebidas'),
('Chocolate caliente', 'Bebida caliente de chocolate', 35, 'Bebidas'),
('Tisanas', 'Infusión de hierbas', 50, 'Bebidas'),

-- Jugos
('Jugo de naranja', 'Jugo fresco de naranja', 35, 'Bebidas'),
('Jugo de zanahoria', 'Jugo fresco de zanahoria', 35, 'Bebidas'),
('Jugo verde', 'Jugo verde natural', 45, 'Bebidas'),

-- Bebidas Frías
('Limonada natural', 'Limonada natural', 40, 'Bebidas'),
('Limonada mineral', 'Limonada con agua mineral', 45, 'Bebidas'),
('Naranjada natural', 'Jugo fresco de naranja', 40, 'Bebidas'),
('Naranjada mineral', 'Jugo de naranja con agua mineral', 45, 'Bebidas'),
('Refresco', 'Bebida gaseosa', 30, 'Bebidas'),
('Frappe café', 'Bebida fría de café', 50, 'Bebidas'),
('Frappe oreo', 'Bebida fría de oreo', 60, 'Bebidas'),
('Frappe vainilla', 'Bebida fría de vainilla', 60, 'Bebidas'),
('Frappe de gansito', 'Bebida fría de gansito', 70, 'Bebidas'),
('Jarra de agua', 'Agua fresca', 15, 'Bebidas'),
('Agua embotellada', 'Agua embotellada', 15, 'Bebidas'),

-- Snacks
('Hamburguesa con papas', 'Hamburguesa servida con papas fritas', 95, 'Snacks'),
('Papas a la francesa', 'Papas fritas', 60, 'Snacks'),
('Nuggets', 'Pechuga de pollo empanada', 50, 'Snacks'),

-- Sopas
('Sopa Azteca', 'Sopa tradicional mexicana', 80, 'Comida'),
('Consomé de pollo', 'Sopa con un trozo de pollo', 90, 'Comida'),
('Pasta hawaiana', 'Pasta con piña y jamón', 50, 'Comida'),

-- Ensaladas
('Ensalada de pollo', 'Ensalada con pollo', 90, 'Comida'),
('Ensalada mixta', 'Ensalada fresca mixta', 90, 'Comida'),

-- Pollo
('Pechuga rellena', 'Pechuga de pollo rellena de verduras al vapor y espagueti', 100, 'Comida'),
('Milanesa de pollo o res', 'Milanesa con frijoles y guacamole', 100, 'Comida'),

-- Especialidades
('Arrachera', 'Carne de res con frijoles, guacamole, arroz y nopales', 180, 'Comida'),
('Tampiqueña', 'Carne de res con frijoles, enchiladas, rajas poblanas y guacamole', 120, 'Comida'),
('Filete de pescado', 'Filete de pescado con arroz y ensalada fresca', 180, 'Comida'),
('Mojarra', 'Pescado frito al mojo de ajo', 180, 'Comida'),
('Molcajete de carnes', 'Molcajete con carnes diversas (cerdo, bistec de res, longaniza, pollo)', 180, 'Comida'),
('Molcajete de carne de pollo', 'Molcajete con carne de pollo', 240, 'Comida'),

-- Extras
('Guacamole', 'Acompañamiento de guacamole', 15, 'Extras'),
('Huevo', 'Huevo al gusto', 15, 'Extras'),

-- Postres
('Copa de helado', 'Helado servido en copa', 40, 'Postres'),
('Duraznos en almibar', 'Duraznos en almíbar', 40, 'Postres'),
('Crepas dulces', 'Crepas rellenas de frutas y crema', 50, 'Postres');