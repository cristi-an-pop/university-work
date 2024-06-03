USE Examen
GO

INSERT INTO Client (FirstName, LastName, DateOfBirth)
VALUES 
('John', 'Doe', '1980-01-15'),
('Jane', 'Smith', '1990-05-20'),
('Robert', 'Brown', '1975-07-30');

INSERT INTO CarIssue (Category, CanBeSolved)
VALUES 
('Engine', 1),
('Transmission', 0),
('Brakes', 1);

INSERT INTO Car (ClientID, Brand, Color, IssueID)
VALUES 
(1, 'Toyota', 'Red', 1),
(2, 'Honda', 'Blue', 2),
(3, 'Ford', 'Black', 3),
(1, 'Tesla', 'White', 3);

INSERT INTO CarParts (PartName, DistributorName, CarBrand)
VALUES 
('Engine Oil', 'Ok Parts', 'Toyota'),
('Brake Pads', 'Brake Parts', 'Ford'),
('Transmission Fluid', 'Transmission Parts.', 'Honda'),
('Battery', 'Electro Parts', 'Tesla');

INSERT INTO Mechanic (FirstName, LastName, DateOfBirth)
VALUES 
('Andrei', 'Bogdan', '1985-03-10'),
('Sara', 'Alexa', '1992-08-25'),
('Tom', 'Stone', '1988-11-12');

INSERT INTO Appointment (ClientID, CarID, IssueID, MechanicID, AppointmentDate)
VALUES 
(1, 1, 1, 1, '2024-06-01'),
(2, 2, 2, 2, '2024-06-02'),
(3, 3, 3, 3, '2024-06-03'),
(1, 4, 3, 1, '2024-06-04');

INSERT INTO CarIssueParts (IssueID, PartID)
VALUES 
(1, 1),
(3, 2),
(2, 3),
(3, 4);

