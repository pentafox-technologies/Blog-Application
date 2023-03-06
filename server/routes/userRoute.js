const express=require('express');
const authController=require('../controllers/authController');
const userController=require('../controllers/userController');
const router=express.Router();
// localhost:5000/api/v1/user/  --> getUsers, postUsers

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/login',authController.login);

router.get('/getMe',authController.protect, userController.getMe);

router.route('/')
    .get(authController.protect, userController.getAllUser)
    .post(userController.createUser);

router.route('/:slug')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.patch('/:slug/password', userController.updatePassword)
router.patch('/:slug/email', userController.updateMail)
router.patch('/:slug/profile', userController.updateProfile)

router.post('/promote/:slug', userController.promoteUser);


router.get("/create", (req, res) =>
{
    res.send("Hello, this is create article")
})

module.exports=router;