var mysql = require('mysql');
const path = require('../webconfig')

var con = mysql.createConnection({
    host: path.host,
    user: path.user,
    password: path.password,
    database: path.database,
    // HOSTrecord : "localhost"
    // HOSTrecord : "35.201.246.163"
    // user: "Jarvisadmin",
    // password: "Jarvisadmin!@#$",
    // database: "hct_cls",
    // ssl: {
    //     ca: fs.readFileSync(__dirname + './../sql-ssl-file/server-ca.pem'),
    //     key: fs.readFileSync(__dirname + './../sql-ssl-file/client-key.pem'),
    //     cert: fs.readFileSync(__dirname + './../sql-ssl-file/client-cert.pem')
    // }
});

module.exports = con;
