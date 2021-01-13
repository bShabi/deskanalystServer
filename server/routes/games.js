const router = require('express').Router();
let Game = require('../models/game.model');

router.route('/').get(async (req, res) => {
    try {
        await Game.find()
            .then(Games => res.json(Games))
            .catch(err => res.status(400).json('Error: ' + err))
    } catch (error) {
        console.log(error)
    }

})

router.route('/:byMyTeam').get((req, res) => {
    console.log(req.params.byMyTeam)
    Game.findById({ "myTeamHalfScore": 3 })
        .then(games => console.log(games))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/add/').post((req, res) => {


    const teamid = req.body.teamid;
    const myTeamName = req.body.myTeamName
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
    const gameStats = {
        distance: req.body.gameStats.distance,
        progressive_Sprints: req.body.gameStats.progressive_Sprints,
        sprints: req.body.gameStats.sprints,
        top_Speed: req.body.gameStats.top_Speed

    }
    // console.log("req.body")
    console.log(new Date(gameDate).toLocaleTimeString)

    const newGame = new Game({ teamid, myTeamName, opponentTeam, gameDate, myTeamHalfScore, anotherHalfScore, myTeamFinalScore, anotherFinalScore, shotOnTargetHalfOne, shotOnTargetHalfTwo, shotOFFTargetHalfOne, shotOFFTargetHalfTwo, corrnerHalfOne, corrnerHalfTwo, offsidesHalfOne, offsidesHalfTwo, tackelsHalfOne, tackelsHalfTwo, stealHalfOne, stealHalfTwo, gameStats })



    newGame.save(function (err, game) {
        if (err)
            res.json(err)
        res.json(game)
    });
});
router.route('/find/:teamid').get(async (req, res) => {
    try {
        await Game.find({ teamid: req.params.teamid }, function (err, obj) {
            res.json(obj)
        });

        //res.json(game)
    } catch (err) {
        console.log(err)
    }
})
router.route('/findgame/:gameID').get(async (req, res) => {
    try {
        await Game.find({ _id: req.params.gameID }, function (err, obj) {
            res.json(obj)
        });

        //res.json(game)
    } catch (err) {
        console.log(err)
    }
})
router.route('/remove/:matchId').delete(async (req, res) => {
    try {
        await Game.deleteOne({ _id: req.params.matchId }, function (err, obj) {
            if (err)
                console.log(err)
            console.log("Game Delete");
            res.json("Delete")
        });

        //res.json(game)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
