const express = require('express');
const path = require('path');

const app = express();
const PORT = 5616;

// Serve static files (HTML, CSS, JS) from the project directory
app.use(express.static(path.join(__dirname)));

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://flip1.engr.oregonstate.edu:${PORT}/`);
});