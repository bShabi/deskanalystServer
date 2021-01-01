const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const playerSchema = new Schema ({
    playerId: {
        type:Number,
        required:true,
    },
    gameId: {
        type:Number,
        required:true,
    },
    teamId: {
        type:Number,
        required:true,
        trim: true,
    },
    firstName: {
        type:String,
        required:true,
        minlength:3,
        trim: true,
    },
    lastName: {
        type:String,
        required:true,
        minlength:3,
        trim: true,
    },
    timeOnPitch: {
        type:Number,
        required:true,
        minlength:3,
        trim: true,
    },
    distance: {
        type:Number,
        required:true,
        trim: true,
    },
    distanceHalfOne: {
        type:Number,
        required:true,
        trim: true,
    },
    distanceHalfTwo: {
        type:Number,
        required:true,
        trim: true,
    },
    progressiveSprints: {
        type:Number,
        required:true,
        trim: true,
    },
    progressiveSprintsHalfOne: {
        type:Number,
        required:true,
        trim: true,
    },
    progressiveSprintsHalfTwo: {
        type:Number,
        required:true,
        trim: true,
    },
    sprints: {
        type:Number,
        required:true,
        trim: true,
    },
    sprintsHalfOne: {
        type:Number,
        required:true,
        trim: true,
    },
    sprintsHalfTwo: {
        type:Number,
        required:true,
        trim: true,
    },
    topSpeed: {
        type:Number,
        required:true,
        trim: true,
    },

},)
const Player = mongoose.model('Player',playerSchema);

module.exports = Player;
//First Name ,Last Name , Time on Pitch (mins) , Distance (km) , Distance 1st Half (km) , Distance 2nd Half (km) , Progressive Sprints  rogressive Sprints 1st Half, rogressive Sprints 2st Half, Sprints ,Sprints 1st Half" ,Sprints 2st Half" ,Top Speed