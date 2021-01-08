const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const gameSchema = new Schema({

    teamid: {
        type: Schema.Types.ObjectId,
        ref: 'Team',

    },
    myTeamName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    opponentTeam: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    gameDate: {
        type: Date,
        trim: true,
    },
    myTeamHalfScore: {
        type: Number,
        required: true,
        trim: true,
    },
    anotherHalfScore: {
        type: Number,
        required: true,
        trim: true,
    },
    myTeamFinalScore: {
        type: Number,
        required: true,
        trim: true,
    }
    ,
    anotherFinalScore: {
        type: Number,
        required: true,
        trim: true,
    },
    shotOnTargetHalfOne: {
        type: Number,
        required: true,
        trim: true,
    },
    shotOnTargetHalfTwo: {
        type: Number,
        required: true,
        trim: true,
    },
    shotOFFTargetHalfOne: {
        type: Number,
        required: true,
        trim: true,
    },
    shotOFFTargetHalfTwo: {
        type: Number,
        required: true,
        trim: true,
    },
    corrnerHalfOne: {
        type: Number,
        required: true,
        trim: true,
    },
    corrnerHalfTwo: {
        type: Number,
        required: true,
        trim: true,
    },
    offsidesHalfOne: {
        type: Number,
        required: true,
        trim: true,
    },
    offsidesHalfTwo: {
        type: Number,
        required: true,
        trim: true,
    },
    tackelsHalfOne: {
        type: Number,
        required: true,
        trim: true,
    },
    tackelsHalfTwo: {
        type: Number,
        required: true,
        trim: true,
    },
    stealHalfOne: {
        type: Number,
        required: true,
        trim: true,
    },
    stealHalfTwo: {
        type: Number,
        required: true,
        trim: true,
    },

})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;