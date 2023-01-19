import express from "express";
import db from "./db.js";
import bodyparser from "body-parser";


const app = express();

const PORT = 5000;


app.use(bodyparser.json());
app.use(express.json());

app.listen(PORT, function () {
console.log('Server is running on PORT:', PORT);
});

db.query(`select * from "User"`, (err,res) => {
    if(err) console.log(err.message);
    else console.log(res.rows)
});