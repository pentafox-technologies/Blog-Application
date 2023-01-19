import express from "express"
const router=express.Router();

router.get("/", (req, res, next) =>
{
    res.send("On article route")
    console.log("On article route")
})


router.get("/create", (req, res) =>
{
    res.send("Hello, this is create article")
})

export default router;