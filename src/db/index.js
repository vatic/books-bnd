const { Pool } = require('pg')

const pool = new Pool({
    user: 'vatagin',
    host: 'localhost',
    database: 'books_dev',
    password: 'vat123',
    port: 5432,
})

module.exports = {
    query: (text, params, callback) => pool.query(text, params, callback),
}
