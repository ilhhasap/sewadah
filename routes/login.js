const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const conn = mysql.createConnection(
    {host: "localhost", user: "root", password: "", database: "sewadah"}
);
const path = require('path')
const { body, validationResult } = require('express-validator');
const Swal = require('sweetalert2')
const bodyParser = require('body-parser')
const session = require('express-session')
const crypto = require('crypto')
const flash = require('express-flash')
const sessionStore = new session.MemoryStore

// connect ke database
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
    res.redirect('/auth/login')
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
        // const encrypted = cryptr.encrypt(req.body.passwordPengguna)
        var users = {
                  "idPengguna" : '',
                  "usernamePengguna" : req.body.usernamePengguna,
                  "passwordPengguna" : req.body.passwordPengguna,
                  "emailPengguna" : req.body.emailPengguna,
                  "namaPengguna" : req.body.namaPengguna,
                  "created_at": today,
              }
   let query = conn.query("SELECT * FROM pengguna WHERE usernamePengguna = ?", [username],  (err, result) => {
    //    cek apa username sudah ada di DB
    if (!err && (result.length > 0)) {
          // jika gagal redirect harus sign up lagi
    // diisi alert
    req.session.sessionFlash = {
        type: 'danger',
        message: 'Gagal Register!'
    }
    res.redirect('/')

    next()
} else {
    conn.query('INSERT INTO pengguna SET ?', users, (error, results, fields) => {
        if (error)
            throw error
            //jika berhasil redirect ke login dan diberi alert
            req.session.sessionFlash = {
                type: 'success',
                message: 'Berhasil Register!, silahkan Login...'
            }
            res.redirect('/')
        next()
    })   
}

})
})


router.post('/login', (req, res) => {
    const usernamePengguna = req.body.usernamePengguna
    const passwordPengguna = req.body.passwordPengguna
    // ? untuk encrypt password dari inputan
    //  const encryptPassword = cryptr.encrypt(req.body.passwordPengguna)
    //  const decryptPassword = cryptr.decrypt(encryptPassword)
     // * cek username dan password tidak kosong
    if (usernamePengguna && passwordPengguna) {
        conn.query('SELECT * FROM pengguna WHERE usernamePengguna = ? AND passwordPengguna = ?',[usernamePengguna, passwordPengguna],  (err, results, fields) => {
            if (results.length > 0) {
                req.session.login = true
                req.session.usernamePengguna = usernamePengguna
                console.log('berhasil login')
                res.redirect('/admin')
            } else {
                res.redirect('/')
            }
            res.end()
        })
    } else {
        res.send('tolong masukan username dan password!  <br> <a href="/auth/login">kembali login</a>')
        res.end()
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

module.exports = router