const db = require('../dbConfig.js');

module.exports = {
    get,

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