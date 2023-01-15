import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async() => {
    const Pool = pg.Pool
    try{
        const pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });
        await pool.connect()
        pool.query(`select * from "User"`, (err,res) => {
            if(err) console.log(err.message);
            else console.log(res.rows)
        })
    }
    catch(err){console.log(err.message);}
}

dbConnect();