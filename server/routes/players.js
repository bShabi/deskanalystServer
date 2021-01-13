const router = require('express').Router();
let Player = require('../models/player.model');
let Game = require('../models/game.model')


router.route('/').get(async (req, res) => {
    await Player.find()
        .then(Players => res.json(Players))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/add').post((req, res) => {

    try {
        const gameId = req.body.gameID;
        const teamId = req.body.teamID;
        const firstName = req.body.FirstName;
        const lastName = req.body.LastName;
        const timeOnPitch = req.body.TimeonPitchmins;
        const distance = req.body.Distancekm;
        const distanceHalfOne = req.body.Distance1stHalfkm;
        const distanceHalfTwo = req.body.Distance2ndHalfkm;
        const progressiveSprints = req.body.ProgressiveSprints;
        const progressiveSprintsHalfOne = req.body.ProgressiveSprints1stHalf;
        const progressiveSprintsHalfTwo = req.body.ProgressiveSprints2ndHalf;
        const sprints = req.body.Sprints;
        const sprintsHalfOne = req.body.Sprints1stHalf;
        const sprintsHalfTwo = req.body.Sprints2ndHalf;
        const topSpeed = req.body.TopSpeedkmh;
        const goals = req.body.goals
        const position = req.body.position

        const newPlayer = new Player({ gameId, teamId, firstName, lastName, timeOnPitch, distance, distanceHalfOne, distanceHalfTwo, progressiveSprints, progressiveSprintsHalfOne, progressiveSprintsHalfTwo, sprints, sprintsHalfOne, sprintsHalfTwo, topSpeed, goals, position })


        console.log(teamId);

        newPlayer.save()
            .then(() =>
                res.json('Player added')
            )
            .catch(err => res.json(null))
    } catch (error) {
        console.log(error)
    }

});

router.route('/find/:gameID').get(async (req, res) => {
    try {
        console.log(req.params.gameID)
        await Player.find({ gameId: req.params.gameID }, function (err, obj) {
            res.json(obj)
        });
    } catch (err) {
        console.log(err)
    }
})
router.route('/findByTeamid/:teamID').get((req, res) => {
    try {
        console.log(req.params.teamID)
        Player.find({ teamId: req.params.teamID }, function (err, obj) {
            console.log(obj)

            res.json(obj)
        });
    } catch (err) {
        console.log(err)
    }
})
router.route('/remove/:matchId').delete(async (req, res) => {
    try {
        await Player.deleteMany({ gameId: req.params.matchId }, function (err, obj) {
            if (err)
                console.log(err)
            console.log(" Delete game from Players");
            res.json("Delete")
        });

        //res.json(game)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
