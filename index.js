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

var nameSchema = new mongoose.Schema({
    name: String,
    phoneno: String,
    packageid: String,
    rollno: String,
    Couriername: String,
    status: String
});
var dash = mongoose.model("dash", nameSchema);

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
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

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
app.post("/dashboard", (req, res) => {
    var myData = new signup(req.body);
    myData.save()
        .then(item => {
            res.redirect('/dashboardadmins')
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.post("/trail", (req, res) => {
    var data = new dash(req.body);
    data.save()
        .then(item => {
            
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});