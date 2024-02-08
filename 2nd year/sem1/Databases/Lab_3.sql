USE MountainBikesStore

DROP PROCEDURE sp_ChangeColumnType
DROP PROCEDURE sp_RevertChangeColumnType
DROP PROCEDURE sp_AddColumn
DROP PROCEDURE sp_RevertAddColumn
DROP PROCEDURE sp_AddDefaultConstraint
DROP PROCEDURE sp_RevertAddDefaultConstraint
DROP PROCEDURE sp_AddPrimaryKey
DROP PROCEDURE sp_RevertAddPrimaryKey
DROP PROCEDURE sp_AddCandidateKey
DROP PROCEDURE sp_RevertAddCandidateKey
DROP PROCEDURE sp_AddForeignKey
DROP PROCEDURE sp_RevertAddForeignKey
DROP PROCEDURE sp_CreateTable
DROP PROCEDURE sp_RevertCreateTable
DROP PROCEDURE sp_DropTable
DROP PROCEDURE sp_RevertDropTable

-- modify the type of a column

CREATE OR ALTER PROCEDURE sp_RevertChangeColumnType
AS
BEGIN
    ALTER TABLE Suppliers
    ALTER COLUMN contract_phone VARCHAR(10);
END;

CREATE OR ALTER PROCEDURE sp_ChangeColumnType
AS
BEGIN
	ALTER TABLE Suppliers
	ALTER COLUMN contract_phone INT;
END;

-- Add Column

CREATE OR ALTER PROCEDURE sp_AddColumn
AS
BEGIN
    ALTER TABLE Customers
    ADD orders INT;
END;

CREATE OR ALTER PROCEDURE sp_RevertAddColumn
AS
BEGIN
    ALTER TABLE Customers
    DROP COLUMN orders;
END;


-- Add Default Constraint
CREATE OR ALTER PROCEDURE sp_AddDefaultConstraint
AS
BEGIN
    ALTER TABLE Bikes
    ADD CONSTRAINT DF_Bikes_Description DEFAULT	'OK' FOR bike_description;
END;

CREATE OR ALTER PROCEDURE sp_RevertAddDefaultConstraint
AS
BEGIN
    ALTER TABLE Bikes
    DROP CONSTRAINT DF_Bikes_Description;
END;


-- Add Primary Key
CREATE OR ALTER PROCEDURE sp_AddPrimaryKey
AS
BEGIN
    ALTER TABLE Test
    ADD CONSTRAINT PK_Test PRIMARY KEY (test_id);
END;

CREATE OR ALTER PROCEDURE sp_RevertAddPrimaryKey
AS
BEGIN
    ALTER TABLE Test
    DROP CONSTRAINT PK_Test;
END;


-- Add Candidate Key
CREATE OR ALTER PROCEDURE sp_AddCandidateKey
AS
BEGIN
    ALTER TABLE Bikes
    ADD CONSTRAINT CK_Bikes_bike_id UNIQUE (bike_id);
END;

EXEC sp_AddCandidateKey

CREATE OR ALTER PROCEDURE sp_RevertAddCandidateKey
AS
BEGIN
    ALTER TABLE Bikes
    DROP CONSTRAINT CK_Bikes_bike_id;
END;

EXEC sp_RevertAddCandidateKey


-- Add Foreign Key
CREATE OR ALTER PROCEDURE sp_AddForeignKey
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_Suppliers_Brands')
    BEGIN
        -- Alter table to add foreign key
        ALTER TABLE Suppliers
        ADD CONSTRAINT FK_Suppliers_Brands
        FOREIGN KEY (supplier_name)
        REFERENCES Brands(brand_name);
        
        PRINT 'Foreign key constraint FK_Suppliers_Brands added successfully.';
    END
    ELSE
    BEGIN
        PRINT 'Foreign key constraint FK_Suppliers_Brands already exists.';
    END
END;

CREATE OR ALTER PROCEDURE sp_RevertAddForeignKey
AS
BEGIN
    ALTER TABLE Suppliers
    DROP CONSTRAINT FK_Suppliers_Brands;
END;

EXEC sp_AddForeignKey


-- Create Table
CREATE OR ALTER PROCEDURE sp_CreateTable
AS
BEGIN
    CREATE TABLE Manufacturers
    (
        manufacturer_name VARCHAR(20)
    );
END;

CREATE OR ALTER PROCEDURE sp_RevertCreateTable
AS
BEGIN
    DROP TABLE Manufacturers;
END;

EXEC sp_RevertCreateTable


-- Drop Table
CREATE OR ALTER PROCEDURE sp_DropTable
AS
BEGIN
    DROP TABLE Test;
END;

CREATE OR ALTER PROCEDURE sp_RevertDropTable
AS
BEGIN
    CREATE TABLE Test
    (
		test_id INT NOT NULL,
		CONSTRAINT PK_Test PRIMARY KEY(test_id) 
    );
END;



DROP TABLE CurrentVersion
CREATE TABLE CurrentVersion
(
	currentVersion INT
);

INSERT CurrentVersion VALUES(0);

DROP TABLE DataBaseVersions
CREATE TABLE DataBaseVersions
(
VersionID INT PRIMARY KEY,
spName VARCHAR(100),
rspName VARCHAR(100),
);

INSERT DataBaseVersions VALUES(1,'sp_ChangeColumnType','sp_RevertChangeColumnType')
INSERT DataBaseVersions VALUES(2,'sp_AddColumn','sp_RevertAddColumn')
INSERT DataBaseVersions VALUES(3,'sp_AddDefaultConstraint', 'sp_RevertAddDefaultConstraint')
INSERT DataBaseVersions VALUES(4,'sp_AddPrimaryKey','sp_RevertAddPrimaryKey')
INSERT DataBaseVersions VALUES(5,'sp_AddCandidateKey','sp_RevertAddCandidateKey')
INSERT DataBaseVersions VALUES(6, 'sp_AddForeignKey', 'sp_RevertAddForeignKey')
INSERT DataBaseVersions VALUES(7, 'sp_CreateTable', 'sp_RevertCreateTable')
INSERT DataBaseVersions VALUES(8, 'sp_DropTable', 'sp_RevertDropTable')

DROP PROCEDURE sp_DBVersion
CREATE OR ALTER PROCEDURE sp_DBVersion @version INT
AS
	IF @version < 0 OR @version > (SELECT MAX(VersionID) FROM DataBaseVersions)
	BEGIN
		RAISERROR ('There is no such version.', 10, 1)
		RETURN
	END
	DECLARE @currentDBVersion INT
	SET @currentDBVersion = (Select TOP(1) currentVersion FROM CurrentVersion)

	DECLARE @ExeProcedure VARCHAR(150)
	IF(@currentDBVersion < @version)
		WHILE(@currentDBVersion < @version)
		BEGIN
			SET @currentDBVersion = @currentDBVersion + 1
			SET @ExeProcedure = (SELECT spName FROM DataBaseVersions WHERE @currentDBVersion = VersionID)
			exec(@ExeProcedure)
		END
	ELSE IF(@currentDBVersion > @version)
		WHILE(@currentDBVersion > @version)
		BEGIN
			SET @ExeProcedure = (SELECT rspName FROM DataBaseVersions WHERE @currentDBVersion = VersionID)
			SET @currentDBVersion = @currentDBVersion - 1
			exec(@ExeProcedure)
		END
	UPDATE CurrentVersion 
	SET currentVersion = @version

EXEC sp_DBVersion 1

EXEC sp_DBVersion 2

EXEC sp_DBVersion 3

EXEC sp_DBVersion 4

EXEC sp_DBVersion 5

EXEC sp_DBVersion 6

EXEC sp_DBVersion 7

EXEC sp_DBVersion 8

SELECT * FROM Customers;

SELECT * FROM Bikes;