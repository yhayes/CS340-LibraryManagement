
## Project Overview

With Emerald City's growing population, more residents than ever are turning to the Emerald City Public Library for their reading needs. Daily patron registrations have doubled, and book circulation has reached record highs. This system replaces an outdated solution with a modern, database-driven platform that streamlines book management, organizes author records, and efficiently tracks patron borrowing activity.

## Team Members
- Yvonne Hayes
- Gregory Preiss

## Features

The system manages four main entities:

1. **Books** - Complete book inventory with titles, genres, publication years, and author associations
2. **Authors** - Author information including names and birth years
3. **Patrons** - Library member details with membership dates
4. **Loans** - Book checkout records demonstrating many-to-many relationships between books and patrons

### Key Functionality

- **Books Management**: Add and view books with author information
- **Authors Management**: Add and track author records
- **Patrons Management**: Register new library patrons and view their information
- **Loans Management**: Record and track book loans

## Database Structure

### Entity-Relationship Diagram

The database consists of four main tables:

- **Authors**: Stores author information
- **Books**: Contains book details with a foreign key to Authors
- **Patrons**: Manages library patron information
- **Loans**: Intersection table implementing a many-to-many relationship between Books and Patrons

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express
- **Database**: MySQL
- **AJAX**: Used for asynchronous data operations without page reloads

### Books and Authors Relationship
- One-to-many relationship where a book can have one author
- Authors can have multiple books
- Books can exist without an author (NULL authorID allowed)

### Loans as Intersection Entity
- Implements many-to-many relationship between Books and Patrons
- Tracks loan date and return date
- Enforces referential integrity with foreign keys

### Dynamic Form Validation
- Loan dates must precede return dates
- Return dates are optional (can be NULL for active loans)
- Proper date formatting and validation

## Citations and References

### Node.js Server and Database Implementation
The server-side implementation of this project was influenced by the CS340 Node.js Starter App Guide. This includes:

* MySQL connection pooling in `db-connector.js`
* Express.js CRUD route structure in `server.js`
* AJAX-based data operations

**Reference:**
Oregon State University (March 13, 2025). *CS340 Node.js Starter App Guide*. Retrieved from: https://github.com/osu-cs340-ecampus/nodejs-starter-app

### Database Design Patterns
The Loans table follows the Intersection Table pattern as discussed in CS340's Exploration - Design Patterns module. Key concepts applied include:

* Using two foreign keys to track M:N relationships between Books and Patrons
* Implementing intersection tables to maintain data integrity
* Avoiding redundancy in relational database design

**Reference:**
Oregon State University (March 13, 2025). *CS340 Module 4: Exploration - Design Patterns (Part 2)*. Retrieved from: https://canvas.oregonstate.edu/courses/1987790/pages/exploration-design-patterns-part-2?module_item_id=25022983

### Web Application Structure
The front-end structure of this project was influenced by CS340's Database Application Design Exploration and Web Application Technology modules, specifically:

* Table-based record displays
* CRUD operation forms
* Pre-populated dropdowns for foreign keys
* Navigation bar structure

**References:**
Oregon State University (March 13, 2025). *CS340 Database Application Design Exploration*. Retrieved from: https://canvas.oregonstate.edu/courses/1987790/pages/exploration-database-application-design?module_item_id=25023009

Oregon State University (March 13, 2025). *CS340 Exploration - Web Application Technology*. Retrieved from: https://canvas.oregonstate.edu/courses/1987790/pages/exploration-web-application-technology?module_item_id=25023012

### Original Implementations
While the overall structure was influenced by the CS340 course materials, the following components were implemented independently:

* All SQL queries and stored procedures
* HTML structure and layout
* CSS styling
* JavaScript front-end logic for data validation
* Form validation for loan dates
