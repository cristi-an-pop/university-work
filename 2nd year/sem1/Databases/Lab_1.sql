USE MountainBikesStore
 
CREATE TABLE Bikes 
	(bike_id INT PRIMARY KEY,
	brand VARCHAR(32) NOT NULL,
	model_name VARCHAR(32) NOT NULL,
	bike_description VARCHAR(120),
	price INT CHECK(price >= 1) NOT NULL,
	stock_quantity INT DEFAULT 0,
	CONSTRAINT FK_Bikes_Brands FOREIGN KEY(brand)
							   REFERENCES Brands(brand_name),
	)

CREATE TABLE Customers
	(customer_id INT PRIMARY KEY,
	first_name VARCHAR(24) NOT NULL,
	last_name VARCHAR(24) NOT NULL,
	email VARCHAR(32) NOT NULL,
	)

CREATE TABLE Test
	(test_id INT NOT NULL
	);

CREATE TABLE Brands
	(brand_name VARCHAR(32) PRIMARY KEY,
	quality INT CHECK(quality >= 1 AND quality <= 5)
	)

CREATE TABLE Orders
	(order_id INT PRIMARY KEY,
	customer_id INT,
	CONSTRAINT FK_Orders_Customers FOREIGN KEY(customer_id)
								   REFERENCES Customers(customer_id),
	total_amount INT NOT NULL
	)

CREATE TABLE OrderDetails
	(order_id INT NOT NULL,
	bike_id INT NOT NULL,
	quantity INT,
	unit_price INT,
	PRIMARY KEY(order_id, bike_id),
	CONSTRAINT FK_OrderDetails_Orders FOREIGN KEY(order_id)
									  REFERENCES Orders(order_id),
	CONSTRAINT FK_OrderDetails_Bikes FOREIGN KEY(bike_id)
									 REFERENCES Bikes(bike_id)
	)

CREATE TABLE Stores
	(store_id INT PRIMARY KEY,
	store_location VARCHAR(24),
	)

CREATE TABLE Employees
	(employee_id INT PRIMARY KEY,
	first_name VARCHAR(24) NOT NULL,
	last_name VARCHAR(24) NOT NULL,
	job_title VARCHAR(16),
	)

CREATE TABLE BikeReviews
	(review_id INT PRIMARY KEY,
	bike_id INT,
	customer_id INT,
	review_text VARCHAR(220),
	rating INT CHECK (rating >= 1 AND rating <= 5),
	CONSTRAINT FK_BikesReviews_Bikes FOREIGN KEY(bike_id)
									REFERENCES Bikes(bike_id),
	CONSTRAINT FK_BikesReviews_Customers FOREIGN KEY(customer_id)
									REFERENCES Customers(customer_id)
	);

CREATE TABLE Suppliers
	(supplier_id INT PRIMARY KEY,
	supplier_name VARCHAR(32) NOT NULL,
	contract_phone VARCHAR(10)
	);

CREATE TABLE Relation_CustomersStore 
	(customer_id INT NOT NULL,
	store_id INT NOT NULL,
	PRIMARY KEY(customer_id, store_id),
	CONSTRAINT FK_RelationCS_Customers FOREIGN KEY(customer_id)
									   REFERENCES Customers(customer_id),
	CONSTRAINT FK_RelationCS_Stores FOREIGN KEY(store_id)
									REFERENCES Stores(store_id)
	)

CREATE TABLE Relation_SuppliersStores
	(supplier_id INT NOT NULL,
	store_id INT NOT NULL,
	PRIMARY KEY(supplier_id, store_id),
	CONSTRAINT FK_RelationSS_Suppliers FOREIGN KEY(supplier_id)
									   REFERENCES Suppliers(supplier_id),
	CONSTRAINT FK_RelationSS_Stores FOREIGN KEY(store_id)
								    REFERENCES Stores(store_id)
	)