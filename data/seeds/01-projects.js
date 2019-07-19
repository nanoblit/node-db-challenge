exports.seed = function (knex) {
  return knex('projects')
    .truncate()
    .then(() => knex('projects').insert([
      {
        id: 1,
        name: 'Take over the world',
        description: "We'll finally take over the world, Pinky!",
        complete: false,
      },
      {
        id: 2, name: 'Make a pizza', description: "Can't wait for my pizza!", complete: false,
      },
      {
        id: 3,
        name: 'Make tea',
        description: 'This is going to be the best tea in the universe!',
        complete: true,
      },
    ]));
};
