
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();

        tbl
            .string('username', 255)
            .notNullable()
            .unique();

        tbl.string('password', 255).notNullable();
        tbl.string('first_name', 128);
        tbl.string('last_name', 128);
        tbl.string('email', 255).notNullable();
        tbl.string('user_type');
        tbl.float('donated');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
