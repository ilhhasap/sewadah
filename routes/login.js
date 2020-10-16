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

// connect ke database
conn.connect(err => {
    if (err) 
        throw err;
    console.log("Mysql Connected...");
});


router.post("/", [
    usernamePengguna = body('usernamePengguna').isLength({ min: 8 }),
    passwordPengguna = body('passwordPengguna').isLength({ min: 8 }).withMessage('minimal 8 karakter'),
    emailPengguna = body('emailPengguna').normalizeEmail().isEmail(),
    namaPengguna = body('namaPengguna').isAlpha().trim(),
], (req, res) => {
    const errors = validationResult(req)
    const today = new Date()
    const encrypted = cryptr.encrypt(req.body.passwordPengguna)
    if (!errors.isEmpty() || body('confirm_password') != body('passwordPengguna')) {
        // return res.status(400).json({ errors: errors.array() });
        req.session.someoneSignUp = false
        res.redirect('/')
      }

    const users = {
        "idPengguna" : '',
        "usernamePengguna" : req.body.namaPengguna,
        "passwordPengguna" : encrypted,
        "emailPengguna" : req.body.emailPengguna,
        "namaPengguna" : req.body.namaPengguna,
        "created_at":today,
    }

    const query = conn.query('INSERT INTO pengguna SET ?', users, (error, results, fields) => {
        if (error)
            throw error
        req.session.someoneSignUp = true
        res.redirect("/")
        res.end()
    })
});

module.exports = router