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
        res.json("Delete")
    });
})
router.route('/add').post((req, res) => {

    const teamName = req.body.teamName;
    const account = req.body.account

    const newTeam = new Team({ teamName, account })
    console.log(newTeam);

    newTeam.save()
        .then(() => res.json('Team added'))
        .catch(err => res.json(null))
});

module.exports = router
