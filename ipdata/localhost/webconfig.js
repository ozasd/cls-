const ipconfig = require('./views/admin/src/ipconfig')
const path = {
    // web setting
    // "webhost":"127.0.0.1",
    "webhost":ipconfig.webhost.split('//')[1],
    "port":ipconfig.port,
    // database setting
    "host" : "35.201.246.163",
    // "host": 'localhost', 
    user: "Jarvisadmin",
    password: "Jarvisadmin!@#$",
    database: "hct_cls"
}

module.exports = path;
