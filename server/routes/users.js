const router = require('express').Router();
const { json } = require('body-parser');
let account = require('../models/account.model');
let team = require('../models/team.model');
let moongose = require('mongoose')
const mailgun = require("mailgun-js");






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
    // const isEnable = true

    const newUser = new account({
        firstName,
        lastName,
        email,
        password,
        teamid,
        permission,
        // isEnable
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
            if (teamID) {
                team.findById(teamID, function (err, docs) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(docs)
                        docs.account.remove(userID)
                        console.log(docs)
                        docs.save()
                    }
                });
            }
            res.json('User Removed')
        }
        )
})
// account.findByIdAndDelete(req.params.userID)
//     .then(() => res.json("user delete"))
//     .catch(err => res.status(400).json('Error' + err))

router.route('/update/:user').post((req, res) => {


    const oldTeam = req.body.prevTeam
    const user = new account(JSON.parse(req.params.user))

    console.log(user)
    console.log(oldTeam)
    account.update({ _id: user._id }, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        teamid: user.teamid,
        permission: user.permission,

    }, function (err, obj) {
        if (err)
            console.log("err" + err)
        team.findById(user.teamid, function (err, docs) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(docs)
                if (!docs.account.includes(user._id))
                    docs.account.push(user._id)
                docs.save()
            }
        });
        if (oldTeam) {
            team.findById(oldTeam, function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    docs.account.splice(docs.account.indexOf(user._id), 1);
                    docs.save()
                }
            })
        }
    });

})

router.route('/deleteTeam/:userid').post((req, res) => {

    console.log(req.params.userid)
    account.findById(req.params.userid, function (err, docs) {
        if (err)
            console.log(err)
        else {
            docs.teamid = null
            docs.save()
            console.log(docs)
        }

    });


})

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
    const DOMAIN = 'sandbox9ae2caa30d294b27a95591d729530cb4.mailgun.org';
    const mg = mailgun({ apiKey: 'eead9b31cbeeb3aa3ed5674b7c87ee62-07bc7b05-cdff2e99', domain: DOMAIN });
    const data = {
        from: "Mailgun Sandbox <postmaster@sandbox9ae2caa30d294b27a95591d729530cb4.mailgun.org>",
        to: "bshabi1994@gmail.com",
        subject: "Password Reset",
        text: "Reset Password  A password reset event has been triggered. The password reset window is limited to two hours. If you do not reset your password within two hours, you will need to submit a new request.To complete the password reset process, visit the following link:"
    };

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
                team.findById(newUser.teamid, function (err, obj) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        newUser["teamName"] = obj.teamName
                        delete newUser.password

                        // console.log(newUser)
                        res.json(newUser)

                    }
                })
            }
        });
    } catch (err) {
        console.log(err)
    }
    console.log("berfore ms");

    mg.messages().send(data, function (error, body) {
        if (error)
            console.log(error)
        console.log("im mailgun");
        console.log(body);
    });
    console.log("after");
})
router.route('/restPassword').get((req, res) => {
    res.json("In")
    console.log("berfore ms");

})

// account.findOne(emailID)
// .then(() => res.json("user delete"))
// .catch(err => res.status(400).json('Error' + err))

module.exports = router