USE Lab3_DBMS
GO

-- solution: set deadlock priority high
-- now t1 will be chosen as the deadlock victim since it has a lower priority (default is 0)

SET DEADLOCK_PRIORITY HIGH
BEGIN TRAN
UPDATE Customer SET age = 23 WHERE id = 30
WAITFOR DELAY '00:00:05'
UPDATE Store SET address='Drobeta' WHERE id = 30
COMMIT TRAN