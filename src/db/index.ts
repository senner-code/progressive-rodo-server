import {Pool} from 'pg'

const pool = new Pool({
    user:'postgres',
    password: "4403",
    host:'localhost',
    port:5432,
    database: 'progressive_rodo',
})

export default pool