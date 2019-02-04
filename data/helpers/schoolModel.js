const db = require('../dbConfig.js');

module.exports = {
    get,
    add,
    remove,
    update,
}

function get(id) {
    let query = db('schools');

    if (id) {
        return query
            .where('id', id)
            .first()
    }

    return query;
}

function add(school) {
    school = { ...school, donated: 0 }
    if (school.description === undefined) {
        school = { ...school, description: "" }
    }
    return db('schools')
        .insert(school)
        .then(([id]) => ({ id }));
}

function remove(id) {
    return db('schools')
        .where('id', id)
        .del();
}

function update(id, changes) {
    return db('schools')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? this.get(id) : null));
}