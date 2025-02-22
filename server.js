const express = require("express");
const path = require("path");
const pool = require("./db-connector"); // Ensure this is correctly set up
const app = express();
const PORT = 4985;

// Middleware for parsing JSON
app.use(express.json());

// Serve static files from the cs340 directory
app.use(express.static(__dirname));

// Serve index.html explicitly for both '/' and '/index.html'
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Retrieve all books with author names
app.get("/books", (req, res) => {
    pool.query("CALL GetBooksWithAuthors()", (error, results) => {
        if (error) {
            console.error("Error retrieving books:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json(results[0]); // Ensure the correct result set is returned
        }
    });
});

// Retrieve authors for dropdown
app.get("/authors", (req, res) => {
    pool.query("SELECT authorID, firstName, lastName FROM Authors", (error, results) => {
        if (error) {
            console.error("Error retrieving authors:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json(results);
        }
    });
});

// Add a new book
app.post("/add-book", (req, res) => {
    const { title, genre, yearPublished, authorID } = req.body;

    const query = `
        INSERT INTO Books (title, genre, yearPublished, authorID)
        VALUES (?, ?, ?, ?)`;

    pool.query(query, [title, genre, yearPublished, authorID || null], (error, results) => {
        if (error) {
            console.error("Error adding book:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json({ success: true });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}/`);
});