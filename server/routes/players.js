const router = require('express').Router();
let Player = require('../models/player.model');
let Game = require('../models/game.model')


router.route('/').get((req, res) => {
    Player.find()
        .then(Players => res.json(Players))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/add').post((req, res) => {


    const gameId = req.body.gameId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const timeOnPitch = req.body.timeOnPitch;
    const distance = req.body.distance;
    const distanceHalfOne = req.body.distanceHalfOne;
    const distanceHalfTwo = req.body.distanceHalfTwo;
    const progressiveSprints = req.body.progressiveSprints;
    const progressiveSprintsHalfOne = req.body.progressiveSprintsHalfOne;
    const progressiveSprintsHalfTwo = req.body.progressiveSprintsHalfTwo;
    const sprints = req.body.sprints;
    const sprintsHalfOne = req.body.sprintsHalfOne;
    const sprintsHalfTwo = req.body.sprintsHalfTwo;
    const topSpeed = req.body.topSpeed;

    const newPlayer = new Player({ gameId, firstName, lastName, timeOnPitch, distance, distanceHalfOne, distanceHalfTwo, progressiveSprints, progressiveSprintsHalfOne, progressiveSprintsHalfTwo, sprints, sprintsHalfOne, sprintsHalfTwo, topSpeed })


    console.log(newPlayer);

    newPlayer.save()
        .then(() =>
            res.json('Player added')
        )
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/find/:playerName').get((req, res) => {
    try {
        Game.findOne({ playerName: req.params.playerName }, function (err, obj) {
            res.json(obj)
        });

        //res.json(game)
    } catch (err) {
        console.log(err)
    }
})
module.exports = router
