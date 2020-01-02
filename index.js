//Databse : otp
//table : items

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const mysql =  require('mysql');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

//Create database connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'otp'
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
    res.render('home');                  //Take a name and generate an OTP
});

app.post('/generate', (req, res) => {
    //5-digit OTP
    let number = 10000 + Math.floor(Math.random() * 89999);
    console.log(number);
    let item = {name : req.body.name, pass : number};
    let sql = `INSERT INTO items SET ?`;
    db.query(sql, item, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.render('verify');
    });
});

//Verify the otp entered by the user. If valid then verification was successful and delete the entry from table
//since OTP means one-time password
app.post('/verify', (req, res) => {
    let pin = req.body.pass;
    let sql = `SELECT * FROM items WHERE pass = '${pin}'`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        sql = `SELECT COUNT(*) as cnt FROM items WHERE pass = '${pin}'`;
        db.query(sql, (err1, results1) => {
            if(err1) throw err1;
            //let obj = JSON.parse(JSON.stringify(results1));
            if(results1[0].cnt != 1){
                res.send("Invalid OTP");
                console.log(results1[0].cnt);
            }
            else{
                res.send("User Verification Complete.");
                let sql1 = `DELETE FROM items WHERE pass = '${pin}'`;
                db.query(sql1, (err2, results2) => {
                    if(err2) throw err2;
                    console.log(results2);
                });
            }
        });
    });
});

app.listen(3000, () => {
    console.log("Server started at PORT 3000");
});
