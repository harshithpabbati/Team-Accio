var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Team-Accio");
var User = require('./models/user');
var Package = require('./models/package');

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
    var email = req.body.email; 
    var username = req.body.username;
    var number = req.body.number;
    var password = req.body.password;
    var rollno = req.body.rollno;

    var newuser = new User();
    newuser.email = email;
    newuser.username = username;
    newuser.number = number;
    newuser.password = password;
    newuser.rollno = rollno;
    newuser.save(function(err,savedUser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }

        return res.redirect('/dashboardadmins');
    }) 

});
app.post("/login", (req,res)=>{
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username,password: password},function(err,user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.redirect('/');
        }
        return res.redirect('/dashboardadmins');
    })
});
app.post("/packages", (req,res) => {
    var email = req.body.email; 
    var packageid = req.body.packageid;
    var rollno = req.body.rollno;
    var couriername = req.body.couriername;
    var status = req.body.status;

    var newpackage = new Package();
    newpackage.email = email;
    newpackage.packageid = packageid;
    newpackage.rollno = rollno;
    newpackage.couriername = couriername;
    newpackage.status = status;
    newpackage.save(function(err,savedUser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }

        return res.redirect('/dashboardadmins');
    })     
})
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running at port 8000`);
});