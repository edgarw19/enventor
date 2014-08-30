var mongoose = require('mongoose');
var eventItem = require('./models/eventItems');
var db = mongoose.connect('mongodb://localhost/itemTest');

var connection = mongoose.connection;
connection.once('open', function callback () {


	/*var testItem = new eventItem(
	{
		title: "Party",
		description: "A party is a gathering of people who have been invited by a host for the purposes of socializing, conversation, recreation, or as part of a festival or other commemoration of a special occasion. A party will typically feature food and beverages, and often music and dancing or other forms of entertainment.",
		attendeeNumber: 10,
		repNumber: 10,
		attendeePhotos: ["https://scontent-a-ord.xx.fbcdn.net/hphotos-xfp1/t31.0-8/10333533_10204213670480447_3489481318272704030_o.jpg", "https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-xpa1/t1.0-9/10357532_10203853509236641_4804513475102392747_n.jpg"],
		tags: ["aweg", "aweg"],
		type: "STUDENT",
		picture:"http://the-digital-reader.com/wp-content/uploads/2013/10/Calvin-Hobbes-calvin-26-hobbes-254155_1024_7681.jpg",
		attendeeNames: ["Edgar", "Edgar2"],
		date: Date()
		
	});

	testItem.save(function (err, item) {
		if (err) return console.error(err);
	});

//var item;
eventItem.findOne({title: "Testitem2"}, 'title', function(err, itemz) {
	item = itemz;
	console.log(item);
});*/

});
module.exports = db;