const router = require('express').Router();
const {
    json
} = require('body-parser');
const Account = require('../models/account.model');
let account = require('../models/account.model');


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
    const teamName = req.body.teamName;
    const permission = req.body.permission;
    console.log(teamName)

    const newUser = new account({
        firstName,
        lastName,
        email,
        password,
        teamName,
        permission
    })


    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error' + err))
});
// Delete user by emailId
router.route('/remove/:emailID').delete((req, res) => {

    account.findByIdAndDelete(emailID)
        .then(() => res.json("user delete"))
        .catch(err => res.status(400).json('Error' + err))

})
// Find User exist
router.route('/find/:emailID').post((req, res) => {
    try {
        console.log(req.params.emailID)
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
        Account.findOne({
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