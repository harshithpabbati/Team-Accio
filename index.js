var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'jade');


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
    Package.find({},function(err,docs){
        if(err) res.json(err);
        else res.render('dashboard.jade',{packages:docs})
    });
});
app.get('/dashboard',(req,res) =>{
    Package.find({},function(err,docs){
        if(err) res.json(err);
        else res.render('dashboardstd.jade',{packages:docs})
    });
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
    var name = req.body.name; 
    var rollno = req.body.rollno;
    var couriername = req.body.couriername;
    var status = req.body.status;

    var newpackage = new Package();
    newpackage.name = name;
    newpackage.rollno = rollno;
    newpackage.couriername = couriername;
    newpackage.status = status;
    newpackage.save(function(err,pack){
        if(err){
            console.log(err);
            return res.status(500).send();
        }

        return res.redirect('/dashboardadmins');
    })     
});
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running at port 8000`);
});