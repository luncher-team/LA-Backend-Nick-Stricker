const bcrypt = require('bcryptjs');
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'Reginald',
          password: bcrypt.hashSync('goodboi', 14),
          first_name: 'reginald',
          last_name: 'sonson',
          email: 'reginaldtheman@gmail.com',
          user_type: 'patron',
          donated: 200,
        },
        {
          id: 2,
          username: 'James',
          password: bcrypt.hashSync('goodboi', 14),
          first_name: 'James',
          last_name: 'McRae',
          email: 'jameson@gmail.com',
          user_type: 'patron',
          donated: 400,
        },
        {
          id: 3,
          username: 'Leland',
          password: bcrypt.hashSync('goodboi', 14),
          first_name: 'Leland',
          last_name: 'Rogers',
          email: 'lelgandrogers@gmail.com',
          user_type: 'patron',
          donated: 10,
        },

      ]);
    });
};
