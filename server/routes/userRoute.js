import express from "express";
const router=express.Router()


router.get("/", (req, res, next) =>
{
    res.send("On user route")
    console.log("On user route")
})


router.get("/login", (req, res) =>
{
    res.send("Hello Login API")
})

export default router;