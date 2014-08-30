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
    date: Date
    
});
module.exports = mongoose.model('eventItem', eventItem);