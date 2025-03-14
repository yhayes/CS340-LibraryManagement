// Citation for the following Express.js server setup and CRUD route structure:
// Date: 03/13/2025
// Based on: CS340 Node.js Starter App Guide
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

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
    pool.query("SELECT authorID, firstName, lastName, birthYear FROM Authors", (error, results) => {
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

// Update the book for a loan
app.post("/update-loan-book", (req, res) => {
  const { loanID, newBookID } = req.body;
  const query = "CALL UpdateLoanBook(?, ?)";

  pool.query(query, [loanID, newBookID], (error, results) => {
      if (error) {
          console.error("Error updating loan book:", error);
          res.status(500).json({ error: "Database error." });
      } else {
          res.json({ success: true });
      }
  });
});

// Update the patron for a loan
app.post("/update-loan-patron", (req, res) => {
  const { loanID, newPatronID } = req.body;
  const query = "CALL UpdateLoanPatron(?, ?)";

  pool.query(query, [loanID, newPatronID], (error, results) => {
      if (error) {
          console.error("Error updating loan patron:", error);
          res.status(500).json({ error: "Database error." });
      } else {
          res.json({ success: true });
      }
  });
});

// Update the loan date
app.post("/update-loan-date", (req, res) => {
  const { loanID, newLoanDate } = req.body;
  const query = "CALL UpdateLoanDate(?, ?)";

  pool.query(query, [loanID, newLoanDate], (error, results) => {
      if (error) {
          console.error("Error updating loan date:", error);
          res.status(500).json({ error: "Database error." });
      } else {
          res.json({ success: true });
      }
  });
});

// Update the return date
app.post("/update-return-date", (req, res) => {
  const { loanID, newReturnDate } = req.body;
  const query = "CALL UpdateReturnDate(?, ?)";

  pool.query(query, [loanID, newReturnDate], (error, results) => {
      if (error) {
          console.error("Error updating return date:", error);
          res.status(500).json({ error: "Database error." });
      } else {
          res.json({ success: true });
      }
  });
});

// Delete a loan
app.post("/delete-loan", (req, res) => {
  const { loanID } = req.body;
  const query = "CALL DeleteLoan(?)";

  pool.query(query, [loanID], (error, results) => {
      if (error) {
          console.error("Error deleting loan:", error);
          res.status(500).json({ error: "Database error." });
      } else {
          res.json({ success: true });
      }
  });
});

// Get details for a specific loan (for validation)
app.get("/loan-details/:loanID", (req, res) => {
  const loanID = req.params.loanID;
  const query = "SELECT loanDate, returnDate FROM Loans WHERE loanID = ?";

  pool.query(query, [loanID], (error, results) => {
      if (error) {
          console.error("Error retrieving loan details:", error);
          res.status(500).json({ error: "Database error." });
      } else if (results.length === 0) {
          res.status(404).json({ error: "Loan not found." });
      } else {
          res.json(results[0]);
      }
  });
});

app.listen(PORT, () => {
    console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}/`);
});