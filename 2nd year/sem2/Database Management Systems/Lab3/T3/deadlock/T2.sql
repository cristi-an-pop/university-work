USE Lab3_DBMS	
GO

-- deadlock victim
-- tables will contain the values from T1
BEGIN TRAN
UPDATE Customer SET age = 23 WHERE id = 30
WAITFOR DELAY '00:00:05'
UPDATE Store SET address='Drobeta' WHERE id = 30
COMMIT TRAN