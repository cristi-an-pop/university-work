--INSERT

INSERT INTO Customers (customer_id, first_name, last_name, email) VALUES
(1, 'John', 'Doe', 'john.doe@email.com'),
(2, 'Jane', 'Smith', 'jane.smith@email.com'),
(3, 'Cristi', 'Pop', 'cristi.pop@gmail.com'),
(4, 'Stefana', 'Andreica', 'ste.andre@email.com'),
(5, 'Bogdan', 'Rad', 'br@email.com'),
(6, 'Diana', 'Orania', 'diana@email.com'),
(7, 'Bogdan', 'Maris', 'bmaris@gmail.com'),
(8, 'Dorian', 'Popa', 'meta@ok.com'),
(9, 'Vali', 'Spaidar', 'faza@lunga.com'),
(10, 'Cristi', 'Spaidar', 'faza@scurta.com');

INSERT INTO Brands (brand_name, quality) VALUES
('Trek', 4),
('SantaCruz', 5),
('Specialized', 4),
('Giant', 3),
('BTWIN', 2),
('Cannondale', 4),
('Cube', 4),
('DHS', 2);

INSERT INTO Bikes (bike_id, brand, model_name, bike_description, price, stock_quantity) VALUES
(1, 'SantaCruz', 'Hightower', 'bicicleta de boieri', 5000, 100),
(2, 'Trek', 'Supercaliber', 'xc', 3500, 80),
(3, 'BTWIN', 'Rockclimber', 'xc', 1500, 50),
(4, 'Giant', 'Downhill', 'downhill', 3500, 30),
(5, 'Giant', 'XC', '', 3000, 25),
(6, 'SantaCruz', 'Nomad', '', 5500, 35),
(7, 'SantaCruz', '5010', '5010', 3440, 30),
(8, 'DHS', 'MountainRider', '', 400, 65),
(9, 'Cannondale', 'Monterra', 'Trail Bike', 3500, 80),
(10, 'Cube', 'Trail', 'Trail Bike', 3300, 40),
(11, 'Cube', 'TWO15', 'bicicleta de boieri', 5000, 100);

INSERT INTO Stores (store_id, store_location) VALUES
(12, 'Cluj-Napoca'),
(10, 'Bucharest'),
(50, 'Budapest-North'),
(32, 'London-Green'),
(55, 'Milan'),
(33, 'Rome');

INSERT INTO Relation_CustomersStore (customer_id, store_id) VALUES
(1, 12),
(1, 55),
(5, 32),
(8, 33),
(9, 10),
(10, 10);

INSERT INTO Orders (order_id, customer_id, total_amount) VALUES
(101, 3, 500); -- violation

INSERT INTO Orders(order_id, customer_id, total_amount) VALUES
(2, 3, 3500),
(3, 4, 4000),
(43, 5, 5500),
(20, 4, 6000),
(10, 8, 3000),
(9, 10, 2500);

INSERT INTO Orders(order_id, customer_id, total_amount) VALUES
(11, 3, 4000);

INSERT INTO Suppliers(supplier_id, supplier_name) VALUES
(23, 'SCMac'),
(12, 'BikesGlobal'),
(1, 'CubeDistribution');

UPDATE Suppliers SET supplier_name = 'Cube' WHERE supplier_name = 'CubeDistribution';

INSERT INTO Relation_SuppliersStores(supplier_id, store_id) VALUES
(1, 10),
(23, 12),
(12, 33);

--UPDATE

UPDATE Customers
SET email = 'new.email@email.com'
WHERE customer_id = 1 OR first_name='Cristi';

UPDATE Brands
SET quality = 3
WHERE brand_name = 'Trek' AND quality > 2;

UPDATE Orders
SET total_amount = 3500
WHERE order_id BETWEEN 2 AND 5;

--

--DELETE

DELETE FROM Customers
WHERE email LIKE '%gmail.com%';

DELETE FROM Customers
WHERE email IS NULL;

DELETE FROM Bikes
WHERE bike_id = 2;

DELETE FROM Customers
WHERE customer_id IN (4, 6, 8);

--a

-- Retrieve the unique brand names and model names associated with the 'Giant' brand.
SELECT brand_name FROM Brands WHERE Brands.brand_name = 'Giant'
UNION
SELECT model_name FROM Bikes WHERE Bikes.brand = 'Giant';

-- Retrieve all occurrences of brand names and model names associated with the 'Giant' brand.
SELECT brand_name FROM Brands WHERE Brands.brand_name = 'Giant' OR Brands.brand_name = 'BTWIN'
UNION ALL
SELECT model_name FROM Bikes WHERE Bikes.brand = 'Giant';

--b

-- Retrieve the brand names that exist both in the 'Brands' table and in the 'Bikes' table.
SELECT brand_name FROM Brands
INTERSECT
SELECT DISTINCT brand FROM Bikes

-- Retrieve the customer IDs from the 'Orders' table for customers that also exist in the 'Customers' table.
SELECT TOP(5) customer_id
FROM Orders
WHERE customer_id IN (SELECT customer_id FROM Customers)
ORDER BY Orders.total_amount;

--c

-- Retrieve customer IDs from the 'Customers' table that do not exist in the 'Orders' table.
SELECT DISTINCT TOP(3) customer_id
FROM Customers
EXCEPT
SELECT customer_id
FROM Orders;

-- Retrieve customer IDs from the 'Customers' table for customers who are not found in the 'Orders' table).
SELECT customer_id
FROM Customers
WHERE customer_id NOT IN (SELECT customer_id FROM Orders)
ORDER BY Customers.customer_id;

--d

-- Retrieve customer information and their associated store locations
SELECT DISTINCT C.customer_id, C.first_name, C.last_name, S.store_location
FROM Customers AS C
INNER JOIN Relation_CustomersStore AS R ON C.customer_id = R.customer_id
INNER JOIN Stores AS S ON R.store_id = S.store_id;

-- Retrieve customer information and their associated store locations, including customers without a store association.
SELECT C.customer_id, C.first_name, C.last_name, S.store_location
FROM Customers AS C
LEFT JOIN Relation_CustomersStore AS R ON C.customer_id = R.customer_id
LEFT JOIN Stores AS S ON R.store_id = S.store_id;

-- Retrieve supplier information and the store locations they supply to.
SELECT S.supplier_id, S.supplier_name, ST.store_id, ST.store_location
FROM Suppliers AS S
RIGHT JOIN Relation_SuppliersStores AS RS ON S.supplier_id = RS.supplier_id
RIGHT JOIN Stores AS ST ON RS.store_id = ST.store_id;

-- Retrieve customer information and their associated store locations, including customers without a store association and stores without customer associations.
SELECT DISTINCT C.customer_id, C.first_name, C.last_name, S.store_location
FROM Customers AS C
FULL JOIN Relation_CustomersStore AS R ON C.customer_id = R.customer_id
FULL JOIN Stores AS S ON R.store_id = S.store_id;

--e

-- Retrieve information for customers who have placed orders with a total amount greater than the average total amount of all orders.
SELECT customer_id, first_name, last_name
FROM Customers
WHERE customer_id IN (
    SELECT customer_id
    FROM Orders
    WHERE total_amount > (
        SELECT AVG(total_amount)
        FROM Orders
    )
);

-- Retrieve information for customers who have placed orders with a total amount greater than their own maximum total amount.
SELECT customer_id, first_name, last_name
FROM Customers
WHERE customer_id IN (
    SELECT customer_id
    FROM Orders
    WHERE total_amount >= (
        SELECT MAX(total_amount)
        FROM Orders
        WHERE customer_id = Customers.customer_id
    )
);

--f

-- Retrieve information for customers who have placed orders.
SELECT customer_id, first_name, last_name
FROM Customers AS C
WHERE EXISTS (
    SELECT 1
    FROM Orders AS O
    WHERE O.customer_id = C.customer_id
);

-- Retrieve information for customers who have not placed any orders.
SELECT customer_id, first_name, last_name
FROM Customers AS C
WHERE NOT EXISTS (
    SELECT 1
    FROM Orders AS O
    WHERE O.customer_id = C.customer_id
);

--g

-- Retrieve the total stock quantity for each bike brand.
SELECT B.brand, SUM(B.stock_quantity) AS total_stock
FROM (
    SELECT brand, stock_quantity
    FROM Bikes
) AS B
GROUP BY B.brand;

-- Retrieve customer information and their average total order amount using a subquery in a JOIN operation.
SELECT c.customer_id, c.first_name, c.last_name, o.avg_total_amount
FROM Customers c
JOIN (SELECT customer_id, AVG(total_amount) AS avg_total_amount
      FROM Orders
      GROUP BY customer_id) o
ON c.customer_id = o.customer_id;

--h

-- Retrieve the total stock quantity for each bike brand using a subquery.
SELECT B.brand, SUM(B.stock_quantity) AS total_stock
FROM (
    SELECT brand, stock_quantity
    FROM Bikes
) AS B
GROUP BY B.brand;

-- Retrieve the bike brands with an average price greater than the overall average price.
SELECT B.brand, AVG(B.price) AS avg_price
FROM Bikes AS B
GROUP BY B.brand
HAVING AVG(B.price) > (
    SELECT AVG(price)
    FROM Bikes
);

-- Retrieve store locations and the count of customers associated with each location, including stores with at least two customers.
SELECT S.store_location, COUNT(C.customer_id) AS customer_count
FROM Stores AS S
LEFT JOIN Relation_CustomersStore AS R ON S.store_id = R.store_id
LEFT JOIN Customers AS C ON R.customer_id = C.customer_id
GROUP BY S.store_location
HAVING COUNT(C.customer_id) >= 2;

-- Retrieve customer information and the maximum total order amount for customers with the highest order amount.
SELECT C.customer_id, C.first_name, C.last_name, MAX(O.total_amount) AS max_total_amount
FROM Customers AS C
LEFT JOIN Orders AS O ON C.customer_id = O.customer_id
GROUP BY C.customer_id, C.first_name, C.last_name
HAVING MAX(O.total_amount) = (
    SELECT MAX(total_amount)
    FROM Orders
);

--i

-- Retrieve the first names and last names of customers who have placed orders with a total amount greater than 3000.
SELECT first_name, last_name
FROM Customers
WHERE customer_id = ANY (SELECT customer_id FROM Orders WHERE total_amount > 3000);

-- Retrieve the first names and last names of customers who have placed orders with a total amount greater than 3000 for all their orders.
SELECT first_name, last_name
FROM Customers
WHERE customer_id = ALL (SELECT customer_id FROM Orders WHERE total_amount > 3000);

-- Retrieve the first names and last names of customers named 'Cristi' who have placed orders with a total amount greater than 3000.
SELECT first_name, last_name
FROM Customers
WHERE customer_id = ANY (SELECT customer_id FROM Orders WHERE total_amount > 3000)
  AND first_name = 'Cristi';

-- Retrieve the first names and last names of customers with the last name 'Spaidar' who have placed orders with a total amount greater than 3000 for all their orders.
SELECT first_name, last_name
FROM Customers
WHERE customer_id = ALL (SELECT customer_id FROM Orders WHERE total_amount > 3000)
  AND last_name = 'Spaidar';

SELECT first_name, last_name
FROM Customers
WHERE customer_id IN (SELECT customer_id FROM Orders WHERE total_amount > 3000);

SELECT C.first_name, C.last_name	
FROM Customers AS C
WHERE EXISTS (
    SELECT 1
    FROM Orders AS O
    WHERE O.customer_id = C.customer_id
    GROUP BY O.customer_id
    HAVING MIN(O.total_amount) > 3000
)
AND C.last_name = 'Spaidar';

SELECT first_name, last_name
FROM Customers
WHERE first_name = 'Cristi'
AND customer_id NOT IN (SELECT customer_id FROM Orders WHERE total_amount > 3000);
