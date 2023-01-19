import express from "express";
import app from "./app.js";

const PORT=5001;
app.listen(PORT, function()
{
    console.log('Server is running on PORT:', PORT);
});

db.query(`select * from "User"`, (err,res) => {
    if(err) console.log(err.message);
    else console.log(res.rows)
})