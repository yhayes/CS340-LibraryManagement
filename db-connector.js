
const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_hayesy',
    password: '3041',
    database: 'cs340_hayesy'
});


module.exports = pool;