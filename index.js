var express = require("express");
var app = express();
var port = 8000;
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Team-Accio");
var userSchema = new mongoose.Schema({
    email: String,
    number: Number,
    password: String,
    reenterpassword: String,
    rollno: String
});
var User = mongoose.model("User", userSchema);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/images'));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/dashboardadmins",(req,res) =>{
    res.sendFile(__dirname+ "/dashboard.html");
});
app.get("/dashboardforstudents",(req,res) =>{
    res.sendFile(__dirname+ "/dashboardforstudents.html");
});
app.post("/dashboard", (req, res) => {
    var user = new User(req.body);
    user.save()
        .then(user => {
            res.redirect('/dashboardadmins');
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
app.post("/login", (req,res)=>{
    User.findOne({ email: req.body.email}, function(err, user) {
        if(user ===null){
          res.redirect('/');
       }else if (user.email === req.body.email && user.password === req.body.password){
       res.redirect('/dashboardadmins');
       }
    })
});
app.listen(port, () => {
    console.log("Server listening on port " + port);
});