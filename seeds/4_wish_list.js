'use strict';

exports.seed = function(knex) {
  return knex('wish_list').del()
    .then(() => {
      return knex('wish_list')
      .insert(
        [{
          id: 1,
          question: "do you even?",
          category: "React",
          user_id: 1,
        }]
      );
    })
    .then(() => {
      return knex.raw("SELECT setval('wish_list_id_seq', (SELECT MAX(id) FROM wish_list));"
      );
    });
};