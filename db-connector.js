// Citation for the following database connection setup:
// Date: 03/13/2025
// Based on: CS340 Node.js Starter App Guide
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_hayesy',
    password: '3041',
    database: 'cs340_hayesy'
});


module.exports = pool;