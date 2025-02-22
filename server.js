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

// Route for dropdowns (returns only `authorID`, `firstName`, `lastName`)
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

// Route for full authors list (used in `authors.html`)
app.get("/authors", (req, res) => {
    pool.query("CALL GetAuthors()", (error, results) => {
        if (error) {
            console.error("Error retrieving authors:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json(results[0]); // Stored procedures return results in an array
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

// Add a new author
app.post("/add-author", (req, res) => {
    const { firstName, lastName, birthYear } = req.body;

    const query = `
        INSERT INTO Authors (firstName, lastName, birthYear)
        VALUES (?, ?, ?)`;

    pool.query(query, [firstName, lastName, birthYear], (error, results) => {
        if (error) {
            console.error("Error adding author:", error);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json({ success: true });
        }
    });
});

// Retrieve all patrons
app.get("/patrons", (req, res) => {
  pool.query("CALL GetPatrons()", (error, results) => {
      if (error) {
          console.error("Error retrieving patrons:", error);
          res.status(500).json({ error: "Database error." });
      } else {
          res.json(results[0]); // Stored procedures return results in an array
      }
  });
});

// Add a new patron
app.post("/add-patron", (req, res) => {
  const { firstName, lastName, membershipDate } = req.body;

  const query = `
      INSERT INTO Patrons (firstName, lastName, membershipDate)
      VALUES (?, ?, ?)`;

  pool.query(query, [firstName, lastName, membershipDate], (error, results) => {
      if (error) {
          console.error("Error adding patron:", error);
          res.status(500).json({ error: "Database error." });
      } else {
          res.json({ success: true });
      }
  });
});

// Retrieve all loans with book and patron details
app.get("/loans", (req, res) => {
  pool.query("CALL GetLoansWithDetails()", (error, results) => {
      if (error) {
          console.error("Error retrieving loans:", error);
          res.status(500).json({ error: "Database error." });
      } else {
          res.json(results[0]); // Stored procedures return results in an array
      }
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}/`);
});