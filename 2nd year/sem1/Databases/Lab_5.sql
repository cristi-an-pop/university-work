DROP TABLE Ta
DROP TABLE Tb
DROP TABLE Tc

CREATE TABLE Ta(
	aid INT PRIMARY KEY NOT NULL,
	a2 INT unique,
	a3 INT
)
GO

CREATE TABLE Tb(
	bid INT PRIMARY KEY NOT NULL,
	b2 INT
)
GO

CREATE TABLE Tc(
	cid INT PRIMARY KEY NOT NULL,
	aid INT,
	bid INT,
	FOREIGN KEY (aid) REFERENCES Ta(aid) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (bid) REFERENCES Tb(bid) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE OR ALTER PROC insertDataIntoTa @nrOfRows INT
AS
BEGIN
	DECLARE @aid INT
	DECLARE @a2 INT
	DECLARE @a3 INT
	SET @aid  = (SELECT MAX(aid) + 1 FROM Ta)
	if @aid is NULL
		SET @aid = 1
	SET @a2 = (SELECT MAX(a2) + 1 FROM Ta)
	if @a2 is NULL
		SET @a2 = 1
	WHILE @nrOfRows > 0
	BEGIN
		SET @a3 = RAND()*(100-1)+1;
		INSERT INTO Ta(aid, a2, a3) VALUES (@aid, @a2, @a3)
		SET @nrOfRows = @nrOfRows - 1
		SET @aid = @aid + 1
		SET @a2 = @a2 + 1
	END
END
GO

CREATE OR ALTER PROC insertDataIntoTb @nrOfRows INT
AS
BEGIN
	DECLARE @bid INT
	DECLARE @b2 INT
	SET @bid  = (SELECT MAX(bid) + 1 FROM Tb)
	if @bid is NULL
		SET @bid = 1
	SET @b2 = (SELECT MAX(b2) + 1 FROM Tb)
	if @b2 is NULL
		SET @b2 = 1
	WHILE @nrOfRows > 0
	BEGIN
		INSERT INTO Tb(bid, b2) VALUES (@bid, @b2)
		SET @nrOfRows = @nrOfRows - 1
		SET @bid = @bid + 1
		SET @b2 = @b2 + 1
	END
END
GO

EXEC insertDataIntoTa 300

EXEC insertDataIntoTb 300

-- Clustered Index Scan
SELECT * FROM Ta

-- Clustered Index Seek
SELECT * FROM Ta WHERE aid = 43

-- Non-Clustered Index Scan
SELECT * FROM Ta WHERE a2 > 50;

-- Non-Clustered Index Seek
SELECT a2 FROM Ta WHERE a2 = 43

-- Non-Clustered Index Scan NU E BUN
SELECT * FROM Ta WHERE a2 > 50;

-- BEFORE: 300 rows read
-- AFTER: 1 row read
SELECT * FROM Tb WHERE b2 = 10

CREATE NONCLUSTERED INDEX IX_Tb_b2
ON dbo.Tb(b2)
GO

CREATE VIEW MyView
AS
SELECT Ta.aid, Ta.a2, Tb.bid, Tb.b2, Tc.cid
FROM Ta
JOIN Tc ON Ta.aid = Tc.aid
JOIN Tb ON Tc.bid = Tb.bid;