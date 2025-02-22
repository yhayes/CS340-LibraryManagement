-- CS 340 Project Step 3 Draft DML
-- Member Names: Yvonne Hayes, Gregory Preiss
-- Group #16

-- This file contains SQL queries for CRUD operations.

/******************************************************
BOOKS TABLE
Functions: SELECT/INSERT
******************************************************/

-- Insert sample books (Replacing placeholders with real values)
INSERT INTO Books (title, genre, yearPublished, authorID)
VALUES
('A Forgotten Rose', 'Romance', 2023, 1),
('Blue Stripes', 'Historical Fiction', 1995, 2),
('Desert Trails', 'Adventure', 2005, 3),
('Life of John Doe', 'Biography', 1980, 3),
('Forgotten Poems of Greece', 'History', 1965, NULL);

-- Retrieve all books
SELECT * FROM Books;

-- Retrieve all books with author names and yearPublished, allowing NULL authors
SELECT Books.bookID,
       CONCAT(Books.title, ' (', Books.yearPublished, ')') AS bookTitle,
       COALESCE(CONCAT(Authors.firstName, ' ', Authors.lastName, ' (', Authors.birthYear, ')'), 'Unknown Author') AS authorName,
       Books.genre
FROM Books
LEFT JOIN Authors ON Books.authorID = Authors.authorID;

/******************************************************
AUTHORS TABLE
Functions: SELECT/INSERT
******************************************************/

-- Insert sample authors
INSERT INTO Authors (firstName, lastName, birthYear)
VALUES
('David', 'Smith', 1990),
('Julia', 'Kim', 1971),
('Mary', 'Johnson', 1950);

-- Retrieve all authors
SELECT * FROM Authors;

-- Retrieve Authors for Books Form Dropdown
SELECT authorID, firstName, lastName FROM Authors;

/******************************************************
PATRONS TABLE
Functions: SELECT/INSERT
******************************************************/

-- Insert sample patrons
INSERT INTO Patrons (firstName, lastName, membershipDate)
VALUES
('Stephanie', 'Lee', '2023-01-15'),
('Bob', 'Elliot', '2022-07-10'),
('Charles', 'Brown', '2024-02-01');

-- Retrieve all patrons
SELECT * FROM Patrons;

-- Retrieve Patrons for Loans Form Dropdown
SELECT patronID, firstName, lastName FROM Patrons;

/******************************************************
LOANS TABLE
Functions: SELECT/INSERT/UPDATE/DELETE
******************************************************/

-- Insert sample loans (Replacing placeholders with real values)
INSERT INTO Loans (bookID, patronID, loanDate, returnDate)
VALUES
(1, 1, '2024-11-28', '2024-12-29'),
(2, 1, '2024-12-22', '2025-01-02'),
(3, 2, '2025-01-03', '2025-01-25'),
(3, 3, '2025-01-29', NULL),
(4, 3, '2025-02-01', NULL);

-- Update loan details (For backend use)
UPDATE Loans
SET bookID = 1,
    patronID = 2,
    loanDate = '2025-02-10',
    returnDate = '2025-03-10'
WHERE loanID = 1;

-- Delete a loan record (For backend use)
DELETE FROM Loans WHERE loanID = 1;

-- Retrieve all loans with book titles and patron names for display
SELECT Loans.loanID,
       CONCAT(Books.title, ' (', Books.yearPublished, ')') AS bookTitle,
       CONCAT(Patrons.firstName, ' ', Patrons.lastName, ' (Joined: ', Patrons.membershipDate, ')') AS patronName,
       Loans.loanDate, Loans.returnDate
FROM Loans
JOIN Books ON Loans.bookID = Books.bookID
JOIN Patrons ON Loans.patronID = Patrons.patronID;

-- Retrieve all books loaned by a specific patron (For backend use)
SELECT Books.title, Loans.loanDate, Loans.returnDate
FROM Loans
JOIN Books ON Loans.bookID = Books.bookID
WHERE Loans.patronID = 1;
