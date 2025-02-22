-- Group Members: Yvonne Hayes, Gregory Preiss
-- Group #16

-- -----------------------------------------------------
-- Disable foreign key checks to prevent constraint errors during inserts
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

-- -----------------------------------------------------
-- Drop Existing Tables if They Exist (to prevent conflicts)
-- -----------------------------------------------------
DROP TABLE IF EXISTS Loans;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Patrons;
DROP TABLE IF EXISTS Authors;

-- -----------------------------------------------------
-- Create Table: Authors
-- -----------------------------------------------------
CREATE TABLE Authors (
    authorID INT AUTO_INCREMENT UNIQUE NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    birthYear INT NOT NULL,
    PRIMARY KEY (authorID)
);

-- -----------------------------------------------------
-- Create Table: Books
-- -----------------------------------------------------
CREATE TABLE Books (
    bookID INT AUTO_INCREMENT UNIQUE NOT NULL,
    authorID INT NULL,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    yearPublished INT NOT NULL,
    PRIMARY KEY (bookID),
    FOREIGN KEY (authorID) REFERENCES Authors(authorID) ON DELETE SET NULL
);

-- -----------------------------------------------------
-- Create Table: Patrons
-- -----------------------------------------------------
CREATE TABLE Patrons (
    patronID INT AUTO_INCREMENT UNIQUE NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    membershipDate DATE NOT NULL,
    PRIMARY KEY (patronID)
);

-- -----------------------------------------------------
-- Create Table: Loans (Intersection Table for M:N Relationship)
-- -----------------------------------------------------
CREATE TABLE Loans (
    loanID INT AUTO_INCREMENT UNIQUE NOT NULL,
    bookID INT NOT NULL,
    patronID INT NOT NULL,
    loanDate DATE NOT NULL,
    returnDate DATE NULL,
    PRIMARY KEY (loanID),
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE,
    FOREIGN KEY (patronID) REFERENCES Patrons(patronID) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Insert Sample Data: Authors
-- -----------------------------------------------------
INSERT INTO Authors (firstName, lastName, birthYear) VALUES
    ('David', 'Smith', 1990),
    ('Julia', 'Kim', 1971),
    ('Mary', 'Johnson', 1950);

-- -----------------------------------------------------
-- Insert Sample Data: Books
-- -----------------------------------------------------
INSERT INTO Books (authorID, title, genre, yearPublished) VALUES
    (1, 'A Forgotten Rose', 'Romance', 2023),
    (2, 'Blue Stripes', 'Historical Fiction', 1995),
    (3, 'Desert Trails', 'Adventure', 2005),
    (3, 'Life of John Doe', 'Biography', 1980),
    (NULL, 'Forgotten Poems of Greece', 'History', 1965); -- Book with no known author

-- -----------------------------------------------------
-- Insert Sample Data: Patrons
-- -----------------------------------------------------
INSERT INTO Patrons (firstName, lastName, membershipDate) VALUES
    ('Stephanie', 'Lee', '2023-01-15'),
    ('Bob', 'Elliot', '2022-07-10'),
    ('Charles', 'Brown', '2024-02-01');

-- -----------------------------------------------------
-- Insert Sample Data: Loans (Demonstrating M:N Relationship)
-- -----------------------------------------------------
INSERT INTO Loans (bookID, patronID, loanDate, returnDate) VALUES
   (1, 1, '2024-11-28', '2024-12-29'),
   (2, 1, '2024-12-22', '2025-01-02'),
   (3, 2, '2025-01-03', '2025-01-25'),
   (3, 3, '2025-01-29', NULL),  -- Loan still active
   (4, 3, '2025-02-01', NULL);  -- Loan still active

-- -----------------------------------------------------
-- Stored Procedure: GetBooksWithAuthors
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS GetBooksWithAuthors;
DELIMITER //
CREATE PROCEDURE GetBooksWithAuthors()
BEGIN
    SELECT Books.bookID,
           Books.title,
           Books.genre,
           Books.yearPublished,
           COALESCE(CONCAT(Authors.firstName, ' ', Authors.lastName), 'Unknown') AS authorName
    FROM Books
    LEFT JOIN Authors ON Books.authorID = Authors.authorID
    ORDER BY Books.bookID;
END //
DELIMITER ;

-- -----------------------------------------------------
-- Re-enable foreign key checks and commit changes
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
