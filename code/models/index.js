const mysql = require('mysql')

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "htshop"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected Database Successfully!");
});

module.exports = db