USE Lab3_DBMS
DROP TABLE StoreTransaction;
DROP TABLE Customer;
DROP TABLE Store;

CREATE TABLE Store (
	id INT NOT NULL PRIMARY KEY,
	address VARCHAR(30) NOT NULL,
	nr_of_bikes INT
);

CREATE TABLE Customer (
	id INT NOT NULL PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	age INT,
	nr_of_bought_bikes INT
);

CREATE TABLE StoreTransaction (
	store_id INT NOT NULL,
	customer_id INT NOT NULL,
	price INT,
	FOREIGN KEY (store_id) REFERENCES Store(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (customer_id) REFERENCES Customer(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT pk_transaction PRIMARY KEY (store_id, customer_id)
);

INSERT INTO Store VALUES(1, 'Str. Napoca, nr. 30', 100);
DELETE FROM Store WHERE id = 1;
