const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', (req, res) => {
    res.send("Welcome!!");
    res.send("Enter your OTP:");
});

//generate a 5-digit OTP
let number = 10000 + Math.floor(Math.random() * 89999);
console.log(number);

app.get('/verify', (req, res) => {

});

app.listen(3000, () => {
    console.log("Server started at PORT 3000");
});
