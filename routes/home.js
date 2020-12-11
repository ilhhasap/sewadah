const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const moment = require('moment')
const session = require('express-session')
const conn = mysql.createConnection(
    {host: "localhost", user: "root", password: "", database: "sewadah"}
);
const path = require('path')
const flash = require('express-flash')
const sessionStore = new session.MemoryStore
//connect ke database
conn.connect(err => {
    if (err) 
        throw err;
    console.log("Mysql Connected...");
});
router.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
router.use(flash());
router.use(function(req, res, next){
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});


// ! CODINGAN
router.get("/", (req, res) => {
        res.render("home", {
            title: "Home - Sewadah",
            sessionLogin : req.session.login,
            sessionUsername : req.session.username,
            expressFlash: req.flash('success'), sessionFlash: res.locals.sessionFlash
        })
});

// router.post("/", (req, res) => {
//     const inSearch = req.params.inSearch
//     res.render("home", {
//         title: "Halaman Home",
//     })
//     Swal.fire('Good Job', 'berhasil', 'success')
// });

module.exports = router;