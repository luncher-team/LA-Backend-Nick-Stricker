const db = require('../dbConfig.js');

module.exports = {
    get,
    add,
    login,
    remove,
}

function get(id) {
    let query = db('users').select('id', 'username', 'first_name', 'last_name', 'email', 'user_type', 'donated');

    if (id) {
        return query
            .where('id', id)
            .first()
    }

    return query;
}

function login(username) {
    let query = db('users').select('username', 'id', 'password');

    return query
        .where('username', username)
        .first()
}

function add(user) {
    user = { ...user, donated: 0, }
    if (user.first_name === undefined) {
        user = { ...user, first_name: "" }
    }
    if (user.last_name === undefined) {
        user = { ...user, last_name: "" }
    }
    if (user.user_type === undefined) {
        user = { ...user, user_type: "patron" }
    }

    return db('users')
        .insert(user);

}

function remove(id) {
    return null;
}
