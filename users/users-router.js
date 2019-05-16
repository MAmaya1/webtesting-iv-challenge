const router = require('express').Router();

const Users = require('../users/users-model');

router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Users could not be retrieved from database.' })
        })
})

router.post('/', (req, res) => {
    if (!req.body.name || !req.body.email) {
        res.status(400).json({ errorMessage: 'A username and email are required.' })
    } else {
        Users.addUser(req.body)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json({ error: err, message: 'This user already exists in the database.'})
            })
    }
})

module.exports = router;