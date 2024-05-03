USE Lab3_DBMS
GO

DROP TABLE IF EXISTS LogTable 
CREATE TABLE LogTable(
	Lid INT IDENTITY PRIMARY KEY,
	TypeOperation VARCHAR(50),
	TableOperation VARCHAR(50),
	ExecutionDate DATETIME
);
GO

CREATE OR ALTER FUNCTION ufValidateString (@str VARCHAR(30))
RETURNS INT 
AS 
BEGIN 
	DECLARE @return INT
	SET @return = 1
	IF(@str IS NULL OR LEN(@str) < 2 OR LEN(@str) > 30)
	BEGIN 
		SET @return = 0
	END
	RETURN @return
END
GO

CREATE OR ALTER FUNCTION ufValidateInt (@int INT)
RETURNS INT
AS 
BEGIN 
	DECLARE @return INT
	SET @return = 1
	IF(@int < 0)
	BEGIN
		SET @return = 0
	END
	RETURN @return
END
GO

CREATE OR ALTER PROCEDURE uspAddStore(@id INT, @address VARCHAR(30), @nr_of_bikes INT)
AS
	IF (dbo.ufValidateString(@address) <> 1)
	BEGIN 
		RAISERROR('Address is invalid', 14, 1)
	END
	IF (dbo.ufValidateInt(@nr_of_bikes) <> 1)
	BEGIN 
		RAISERROR('Number of bikes is invalid', 14, 1)
	END
	IF EXISTS (SELECT * FROM Store S WHERE S.id = @id)
	BEGIN
		RAISERROR('Store already exists', 14, 1)
	END
	INSERT INTO Store VALUES (@id, @address, @nr_of_bikes)
	INSERT INTO LogTable VALUES ('add', 'store', GETDATE())
GO

CREATE OR ALTER PROCEDURE uspAddCustomer(@id INT, @name VARCHAR(30), @age INT, @nr_of_bought_bikes INT)
AS
	IF(dbo.ufValidateInt(@age) <> 1)
	BEGIN
		RAISERROR('Age is invalid', 14, 1)
	END
	IF(dbo.ufValidateString(@name) <> 1)
	BEGIN
		RAISERROR('Name is invalid', 14, 1)
	END
	IF(dbo.ufValidateInt(@nr_of_bought_bikes) <> 1)
	BEGIN
		RAISERROR('Number of bought bikes is invalid', 14, 1)
	END
	IF EXISTS (SELECT * FROM Customer C WHERE C.id = @id)
	BEGIN
		RAISERROR('Customer already exists', 14, 1)
	END
	INSERT INTO Customer VALUES (@id, @name, @age, @nr_of_bought_bikes)
	INSERT INTO LogTable VALUES ('add', 'customer', GETDATE())
GO

CREATE OR ALTER PROCEDURE uspAddStoreTransaction(@store_id INT, @customer_id INT, @price INT)
AS
	IF(dbo.ufValidateInt(@price) <> 1)
	BEGIN
		RAISERROR('Price is invalid', 14, 1)
	END
	IF EXISTS(SELECT * FROM StoreTransaction ST WHERE ST.store_id = @store_id AND ST.customer_id = @customer_id AND ST.price = @price)
	BEGIN 
		RAISERROR('Transaction already exists', 14, 1)
	END
	INSERT INTO StoreTransaction VALUES(@store_id, @customer_id, @price)
	INSERT INTO LogTable VALUES('add', 'store_transaction', GETDATE())
GO

CREATE OR ALTER PROCEDURE uspAddCommitScenario
AS
	BEGIN TRAN
	BEGIN TRY
		EXEC uspAddStore 10, 'Cluj', 200
		EXEC uspAddCustomer 10, 'Andrei', 19, 2
		EXEC uspAddStoreTransaction 10, 10, 1000
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
		RETURN
	END CATCH
GO

CREATE OR ALTER PROCEDURE uspAddRollbackScenario
AS
	BEGIN TRAN
	BEGIN TRY
		EXEC uspAddStore 11, 'Cluj', 200
		EXEC uspAddCustomer 11, 's', 20, 2 -- this fails because the name's length is < 2
		EXEC uspAddStoreTransaction 11, 11, 2000
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
		RETURN
	END CATCH
GO

EXEC uspAddRollbackScenario
EXEC uspAddCommitScenario

SELECT * FROM LogTable

SELECT * FROM Store
SELECT * FROM Customer
SELECT * FROM StoreTransaction

DELETE FROM Store WHERE id = 10
DELETE FROM Customer WHERE id = 10
DELETE FROM StoreTransaction WHERE store_id = 10 AND customer_id = 10