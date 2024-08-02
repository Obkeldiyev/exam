const { Pool } = require("pg")

let pool = new Pool({
    connectionString: "postgres://postgres:Mirjalol13@localhost:5432/exam"
})

const fetchData = async (query, ...params) => {
    let client = await pool.connect()
    try {
        let { rows } = await client.query(query, params.length ? params: null)
        return rows
    } finally {
        client.release()
    }
}

module.exports = {
    fetchData
}