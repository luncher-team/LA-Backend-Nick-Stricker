
exports.up = function (knex, Promise) {
    return knex.schema.createTable('schools', tbl => {
        tbl.increments();

        tbl.string('name', 255).notNullable().unique();
        tbl.string('description', 128);
        tbl.string('address').notNullable();
        tbl.integer('requestedFunds').notNullable();
        tbl.integer('donated');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('schools');
};
