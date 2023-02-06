require('dotenv').config()
const Pool = require("pg").Pool;

const host = process.env.DATA_BASE_URL
const user = process.env.DATA_BASE_USER
const password = process.env.DATA_BASE_PASS
const port = process.env.DATA_BASE_PORT
const database = process.env.DATA_BASE_NAME

const pool = new Pool({
    user: user,
    password: password,
    host: host,
    port: port,
    database: database
})

module.exports = pool;
