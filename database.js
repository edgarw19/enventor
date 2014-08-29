var mongoose = require('mongoose');
var eventItem = require('./models/eventItems');
var db = mongoose.connect('mongodb://localhost/itemTest');

var connection = mongoose.connection;
connection.once('open', function callback () {
	/*var testItem = new eventItem(
	{
		title: "Testitem2",
		description: "Testing out this item2",
		attendeeNumber: 10,
		repNumber: 10,
		attendeePhotos: ["bob.agwega"],
		tags: ["aweg", "aweg"],
		type: "STUDENT"
	});

	var testItem2 = new eventItem(
	{
title: "Testitem3",
		description: "Testing out this item3",
		attendeeNumber: 10,
		repNumber: 10,
		attendeePhotos: ["bob"],
		tags: ["aweg", "aweg"],
		type: "PERSONAL"
	});

	testItem.save(function (err, item) {
		if (err) return console.error(err);
	});
	testItem2.save(function (err, item) {
		if (err) return console.error(err);
	});*/
var item;
eventItem.findOne({title: "Testitem2"}, 'title', function(err, itemz) {
	item = itemz;
	console.log(item);
});

});
module.exports = db;