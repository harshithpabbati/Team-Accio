var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema({
    fullname: String,
    number: Number,
    emailId: String,
    password: String,
    reenterpassword: String,
    rollno: String
});
User = mongoose.model("User", userSchema);

module.exports = User;