const express = require('express')
const app = express()
const ejs = require('ejs')
const mysql = require('mysql')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const myConnection = require('express-myconnection')
const path = require('path')    

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')


// LINK
app.use('/', require('./routes/home.js'))
app.use('/auth', require('./routes/login.js'))


app.listen(3000, () => {
    console.log('Server running at port 3000: http://127.0.0.1:3000')
})