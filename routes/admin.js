const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const moment = require('moment')
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

router.get("/", (req, res) => {
    const idPengguna = req.session.idPengguna
    // const dataPengguna = `SELECT pengguna.*, catalog_pengguna.*, link.* FROM pengguna INNER JOIN catalog_pengguna.id_pengguna = pengguna.id_pengguna INNER JOIN link.id_pengguna = pengguna.id_pengguna WHERE usernamePengguna = ${sessionUsername}`
    const dataPengguna = `SELECT * FROM pengguna WHERE idPengguna = idPengguna`
    let query = conn.query(dataPengguna, (err, dataPengguna) => {
        if (err) 
        throw err
    if(req.session.login && req.session.username) {
        res.render("admin", {
            title:  "Admin - Sewadah",
            sessionLogin : req.session.login,
            usernamePengguna : req.session.usernamePengguna,
            dataPengguna
        })
    } else {
        res.redirect('/')
    }
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