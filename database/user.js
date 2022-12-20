const pool = require('./_database').pool

const create = async (name, email, password) => {
    const res = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password])
    return res.rows[0]
}

const findByEmail = async (email) => {
    const res = await pool.query('SELECT * FROM users WHERE email =  $1', [email])
    return res.rows[0]
}

module.exports = {
    create,
    findByEmail
}