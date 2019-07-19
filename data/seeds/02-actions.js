exports.seed = function (knex) {
  return knex('actions')
    .truncate()
    .then(() => knex('actions').insert([
      {
        id: 1,
        project_id: 1,
        description: 'Go to the Moon',
        notes: 'We are here algready!',
        complete: true,
      },
      {
        id: 2,
        project_id: 1,
        description: 'Build a giant laser beam',
        notes: 'Enormous!',
        complete: false,
      },
      {
        id: 3,
        project_id: 1,
        description: 'Shoot the beam at Earth',
        notes: 'BOOM!',
        complete: false,
      },
      {
        id: 4,
        project_id: 2,
        description: 'Make dough and put ingredients on it',
        notes: 'Use only the best ingredients!',
        complete: true,
      },
      {
        id: 5, project_id: 2, description: 'Bake it', notes: "I'm so hungry", complete: false,
      },
      {
        id: 6, project_id: 3, description: 'Boil water', notes: "It's hot!", complete: false,
      },
      {
        id: 7,
        project_id: 3,
        description: 'Put a teabag in it',
        notes: 'Not as hard as it seems',
        complete: false,
      },
    ]));
};
