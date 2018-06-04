const db = require('../../db')

const getAll = async () => {
    const res = await db.query('SELECT * FROM books LIMIT 10')
    return res.rows
}

const getById = async (id) => {
    const res = await db.query('SELECT * FROM books WHERE id=$1', [id])
    return res.rows[0]
}

module.exports = {
    getAll,
    getById,
}
