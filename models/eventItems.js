var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var eventItem = new Schema({
    title: String,
    description: String,
    attendeeNumber: Number,
    repNumber: Number,
    attendeePhotos: [],
    attendeeNames: [],
    tags: [],
    type: String,
    picture: String,
    creator_id: String,
    date: Date,
    time: String,
    location: String,

    //lower case versions of properties for searchability
titleSearch: String,
tagsSearch: [],
locationSearch: String //needs a better type of search, coordinate based, city/zipcode etc...

    
});
module.exports = mongoose.model('eventItem', eventItem);