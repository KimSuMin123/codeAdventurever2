var mysql = require('mysql2');
var db = mysql.createConnection({
    host: 'localhost', // Updated host
    user: 'root',
    password: '0000',
    database: 'codeadventure',
    port: 3306// Updated port
});
db.connect();

module.exports = db;
