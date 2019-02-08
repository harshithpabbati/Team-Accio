var express = require("express");
var app = express();
var port = 8000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Team-Accio");
var nameSchema = new mongoose.Schema({
    fullname: String,
    number: Number,
    emailId: String,
    password: String,
    reenterpassword: String,
    rollno: String
});
var signup = mongoose.model("Signup", nameSchema);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/images'));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/dashboard",(req,res) =>{
    res.sendFile(__dirname+ "/dashboard.html");
});
app.get("/dashboardforstudents",(req,res) =>{
    res.sendFile(__dirname+ "/dashboardforstudents.html");
});
app.post("/signup", (req, res) => {
    var myData = new signup(req.body);
    myData.save()
        .then(item => {
            res.send("saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});