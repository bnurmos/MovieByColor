const mongoose = require('mongoose');


const MovieSchema = new mongoose.Schema({
    name:{
     type:String,
     required:[true, 'must provide name'],
     trim:true,
     maxlength:[20, 'name can not be more than 20 characters']
    },
    genre:{
        type:String,
        // required:[true, 'must provide genre'],
        trim:true,
        maxlength:[20, 'genre can not be more than 20 characters']
       },
    year: {
        type:String,
    },
    color: {
        type:String,
    },
    watched: {
        type:Boolean,
        default:false,
    },
    starring: {
        type:String
    },
    synopsis: {
        type:String,
    },
    img: {
        type:String,
    },

});

const FeedbackSchema = new mongoose.Schema({
    text:{
     type:String,
     required:[true, 'must provide text'],
     trim:true,
     maxlength:[220, 'text can not be more than 220 characters']
    },
    email:{
        type:String,
        required:false,
        trim:true,
        maxlength:[25, 'email can not be more than 25 characters']
       },
    name:{
        type:String,
        required:[true, 'must provide name'],
        trim:true,
        maxlength:[20, 'name can not be more than 20 characters']
       }, 

}) 

module.exports = {
    Movie: mongoose.model('Movie', MovieSchema),
    Feedback: mongoose.model('Feedback', FeedbackSchema)
};