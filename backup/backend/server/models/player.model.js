const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const playerSchema = new Schema({

    gameId: { type: Schema.Types.ObjectId, ref: 'Game' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: false},
    goals: { type: Number, required: true},
    position: { type: String, required: true},
    firstName: {  type: String,  required: true,  minlength: 3,  trim: true},
    lastName: { type: String, required: true, minlength: 3, trim: true},
    timeOnPitch: { type: Number, required: true, minlength: 3, trim: true },
    distance: { type: Number, required: true, trim: true},
    distanceHalfOne: { type: Number, required: true, trim: true},
    distanceHalfTwo: { type: Number, required: true, trim: true},
    progressiveSprints: { type: Number, required: true, trim: true},
    progressiveSprintsHalfOne: { type: Number, required: true, trim: true },
    progressiveSprintsHalfTwo: { type: Number, required: true, trim: true},
    sprints: { type: Number, required: true, trim: true},
    sprintsHalfOne: { type: Number, required: true, trim: true},
    sprintsHalfTwo: { type: Number, required: true, trim: true },
    topSpeed: { type: Number, required: true, trim: true },

})

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
