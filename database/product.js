const pool = require('./_database').pool

const list = async () => {
    const res = await pool.query('SELECT * FROM product_info')
    return res.rows
}

const get = async (id) => {
    const res = await pool.query('SELECT * FROM product_info WHERE id = $1', [id])
    return res.rows[0]
}

const upsert = async (product_id,price,last_update) => {
    const res = await pool.query(`
    INSERT INTO product_data (product_id,sales,price, invoice)
    VALUES ($1,$2 )
    ON CONFLICT (product_id,day)
    DO UPDATE SET
        sales = product_data.sales + 1,
        price = $2,
        invoice = product_data.invoice + $2,
        last_update = now()
    WHERE
        product_data.product_id = $1 
        AND product_data.day = current_date;
        AND product_data.last_update < $3`, [product_id,price,last_update])
    return res
}

const listSales = async (order,orderFlow) => {
    const res = await pool.query(`
    SELECT pi.*, SUM(pd.sales) AS totalSale, SUM(pd.invoice) as invoice, AVG(pd.price) as price
    FROM product_info AS pi
        JOIN product_data AS pd 
        ON pd.product_id = pi.id 
    GROUP BY pi.id
    ORDER BY ${order} ${orderFlow}
    `)
    return res.rows
}




module.exports = {
    list,
    get,
    upsert,
    listSales,
}