var mongoose = require('mongoose');
var Schema = mongoose.Schema;

PackageSchema = new Schema({
    name: String,
    rollno: String,
    couriername : String,
    status: String
});
Package = mongoose.model("packages", PackageSchema);

module.exports = Package;