const router = require('express').Router();
let Team = require('../models/team.model');



router.route('/').get((req,res) => {
    Team.find()
    .then(Teams => res.json(Teams))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/add').post((req,res) => {

    const teamName = req.body.teamName;
    
    const newTeam= new Team({teamName})
    console.log(newTeam);

    newTeam.save()
    .then(() => res.json('Team added'))
    .catch(err => res.status(400).json('Error' + err))
});
 
module.exports = router
