const express = require('express');
const path = require('path');

const app = express();
const PORT = 5678;

// Serve static files from the cs340 directory
app.use(express.static(__dirname));

// Serve index.html explicitly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}/`);
});