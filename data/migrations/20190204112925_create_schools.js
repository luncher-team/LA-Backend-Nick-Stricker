
exports.up = function (knex, Promise) {
    return knex.schema.createTable('schools', tbl => {
        tbl.increments();

        tbl.string('name', 255).notNullable().unique();
        tbl.string('description', 128);
        tbl.string('address').notNullable();
        tbl.integer('requested_funds').notNullable();
        tbl.integer('admin_id').references('id').inTable('users');
        tbl.float('donated');
        tbl.boolean('achieved');
        tbl.string('city', 128);
        tbl.string('state', 128);
        tbl.float('lat');
        tbl.float('lon');
        tbl.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('schools');
};
