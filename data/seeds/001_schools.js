
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('schools').del()
    .then(function () {
      // Inserts seed entries
      return knex('schools').insert([
        {
          "id": 1,
          "name": "Schinner, O'Keefe and O'Connell",
          "description": "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
          "address": "229 Lawn Way",
          "requestedFunds": 4000,
          "donated": 2562.10
        },
        {
          "id": 2,
          "name": "Schmidt, Hamill and Fay",
          "description": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.",
          "address": "235 Boyd Terrace",
          "requestedFunds": 5000,
          "donated": 2590.54
        },
        {
          "id": 3,
          "name": "Quitzon and Sons",
          "description": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.",
          "address": "245 Boyd Terrace",
          "requestedFunds": 5000,
          "donated": 2590.54
        },

      ]);
    });
};
