#!/usr/bin/env node
const express = require('express');
const cors = require('cors');

const app = express();



const https = require('node:https');
// app.set('view engine', 'ejs');
app.set('view engine', 'jsx')
app.use(cors())
app.use(express.static(__dirname + '/public'));
app.use('/',express.static(__dirname + '/views/admin/build'));


var apiRouter = require('./routers/index')
app.use('/', apiRouter)

const fs = require('fs');
var options = {
    key: fs.readFileSync(__dirname + '/server-ssl-file/private.key'),
    ca: fs.readFileSync(__dirname + '/server-ssl-file/gd_bundle_g2_g1.crt'),
    cert: fs.readFileSync(__dirname + '/server-ssl-file/cert.crt')
};
console.log("create https server step...");


const con = require("./database/db")
const webconfig = require("./webconfig")

con.connect(function (err) {
    if (err) {
        console.log('資料庫:connecting error');
        console.log('資料庫:請確認資料庫使否正常連線 !')
        return;
    } else {
        console.log('connecting success');
        console.log("server listen : https://"+webconfig.webhost+":"+webconfig.port)
        https.createServer(options, app, function (req, res) {
            res.writeHead(200);
        }).listen(webconfig.port, webconfig.webhost);
    }
});






