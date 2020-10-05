const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const moment = require('moment')
// const conn = mysql.createConnection(
//     {host: "localhost", user: "root", password: "", database: ""}
// );
const path = require('path')

//connect ke database
// conn.connect(err => {
//     if (err) 
//         throw err;
//     console.log("Mysql Connected...");
// });

router.get("/", (req, res) => {
        res.render("home", {
            title: "Halaman Home",
        })
});

router.get("/:inSearch", (req, res) => {
    var inSearch = req.params.inSearch
        console.log(`${inSearch}`)
});

module.exports = router;