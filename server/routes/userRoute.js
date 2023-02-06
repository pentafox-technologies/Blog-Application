const express=require('express');
const userController=require('../controllers/userController');
const router=express.Router();


router.route('/:slug').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);


router.get("/login", (req, res) =>
{
    res.send("Hello Login API")
})

module.exports=router;