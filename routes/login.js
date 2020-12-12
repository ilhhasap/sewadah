const express = require("express");
const expressValidator = require("express-validator");
const router = express.Router();
const mysql = require("mysql");
const conn = mysql.createConnection(
    {host: "localhost", user: "root", password: "", database: "sewadah"}
);
const path = require('path')
const Swal = require('sweetalert2')
const bodyParser = require('body-parser')
const session = require('express-session')
const crypto = require('crypto')
const flash = require('express-flash')
const sessionStore = new session.MemoryStore
const { check, validationResult } = require('express-validator');

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
    check('usernamePengguna', 'Username hanya mengandung angka/huruf').isLength({ min: 8 }).isAlphanumeric().escape().trim(),
    check('passwordPengguna', 'Password minimal 8 karakter').isLength({ min: 8 }).escape().trim(),
    check('emailPengguna', 'email tidak valid').isEmail().escape().trim(),
    check('namaPengguna','Nama harus berupa huruf').isAlpha().escape().trim(),
], (req, res, next) => {

    const errors = validationResult(req);
    // cek apakah validasi berhasil
  if (!errors.isEmpty()) {
    //  * jika validasi ada yang salah, beri pesan gagal 
    // return res.status(400).json({ errors: errors.array() });
    req.session.sessionFlash = {
        type: 'danger',
        messageTitle: 'Ada inputan yang salah, ',
        message: 'Harap Coba lagi!'
    }
    return res.redirect('/')
}
const today = new Date()
    if(req.body.passwordPengguna == req.body.confirmPassword) {
        // const encrypted = cryptr.encrypt(req.body.passwordPengguna)
        const usernamePengguna = req.body.usernamePengguna
        var users = {
                  "idPengguna" : '',
                  "usernamePengguna" : req.body.usernamePengguna,
                  "passwordPengguna" : req.body.passwordPengguna,
                  "emailPengguna" : req.body.emailPengguna,
                  "namaPengguna" : req.body.namaPengguna,
                  "created_at": today,
              }
   let query = conn.query("SELECT * FROM pengguna WHERE usernamePengguna = ?", [usernamePengguna],  (err, result) => {
    //  *  cek apa username sudah ada di DB
    if (result.length > 0) {
    // * jika username sudah ada, tampil pesan gagal dan redirect ke home lagi
    req.session.sessionFlash = {
        type: 'danger',
        messageTitle: 'Maaf, ',
        message: 'Username sudah digunakan!'
    }
   return res.redirect('/')
} else {
    conn.query('INSERT INTO pengguna SET ?', users, (error, results, fields) => {
        if (error)
            throw error
    // * jika berhasil semua, redirect ke login dan diberi pesan berhasil
            req.session.sessionFlash = {
                type: 'success',
                messageTitle: 'Berhasil Register, ',
                message: 'Login untuk melanjutkan!'
            }
            res.redirect('/')
        next()
    })   
}
})

    } else {
        req.session.sessionFlash = {
            type: 'warning',
            messageTitle: 'Password Tidak sama, ',
            message: 'Coba lagi!'
        }
        res.redirect('/')
    }

    
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
                req.session.idPengguna = results[0].idPengguna
                req.session.sessionFlash = {
                    type: 'success',
                    messageTitle: 'Yeayy, ',
                    message: 'Kamu berhasil Login!'
                }
                res.redirect('/')
            } else {
                req.session.sessionFlash = {
                    type: 'danger',
                    messageTitle: 'Waduhhh, ',
                    message: 'Coba lagi yaa!'
                }
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