var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var DaysEnum = Object.freeze({"monday":1, "tuesday":2, "wednesday":3});

var User = new Schema({
	name: String,
	username: String,
	password: String,
	prof_pic: String,
	tagsOfInterest : [],


	
	}
);


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);