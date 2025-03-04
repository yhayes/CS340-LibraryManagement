
const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_preissg',
    password: '5150',
    database: 'cs340_preissg'
});


module.exports = pool;