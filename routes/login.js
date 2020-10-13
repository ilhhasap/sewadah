const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const conn = mysql.createConnection(
    {host: "localhost", user: "root", password: "", database: "sewadah"}
);
const path = require('path')
const Cryptr = require('cryptr')
const { body, validationResult } = require('express-validator');

// connect ke database
conn.connect(err => {
    if (err) 
        throw err;
    console.log("Mysql Connected...");
});


router.post("/", [
    body('usernamePengguna').isLength({ min: 8 }),
    body('passwordPengguna').isLength({ min: 8 }).withMessage('minimal 8 karakter'),
    body('emailPengguna').normalizeEmail().isEmail(),
    body('namaPengguna').isAlpha().trim()
], (req, res) => {
    const today = new Date()
    const encrypted = cryptr.encrypt(req.body.password)

    const users = {
        "idPengguna" : '',
        "usernamePengguna" : req.body.namaPengguna,
        "passwordPengguna" : req.body.password,
        "emailPengguna" : req.body.password,
        "namaPengguna" : req.body.password,
        "created_at":today,
    }

    conn.query('INSERT INTO pengguna SET ?', users, (error, results, fields) => {
        if(error) {
            res.json({
                status : false,
                message : 'there are some error with query',
            })
        } else {
            res.json({
                status : true,
                data : results,
                message : 'user registered sucessfully'
            })
            res.redirect('/')
        }
    }
    )
});

module.exports = router;