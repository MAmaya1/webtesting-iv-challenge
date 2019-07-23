exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl
            .string('name')
            .notNullable()
            .unique();
        tbl
            .string('email')
            .notNullable()
    })
};
  
exports.down = function(knex) {
return knex.schema.dropTableIfExists('users');
};