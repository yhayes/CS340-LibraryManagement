const express = require("express");
const path = require("path");
const pool = require("./db-connector");
const app = express();
const PORT = 4985;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/index.html", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

//  Retrieve all books with author names for the main books table
app.get("/books", (req, res) => {
    pool.query("CALL GetBooksWithAuthors()", (error, results) => {
        if (error) {
            console.error("Error retrieving books:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json(results[0]);
        }
    });
});

//  Retrieve books for dropdown (ID & title only)
app.get("/books-dropdown", (req, res) => {
    pool.query("SELECT bookID, title, yearPublished FROM Books", (error, results) => {
        if (error) {
            console.error("Error retrieving books for dropdown:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json(results);
        }
    });
});

//  Retrieve authors for dropdown
app.get("/authors-dropdown", (req, res) => {
    pool.query("SELECT authorID, firstName, lastName FROM Authors", (error, results) => {
        if (error) {
            console.error("Error retrieving authors for dropdown:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json(results);
        }
    });
});

//  Retrieve full authors list
app.get("/authors", (req, res) => {
    pool.query("CALL GetAuthors()", (error, results) => {
        if (error) {
            console.error("Error retrieving authors:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json(results[0]);
        }
    });
});

//  Retrieve all patrons for the main patrons table
app.get("/patrons", (req, res) => {
    pool.query("CALL GetPatrons()", (error, results) => {
        if (error) {
            console.error("Error retrieving patrons:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json(results[0]);
        }
    });
});

//  Retrieve patrons for dropdown (ID & name only)
app.get("/patrons-dropdown", (req, res) => {
    pool.query("SELECT patronID, firstName, lastName, membershipDate FROM Patrons", (error, results) => {
        if (error) {
            console.error("Error retrieving patrons for dropdown:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json(results);
        }
    });
});

//  Retrieve all loans with book and patron details
app.get("/loans", (req, res) => {
    pool.query("CALL GetLoansWithDetails()", (error, results) => {
        if (error) {
            console.error("Error retrieving loans:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json(results[0]);
        }
    });
});

//  Add a new book
app.post("/add-book", (req, res) => {
    const { title, genre, yearPublished, authorID } = req.body;
    const query = `INSERT INTO Books (title, genre, yearPublished, authorID) VALUES (?, ?, ?, ?)`;

    pool.query(query, [title, genre, yearPublished, authorID || null], (error, results) => {
        if (error) {
            console.error("Error adding book:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json({ success: true });
        }
    });
});

//  Add a new author
app.post("/add-author", (req, res) => {
    const { firstName, lastName, birthYear } = req.body;
    const query = `INSERT INTO Authors (firstName, lastName, birthYear) VALUES (?, ?, ?)`;

    pool.query(query, [firstName, lastName, birthYear], (error, results) => {
        if (error) {
            console.error("Error adding author:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json({ success: true });
        }
    });
});

//  Add a new patron
app.post("/add-patron", (req, res) => {
    const { firstName, lastName, membershipDate } = req.body;
    const query = `INSERT INTO Patrons (firstName, lastName, membershipDate) VALUES (?, ?, ?)`;

    pool.query(query, [firstName, lastName, membershipDate], (error, results) => {
        if (error) {
            console.error("Error adding patron:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json({ success: true });
        }
    });
});

//  Add a new loan
app.post("/add-loan", (req, res) => {
    const { bookID, patronID, loanDate } = req.body;
    const query = `INSERT INTO Loans (bookID, patronID, loanDate) VALUES (?, ?, ?)`;

    pool.query(query, [bookID, patronID, loanDate], (error, results) => {
        if (error) {
            console.error("Error adding loan:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json({ success: true });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}/`);
});