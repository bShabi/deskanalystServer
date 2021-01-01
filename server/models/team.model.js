const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const teamSchema = new Schema ({
    teamName: {
        type:String,
        required:true,
        minlength:3,
        trim: true,
    },
})
const Team = mongoose.model('Team',teamSchema);

module.exports = Team;