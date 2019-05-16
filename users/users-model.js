const db = require('../data/dbConfig');

module.exports = {
    getUsers,
    // addUser,
    // deleteUser
}

function getUsers() {
    return db('users');
}