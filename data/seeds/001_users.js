const bcrypt = require('bcryptjs');
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'Reginald', password: bcrypt.hashSync('goodboi', 14) },
        { id: 2, username: 'James', password: bcrypt.hashSync('goodboi', 14) },

      ]);
    });
};
