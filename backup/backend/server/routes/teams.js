const router = require('express').Router();
let Team = require('../models/team.model');



router.route('/').get((req, res) => {
    Team.find()
        .then(Teams => res.json(Teams))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/remove/:teamID').delete(async (req, res) => {
    var teamID = req.params.teamID
    await Team.deleteOne({ _id: teamID }, function (err, obj) {
        if (err)
            console.log(err)
        console.log("Team Delete");
        res.json("Team Delete")
    });
})
router.route('/update/:updateTeam').post((req, res) => {

    const team = new Team(JSON.parse(req.params.updateTeam))

    console.log(team)
    Team.update({ _id: team._id }, {
        account: team.account,
        teamName: team.teamName,

    }, function (err, obj) {
        if (err)
            console.log("err" + err)
        res.json("Success Team Update")
    });

})
router.route('/add').post((req, res) => {

    const { teamName, account } = req.body

    const newTeam = new Team({ teamName, account })
    console.log(newTeam);

    newTeam.save()
        .then(() => res.json('Team added'))
        .catch(err => res.json(null))
});
router.route('/findByTeamId/:teamId').get((req, res) => {

    console.log(req.params.teamId)

    Team.findById(req.params.teamId, function (err, obj) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(obj)
            obj.teamName === null ? res.json('') : res.json(obj.teamName)
        }
    });
})

const url = []
router.route("/hook/").post((req, res, next) => {
    console.log(req.params.url)
    url.push(req.params.url);


    /**
     * Your Kafka action or something else. There
     * you should collect info about success or
     * fail of client's action.
     */

    /** 
     * Your API call to webhookUrl with 
     * your defined body about status of event
     */

    res.status(200).send('OK')
});
module.exports = router
