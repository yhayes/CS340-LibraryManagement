// Import the MySQL package
const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_hayesy',
    password: '3041',
    database: 'cs340_hayesy'
});

// Export the pool so it can be used in other files
module.exports = pool;