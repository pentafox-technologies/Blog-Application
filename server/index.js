<<<<<<< HEAD
// Only the server here

const app=require('./app');

const PORT=5000;
=======
import express from "express";
import app from "./app.js";
>>>>>>> parent of c54489b (route added)

const PORT=5001;
app.listen(PORT, function()
{
    console.log('Server is running on PORT:', PORT);
});
<<<<<<< HEAD
=======

db.query(`select * from "User"`, (err,res) => {
    if(err) console.log(err.message);
    else console.log(res.rows)
})
>>>>>>> parent of c54489b (route added)
