var mongoose = require('mongoose');
var Schema = mongoose.Schema;

UserSchema = new Schema({
    email: String,
    username: String,
    number: Number,
    password: String,
    rollno: String
});
User = mongoose.model("users", UserSchema);

module.exports = User;