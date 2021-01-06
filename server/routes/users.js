const router = require('express').Router();
const { json } = require('body-parser');
let account = require('../models/account.model');
let team = require('../models/team.model');


router.route('/').get((req, res) => {
    account.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})
// Register user
router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const teamid = req.body.team; //by Team id
    const permission = req.body.permission;

    const newUser = new account({
        firstName,
        lastName,
        email,
        password,
        teamid,
        permission
    })
    console.log(teamid)

    newUser.save()
        .then(() => {
            console.log(newUser._id)
            team.findById(teamid, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(docs)
                    docs.account.push(newUser._id)
                    console.log(docs)
                    docs.save()
                }
            });
            res.json('User added')
        }
        )
        .catch(err => {
            console.log("in error")
            res.status(400).json('Error' + err)
        })
})
// console.log("try find2 ")
// team.findByIdAndUpdate(
//     teamid,
//     { account: doc._id },
// )
// res.json('User added')
// Delete user by emailId
router.route('/remove/').post((req, res) => {
    const teamID = req.body.userTeam
    const userID = req.body.userID
    console.log("userID, teamID")
    console.log(userID, teamID)
    account.deleteOne({ _id: userID })
        .then(() => {
            team.findById(teamID, function (err, docs) {
                if (err) {
                    console.log("err")
                    console.log(err);
                }
                else {
                    console.log("in else")
                    console.log(docs)
                    docs.account.remove(userID)
                    console.log(docs)
                    docs.save()
                }
            });
            res.json('User added')
        }
        )
})
// account.findByIdAndDelete(req.params.userID)
//     .then(() => res.json("user delete"))
//     .catch(err => res.status(400).json('Error' + err))


// Find User exist
router.route('/find/:emailID').get((req, res) => {
    try {
        account.findOne({
            email: req.params.emailID
        }, function (err, obj) {
            if (err)
                res.json(null)
            res.json(JSON.parse(JSON.stringify(obj)))

        });

        //res.json(game)
    } catch (err) {
        console.log(err)
    }
})

//Login 
router.route('/login/').post((req, res) => {

    try {
        account.findOne({
            email: req.body.email,
            password: req.body.password
        }, function (err, obj) {
            if (err || obj === null) {
                res.json(null)
            } else {
                console.log(obj)
                const newUser = JSON.parse(JSON.stringify(obj))
                delete newUser.password
                res.json(newUser)
            }
        });
    } catch (err) {
        console.log(err)
    }
})

// account.findOne(emailID)
// .then(() => res.json("user delete"))
// .catch(err => res.status(400).json('Error' + err))

module.exports = router