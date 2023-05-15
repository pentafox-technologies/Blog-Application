const express=require('express');
const authController=require('../controllers/authController');
const userController=require('../controllers/userController');
const router=express.Router();
// localhost:5000/api/v1/user/  --> getUsers, postUsers
const multer = require('./../middleware/multer');


router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/isLoggedIn',authController.isLoggedIn);


router.patch('/uploadImage',multer.upload("userProfilePic").single("userProfile"),userController.getTest);

router.get('/getMe',authController.protect, userController.getMe);

router.route('/')
    .get(authController.protect, userController.getAllUser)


router.route('/:slug')
    .get(userController.getUser)
    .patch(authController.protect, multer.upload("userProfilePic").single("userProfile"),userController.updateUser)
    .delete(authController.protect, userController.deleteUser);

router.patch('/:slug/password',authController.protect,  userController.updatePassword)
router.patch('/:slug/email',authController.protect,  userController.updateMail)
router.patch('/:slug/profile',authController.protect,  userController.updateProfile)

router.patch('/promote/:slug',authController.protect,  userController.promoteUser);

module.exports=router;