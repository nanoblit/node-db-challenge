exports.up = function (knex) {
  return knex.schema
    .createTable('projects', (table) => {
      table.increments();
      table
        .text('name', 128)
        .unique()
        .notNullable();
      table.text('description', 512);
      table.boolean('complete').notNullable();
    })
    .createTable('actions', (table) => {
      table.increments();
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.text('description', 512);
      table.text('notes', 512);
      table.boolean('complete').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('actions')
    .dropTableIfExists('projects');
};
