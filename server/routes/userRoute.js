const express=require('express');
const authController=require('../controllers/authController');
const userController=require('../controllers/userController');
const router=express.Router();
// localhost:5000/api/v1/user/  --> getUsers, postUsers

router.post('/signup', authController.signup);

router.post('/login', authController.login);


router.route('/')
    .get(userController.getAllUser)
    .post(userController.createUser);

router.route('/:slug')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);


router.get("/login", (req, res) =>
{
    res.send("Hello Login API")
})

module.exports=router;