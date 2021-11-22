const mysql = require("mysql");
var dbconnect = {
    getConnection: function () {

        var conn = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'toor', //your own password
            database: 'spdatabase',
            dateStrings: true
        });

        return conn;
    }
};


module.exports = dbconnect;
