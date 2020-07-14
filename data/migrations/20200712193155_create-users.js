
exports.up = async function(knex) {
    await knex.schema.createTable('users', t => {
        t.increments()
        t.string('username').unique().notNullable()
        t.string('password').notNullable()
        t.string('department').notNullable()
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users')
};
