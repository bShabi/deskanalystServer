const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const accountSchema = new Schema ({
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
    email: {
        type:String,
        required:true,
        minlength:3,
        trim: true,

    },
    password: {
        type:String,
        required:true,
        minlength:3,
        trim: true,

    },
    teamName: {
        type:String,
        required:true,
        minlength:3,
        trim: true,

    },
    permission: {
        type:String,
        required:true,
        minlength:3,
        trim: true,
    }
},{
    timestamps:true
});

const Account = mongoose.model('Account',accountSchema);

module.exports = Account;