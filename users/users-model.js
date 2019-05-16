const db = require('../data/dbConfig');

module.exports = {
    getUsers,
    addUser,
    deleteUser
}

function getUsers() {
    return db('users');
}

function getUserById(id) {
    return db('users')
        .where({ id })
        .first()
}

function addUser(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => {
            return getUserById(id)
        })
}