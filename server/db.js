import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const config = ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

const Pool = pg.Pool
let db = new Pool(config);


export default db;