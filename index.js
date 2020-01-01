//Databse : otp
//table : items

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mysql =  require('mysql');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

//Create database connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : ''
});

//Connect
db.connect((err) => {
    if(err) throw err;
    console.log("MySql connected");
});

//Create a database
app.get('/createdb', (req, res) => {
    let sql = `CREATE DATABASE otp`;
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send("Database created successfully.");
    });
});

//Create a table in the database
app.get('/createitemstable', (req, res) => {
    let sql = `CREATE TABLE items(items_id int AUTO_INCREMENT, name VARCHAR(255), pass VARCHAR(255), PRIMARY KEY (items_id))`;
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send("Items table created");
    });
});

//Generate OTP and update it to table, also render a form
app.get('/', (req, res) => {
    //5-digit OTP
    let number = 10000 + Math.floor(Math.random() * 89999);
    console.log(number);

});

app.get('/verify', (req, res) => {

});

app.listen(3000, () => {
    console.log("Server started at PORT 3000");
});
