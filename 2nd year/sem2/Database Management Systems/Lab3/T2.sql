USE Lab3_DBMS
GO

CREATE OR ALTER PROCEDURE uspAddStoreRecover(@id INT, @address VARCHAR(30), @nr_of_bikes INT)
AS
	BEGIN TRAN
	BEGIN TRY
		IF(dbo.ufValidateString(@address) <> 1)
		BEGIN
			RAISERROR('Address is invalid', 14, 1)
		END
		IF(dbo.ufValidateInt(@nr_of_bikes) <> 1)
		BEGIN
			RAISERROR('Number of bikes is invalid', 14, 1)
		END
		IF EXISTS (SELECT * FROM Store S WHERE S.id = @id)
		BEGIN
			RAISERROR('Store already exists', 14, 1)
		END
		INSERT INTO Store VALUES (@id, @address, @nr_of_bikes)
		INSERT INTO LogTable VALUES ('add', 'store', GETDATE())
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
	END CATCH
GO

CREATE OR ALTER PROCEDURE uspAddCustomerRecover(@id INT, @name VARCHAR(30), @age INT, @nr_of_bought_bikes INT)
AS
	BEGIN TRAN
	BEGIN TRY
		IF(dbo.ufValidateString(@name) <> 1)
		BEGIN
			RAISERROR('Name is invalid', 14, 1)
		END
		IF(dbo.ufValidateInt(@age) <> 1)
		BEGIN
			RAISERROR('Age is invalid', 14, 1)
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
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
	END CATCH
GO

CREATE OR ALTER PROCEDURE uspAddStoreTransactionRecover(@store_id INT, @customer_id INT, @price INT)
AS
	BEGIN TRAN
	BEGIN TRY
		IF(dbo.ufValidateInt(@price) <> 1)
		BEGIN
			RAISERROR('Price is invalid', 14, 1)
		END
		IF EXISTS (SELECT * FROM StoreTransaction ST WHERE ST.store_id = @store_id AND ST.customer_id = @customer_id AND ST.price = @price)
		BEGIN
			RAISERROR('Transaction already exists', 14, 1)
		END
		INSERT INTO StoreTransaction VALUES (@store_id, @customer_id, @price)
		INSERT INTO LogTable VALUES ('add', 'store_transaction', GETDATE())
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
	END CATCH
GO

CREATE OR ALTER PROCEDURE uspGoodAddScenario
AS
	EXEC uspAddStoreRecover 12, 'Cluj', 200
	EXEC uspAddCustomerRecover 12, 'Sofia', 20, 1
	EXEC uspAddStoreTransactionRecover 12, 12, 1200
GO

CREATE OR ALTER PROCEDURE uspBadAddScenario
AS
	EXEC uspAddStoreRecover 11, 'Cluj', 205
	EXEC uspAddCustomerRecover 11, 'S', 20, 1 -- this fails because the name's length is < 2
	EXEC uspAddStoreTransactionRecover 11, 11, 1200
GO

EXEC uspGoodAddScenario
SELECT * FROM LogTable

EXEC uspBadAddScenario
SELECT * FROM LogTable

SELECT * FROM Store
SELECT * FROM Customer
SELECT * FROM StoreTransaction

DELETE FROM Store
DELETE FROM Customer 
DELETE FROM StoreTransaction 
	