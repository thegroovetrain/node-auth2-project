const db = require('../data')

async function add(user) {
    const [id] = await db.config('users').insert(user)
    return findById(id)
}

function find() {
    return db.config('users')
        .select('id', 'username', 'department')
}

function findBy(filter) {
    return db.config('users')
        .select('*')
        .where(filter)
}

function findById(id) {
    return db.config('users')
        .select('id', 'username', 'department')
        .where({id})
        .first()
}

module.exports = {
    add,
    find,
    findBy,
    findById
}