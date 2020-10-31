const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const moment = require('moment')
const session = require('express-session')
const conn = mysql.createConnection(
    {host: "localhost", user: "root", password: "", database: "sewadah"}
);
const path = require('path')

//connect ke database
conn.connect(err => {
    if (err) 
        throw err;
    console.log("Mysql Connected...");
});

router.use(session({
    secret: 'sosecret',
    resave: false,
    saveUninitialized: false
}))

router.get("/", (req, res) => {
    if(req.session.login && req.session.username) {
        res.render("admin", {
            title:  "Admin - Sewadah",
            sessionLogin : req.session.login,
            sessionUsername : req.session.username
        })
    } else {
        res.redirect('/')
    }
});

// router.post("/", (req, res) => {
//     const inSearch = req.params.inSearch
//     res.render("home", {
//         title: "Halaman Home",
//     })
//     Swal.fire('Good Job', 'berhasil', 'success')
// });

module.exports = router;