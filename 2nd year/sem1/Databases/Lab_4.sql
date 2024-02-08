USE MountainBikesStore
GO

-- one primary key no foreign key
CREATE TABLE CustomersCOPY
	(customer_id INT PRIMARY KEY,
	first_name VARCHAR(24) NOT NULL,
	last_name VARCHAR(24) NOT NULL,
	email VARCHAR(32) NOT NULL,
	)
GO

-- one primary key one foreign key
CREATE TABLE OrdersCOPY
(order_id INT PRIMARY KEY,
customer_id INT,
CONSTRAINT FK_Orders_CustomersCOPY FOREIGN KEY(customer_id)
								REFERENCES CustomersCOPY(customer_id),
total_amount INT NOT NULL
)
GO

-- one primary key no foreign key
CREATE TABLE StoresCOPY
	(store_id INT PRIMARY KEY,
	store_location VARCHAR(24),
	)
GO

-- multi-column primary key and two foreign keys
CREATE TABLE Relation_CustomersStoreCOPY
	(customer_id INT NOT NULL,
	store_id INT NOT NULL,
	PRIMARY KEY(customer_id, store_id),
	CONSTRAINT FK_RelationCS_CustomersCOPY FOREIGN KEY(customer_id)
									   REFERENCES CustomersCOPY(customer_id),
	CONSTRAINT FK_RelationCS_StoresCOPY FOREIGN KEY(store_id)
									REFERENCES StoresCOPY(store_id)
	)
GO

CREATE OR ALTER PROC deleteFromTable @Table VARCHAR(200)
AS
	IF @Table = 'CustomersCOPY'
	BEGIN
		DELETE FROM dbo.CustomersCOPY;
	END
	ELSE
	IF @Table = 'OrdersCOPY'
	BEGIN
		DELETE FROM dbo.OrdersCOPY;
	END
	ELSE
		IF @Table = 'StoresCOPY'
	BEGIN
		DELETE FROM dbo.StoresCOPY;
	END
	ELSE
	IF @Table = 'Relation_CustomersStoreCOPY'
	BEGIN
		DELETE FROM dbo.Relation_CustomersStoreCOPY;
	END
GO

CREATE OR ALTER PROCEDURE InsertIntoCustomers @maximum INT
AS
BEGIN
	DECLARE @counter INT
	SET @counter = 0

	WHILE @counter < @maximum
	BEGIN
		INSERT INTO CustomersCOPY
		VALUES (@counter, 'first_name', 'last_name', 'email@yahoo.com')

		SET @counter = @counter + 1
	END
END
GO

CREATE OR ALTER PROCEDURE InsertIntoOrders @maximum INT
AS
BEGIN
	DECLARE @counter INT
	SET @counter = 0

	WHILE @counter < @maximum
	BEGIN
		INSERT INTO OrdersCOPY
		VALUES (@counter, @counter, RAND()*(10000-1000)+1000)

		SET @counter = @counter + 1
	END
END
GO

CREATE OR ALTER PROCEDURE InsertIntoStores @maximum INT
AS 
BEGIN
	DECLARE @counter INT
	SET @counter = 0

	WHILE @counter < @maximum
	BEGIN
		INSERT INTO StoresCOPY
		VALUES (@counter, 'Romania')

		SET @counter = @counter + 1
	END
END
GO

CREATE OR ALTER PROCEDURE InsertIntoRelation_CustomersStore @maximum INT
AS
BEGIN
	DECLARE @counter INT
	DECLARE @storeCounter INT
	SET @counter = 0
	SET @storeCounter = 0

	WHILE @counter < @maximum
	BEGIN
		INSERT INTO Relation_CustomersStoreCOPY
		VALUES (@counter, @storeCounter)
		SET @counter = @counter + 1
		SET @storeCounter = @storeCounter + 1

		IF @counter = RAND()*(@maximum-@maximum/2)+@maximum/2
		BEGIN
			SET @storeCounter = 0
		END
	END
END
GO

CREATE OR ALTER PROCEDURE InsertIntoTable @Table VARCHAR(200), @maximum INT
AS
BEGIN
	IF @Table = 'CustomersCOPY'
	BEGIN
		EXEC InsertIntoCustomers @maximum;
	END
	ELSE
	IF @Table = 'OrdersCOPY'
	BEGIN
		EXEC InsertIntoOrders @maximum;
	END
	ELSE
		IF @Table = 'StoresCOPY'
	BEGIN
		EXEC InsertIntoStores @maximum;
	END
	ELSE
		IF @Table = 'Relation_CustomersStoreCOPY'
	BEGIN
		EXEC InsertIntoRelation_CustomersStore @maximum;
	END
END
GO

CREATE VIEW [CustomersFirstNameView] 
AS
	SELECT first_name
	FROM CustomersCOPY
GO

CREATE VIEW [OrderCustomerView]
AS
	SELECT o.order_id, o.total_amount, c.first_name, c.last_name, c.email
	FROM OrdersCOPY o
	JOIN CustomersCOPY c ON o.customer_id = c.customer_id;
GO

CREATE VIEW [StoreOrderTotalView]
AS
	SELECT s.store_id, s.store_location, COUNT(o.order_id) AS total_orders
	FROM StoresCOPY s
	LEFT JOIN Relation_CustomersStoreCOPY r ON s.store_id = r.store_id
	LEFT JOIN OrdersCOPY o ON r.customer_id = o.customer_id
	GROUP BY s.store_id, s.store_location;
GO

CREATE OR ALTER PROC SelectFromView @View VARCHAR(200)
AS
	BEGIN
	IF @View = 'CustomersFirstNameView'
	BEGIN
		SELECT * FROM [CustomersFirstNameView]
	END
	ELSE
	IF @View = 'OrderCustomerView'
	BEGIN
		SELECT * FROM [OrderCustomerView]
	END
	ELSE
	IF @View = 'StoreOrderTotalView'
	BEGIN
		SELECT * FROM [StoreOrderTotalView]
	END
END

DELETE FROM Tests
GO

INSERT INTO Tests
VALUES ('Test1')
GO

SELECT * FROM Tests

EXEC deleteFromTable @Table = 'CustomersCOPY'


INSERT INTO Views
VALUES
('CustomersFirstNameView'),
('OrderCustomerView'),
('StoreOrderTotalView')

INSERT INTO Tables
VALUES
('CustomersCOPY'),
('OrdersCOPY'),
('StoresCOPY'),
('Relation_CustomersStoreCOPY')

INSERT INTO TestViews
VALUES
(1, 1),
(1, 2),
(1, 3)

INSERT INTO TestTables
VALUES
(1, 1, 500, 4),
(1, 2, 500, 3),
(1, 3, 500, 2),
(1, 4, 500, 1)
GO


CREATE OR ALTER PROCEDURE runTest1 @id INT, @description NVARCHAR(2000)
AS
BEGIN
	INSERT INTO TestRuns
	VALUES
	(@description, GETDATE(), GETDATE())

	DECLARE @currentTestRunId INT
	SET @currentTestRunId = (SELECT SCOPE_IDENTITY())

	DECLARE TableCursor CURSOR
		FOR SELECT * FROM TestTables
		WHERE TestID = @id
		ORDER BY Position
	OPEN TableCursor

	DECLARE TableCursorReverse CURSOR
		FOR SELECT * FROM TestTables
		WHERE TestID = @id
		ORDER BY Position DESC
	OPEN TableCursorReverse

	DECLARE ViewCursor Cursor
		FOR SELECT* FROM TestViews
		WHERE TestID = @id
	OPEN ViewCursor

	DECLARE @TableId INT
	DECLARE @TestId INT
	DECLARE @NoRows INT
	DECLARE @Pos INT
	DECLARE @TableName VARCHAR(200)
	FETCH NEXT FROM TableCursor INTO @TestId, @TableId, @NoRows, @Pos

	DECLARE @beginTest DATETIME
	SET @beginTest = GETDATE()

	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @TableName = (
			SELECT T.Name
			FROM Tables AS T
			WHERE T.TableID = @TableId
		)

		EXEC deleteFromTable @Table = @TableName
		FETCH NEXT FROM TableCursor INTO @TestId, @TableId, @NoRows, @Pos
	END

	CLOSE TableCursor
	DEALLOCATE TableCursor

	FETCH NEXT FROM TableCursorReverse INTO @TestId, @TableId,@NoRows, @Pos

	DECLARE @startTime DATETIME
	DECLARE @endTime DATETIME

	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @TableName = (
			SELECT T.Name
			FROM Tables AS T
			WHERE T.TableID = @TableId
		)
		SET @startTime = GETDATE()
		EXEC InsertIntoTable @Table = @TableName, @maximum = @NoRows
		SET @endTime = GETDATE()
		INSERT INTO TestRunTables
		VALUES (@currentTestRunId, @TableId, @startTime, @endTime)

		FETCH NEXT FROM TableCursorReverse INTO @TestId, @TableId, @NoRows, @Pos
	END

	CLOSE TableCursorReverse
	DEALLOCATE TableCursorReverse

	FETCH NEXT FROM ViewCursor INTO @TestId, @TableId

	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @TableName = (
			SELECT V.Name
			FROM Views as V
			WHERE V.ViewID = @TableId
		)
		SET @startTime = GETDATE()
		EXEC SelectFromView @View = @TableName
		SET @endTime = GETDATE()
		INSERT INTO TestRunViews
		VALUES (@currentTestRunId, @TableId, @startTime, @endTime)
		FETCH NEXT FROM ViewCursor INTO @TestId, @TableId

	END


	CLOSE ViewCursor
	DEALLOCATE ViewCursor

	DECLARE @endTest DATETIME
	SET @endTest = GETDATE()

	UPDATE TestRuns			
	SET EndAt = GETDATE()
	WHERE TestRunID = @currentTestRunId
	
END

GO
  
EXEC runTest1 @id = 1, @description='ok2'


SELECT * FROM TestRuns
SELECT * FROM CustomersCOPY
SELECT * FROM TestRunTables
SELECT * FROM TestRunViews


