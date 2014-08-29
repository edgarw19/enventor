var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var eventItem = new Schema({
    title: String,
    description: String,
    attendeeNumber: Number,
    repNumber: Number,
    attendeePhotos: [],
    tags: [],
    type: String,
    picture: String,
    creator_id: String
    
});

module.exports = mongoose.model('eventItem', eventItem);