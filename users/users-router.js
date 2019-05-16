const router = require('express').Router();

const Users = require('../users/users-model');

// Get users

router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Users could not be retrieved from database.' })
        })
})

// Get user by ID

router.get('/:id', (req, res) => {
    Users.getUserById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ errorMessage: 'A user with the specified ID does not exist.'})
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve user from database.' })
        })
})

// Add new user

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

// Delete user

router.delete('/:id', (req, res) => {
    Users.getUserById(req.params.id)
        .then(user => {
            if (user) {
                Users.deleteUser(req.params.id)
                    .then(() => {
                        res.status(200).end();
                    })
                    .catch(err => {
                        res.status(500).json({ error: err, message: 'User could not be deleted.' })
                    })
            } else {
                res.status(400).json({ message: 'A user with the specified ID does not exist.' })
            }
        })
})

module.exports = router;