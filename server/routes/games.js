const router = require('express').Router();
let Game = require('../models/game.model');

router.route('/').get((req, res) => {
    Game.find()
        .then(Players => res.json(Players))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:byMyTeam').get((req, res) => {
    console.log(req.params.byMyTeam)
    Game.findById({ "myTeamHalfScore": 3 })
        .then(games => console.log(games))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/add/').post((req, res) => {


    const matchId = req.body.matchId;
    const teamId = req.body.teamId;
    const myTeam = req.body.myTeam;
    const opponentTeam = req.body.opponentTeam;
    const gameDate = req.body.gameDate;
    const myTeamHalfScore = req.body.myTeamHalfScore;
    const anotherHalfScore = req.body.anotherHalfScore;
    const myTeamFinalScore = req.body.myTeamFinalScore;
    const anotherFinalScore = req.body.anotherFinalScore;
    const shotOnTargetHalfOne = req.body.shotOnTargetHalfOne;
    const shotOnTargetHalfTwo = req.body.shotOnTargetHalfTwo;
    const shotOFFTargetHalfOne = req.body.shotOFFTargetHalfOne;
    const shotOFFTargetHalfTwo = req.body.shotOFFTargetHalfTwo;
    const corrnerHalfOne = req.body.corrnerHalfOne;
    const corrnerHalfTwo = req.body.corrnerHalfTwo;
    const offsidesHalfOne = req.body.offsidesHalfOne;
    const offsidesHalfTwo = req.body.offsidesHalfTwo;
    const tackelsHalfOne = req.body.tackelsHalfOne;
    const tackelsHalfTwo = req.body.tackelsHalfTwo;
    const stealHalfOne = req.body.stealHalfOne;
    const stealHalfTwo = req.body.stealHalfTwo;

    console.log("add")

    const newGame = new Game({ matchId, teamId, myTeam, opponentTeam, gameDate, myTeamHalfScore, anotherHalfScore, myTeamFinalScore, anotherFinalScore, shotOnTargetHalfOne, shotOnTargetHalfTwo, shotOFFTargetHalfOne, shotOFFTargetHalfTwo, corrnerHalfOne, corrnerHalfTwo, offsidesHalfOne, offsidesHalfTwo, tackelsHalfOne, tackelsHalfTwo, stealHalfOne, stealHalfTwo })


    console.log(newGame);

    newGame.save()
        .then(() => res.json('Game added'))
        .catch(err => res.status(400).json('Error' + err))
});
router.route('/find/:matchId').get((req, res) => {
    try {
        Game.findOne({ matchId: req.params.matchId }, function (err, obj) {
            res.json(obj)
        });

        //res.json(game)
    } catch (err) {
        console.log(err)
    }
})
router.route('/remove/:matchId').delete((req, res) => {
    try {
        Game.deleteOne({ matchId: req.params.matchId }, function (err, obj) {
            console.log("Match Delete");
            res.json("Delete")
        });

        //res.json(game)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
