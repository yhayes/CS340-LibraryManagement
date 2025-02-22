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
  db.query("SELECT * FROM Books", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send("Database error");
    } else {
      res.json(results);
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://flip1.engr.oregonstate.edu:${PORT}/`);
});