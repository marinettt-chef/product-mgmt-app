CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    picture TEXT,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT
);

INSERT INTO product (name, type, picture, price, description)
VALUES
('Laptop', 'Electronics', 'https://example.com/laptop.jpg', 1200.00, 'A high-performance laptop.'),
('Smartphone', 'Electronics', 'https://example.com/smartphone.jpg', 800.00, 'A sleek and powerful smartphone.'),
('Coffee Maker', 'Home Appliance', 'https://example.com/coffee-maker.jpg', 99.99, 'Brews excellent coffee.');
