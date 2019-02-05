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
          first_name: 'leland',
          last_name: 'rogers',
          email: 'lelgandrogers@gmail.com',
          user_type: 'patron',
          donated: 200,
        },
        {
          id: 2,
          username: 'James',
          password: bcrypt.hashSync('goodboi', 14),
          first_name: 'james',
          last_name: 'kim',
          email: 'jameskim@gmail.com',
          user_type: 'patron',
          donated: 400,
        },

      ]);
    });
};
