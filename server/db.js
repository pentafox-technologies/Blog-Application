const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const config = ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

const Pool = pg.Pool;
let db = new Pool(config);


module.exports = db;