const pool = require('./_database').pool

const list = async () => {
    const res = await pool.query('SELECT * FROM store')
    return res.rows
}

const create = async (name, url) => {
    const res = await pool.query('INSERT INTO store (name, url) VALUES ($1, $2) RETURNING *', [name, url])
    return res.rows[0]
}


module.exports = {
    list,
    create
}