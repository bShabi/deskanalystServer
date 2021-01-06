const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,

    },
    email: {
        type: String,

        required: true,
        minlength: 3,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,

    },
    teamid: {
        type: Schema.Types.ObjectId,
        ref: 'Team',

    },
    permission: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    }
},
);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;