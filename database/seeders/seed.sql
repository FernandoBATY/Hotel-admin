INSERT INTO hotels (name, location, rating) VALUES
('Hotel Sunshine', 'Miami', 4.5),
('Mountain View Inn', 'Denver', 4.0),
('Ocean Breeze Resort', 'San Diego', 4.8),
('City Center Hotel', 'New York', 4.2),
('Lakeside Retreat', 'Chicago', 4.6);

INSERT INTO rooms (hotel_id, room_number, type, price) VALUES
(1, '101', 'Single', 150.00),
(1, '102', 'Double', 200.00),
(2, '201', 'Suite', 300.00),
(3, '301', 'Single', 180.00),
(4, '401', 'Double', 220.00),
(5, '501', 'Suite', 350.00);

INSERT INTO reservations (room_id, guest_name, check_in_date, check_out_date) VALUES
(1, 'John Doe', '2023-10-01', '2023-10-05'),
(2, 'Jane Smith', '2023-10-10', '2023-10-15'),
(3, 'Alice Johnson', '2023-10-20', '2023-10-25'),
(4, 'Bob Brown', '2023-10-05', '2023-10-10'),
(5, 'Charlie Davis', '2023-10-15', '2023-10-20');