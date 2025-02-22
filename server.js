const express = require("express");
const path = require("path");
const db = require("./db-connector"); // Import the database connection

const app = express();
const PORT = 4985; // Keep your assigned port

// Middleware for JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Serve index.html for '/' and '/index.html'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 📌 Fetch books from the database
app.get("/books", (req, res) => {
  db.query("CALL GetBooksWithAuthors()", (err, results) => {
      if (err) {
          console.error("Database error:", err);
          res.status(500).send("Database error");
      } else {
          res.json(results[0]); // Stored procedure from DDL.sql
      }
  });
});

// 📌 Fetch authors for dropdown
app.get("/authors", (req, res) => {
  db.query("SELECT authorID, firstName, lastName FROM Authors", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send("Database error");
    } else {
      res.json(results);
    }
  });
});

// 📌 Add a new book
app.post("/add-book", (req, res) => {
  const { title, genre, yearPublished, authorID } = req.body;

  const query = "INSERT INTO Books (title, genre, yearPublished, authorID) VALUES (?, ?, ?, ?)";
  const values = [title, genre, yearPublished, authorID || null]; // Handle null authors

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ success: false, error: "Database error" });
    } else {
      res.json({ success: true });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://flip1.engr.oregonstate.edu:${PORT}/`);
});