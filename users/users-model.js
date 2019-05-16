const db = require('../data/dbConfig');

module.exports = {
    getUsers,
    addUser,
    getUserById,
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

function deleteUser(id) {
    return db('users')
        .where({id})
        .del()
}