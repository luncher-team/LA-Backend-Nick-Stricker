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
    school = { ...school, donated: 0, achieved: false };
    if (school.description === undefined) {
        school = { ...school, description: "" }
    }
    if (school.admin_id === undefined) {
        school = { ...school, admin_id: 1 }
    }
    if (school.city === undefined) {
        school = { ...school, city: "city" }
    }
    if (school.state === undefined) {
        school = { ...school, state: "state" }
    }
    if (school.lat === undefined) {
        school = { ...school, lat: 0.0 }
    }
    if (school.lon === undefined) {
        school = { ...school, lon: 0.0 }
    }
    console.log(school)
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