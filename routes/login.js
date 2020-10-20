const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const conn = mysql.createConnection(
    {host: "localhost", user: "root", password: "", database: "sewadah"}
);
const path = require('path')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('myTotalySecretKey');
const { body, validationResult } = require('express-validator');
const Swal = require('sweetalert2')
const bodyParser = require('body-parser')


// connect ke database
conn.connect(err => {
    if (err) 
        throw err;
    console.log("Mysql Connected...");
});


router.get("/", (req, res) => {
    res.redirect('/auth/login')
});
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Log In - Sewadah",
    })
});

router.get("/signup", (req, res) => {
    res.render("signup", {
        title: "Sign Up - Sewadah",
    })
});

router.post("/signup", [
    // validasi per input
    body('usernamePengguna', 'minimal 8 karakter').isLength({ min: 8 }).escape(),
    body('passwordPengguna', 'minimal 8 karakter').isLength({ min: 8 }).escape(),
    body('emailPengguna', 'email gak valid').isEmail().escape(),
    body('namaPengguna',).escape(),
], (req, res, next) => {

    const errors = validationResult(req);
    // cek apakah validasi berhasil
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const username = req.body.usernamePengguna
const today = new Date()
        const encrypted = cryptr.encrypt(req.body.passwordPengguna)
        var users = {
                  "idPengguna" : '',
                  "usernamePengguna" : req.body.usernamePengguna,
                  "passwordPengguna" : encrypted,
                  "emailPengguna" : req.body.emailPengguna,
                  "namaPengguna" : req.body.namaPengguna,
                  "created_at": today,
              }
   let query = conn.query("SELECT * FROM pengguna WHERE usernamePengguna = ?", [username],  (err, result) => {
    //    cek apa username sudah ada di DB
    if (!err && (result.length > 0)) {
          // jika gagal redirect harus sign up lagi
    // diisi alert
    res.redirect('/auth/signup')
    next()
} else {
    conn.query('INSERT INTO pengguna SET ?', users, (error, results, fields) => {
        if (error)
            throw error
            //jika berhasil redirect ke login dan diberi alert
        res.redirect('/auth/login')
        next()
    })   
}

})
})


router.post('/login', (req, res) => {
    const usernameEmail = req.body.usernameEmail
    const passwordPengguna = req.body.passwordPengguna
    if(usernameEmail.isEmail())
        const emailPengguna = req.body.usernameEmail
        else if(!usernameEmail.isEmail())
        const usernamePengguna = req.body.usernameEmail
    if (username && password) {
        conn.query("SELECT * FROM pengguna WHERE (usernamePengguna = ? OR emailPengguna = ?) AND passwordPengguna = ?",[usernameEmail,usernameEmail, passwordPengguna],  (err, results, fields) => {
            if (results.length > 0) {
                console.log('berhasil login')
            } else {
                res.send('username dan password salah! <br> <a class="btn btn-primary" href="/login" role="button">kembali login</a> ')
            }
            res.end()
        })
    } else {
        res.send('tolong masukan username dan password!  <br> <a href="/login">kembali login</a>')
        res.end()
    }
})



module.exports = router