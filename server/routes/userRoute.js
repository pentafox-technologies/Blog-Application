const express = require('express');
const userController = require('../controllers/userController');
const router=express.Router();

router.route('/').get(userController.getAllUser).post(userController.createUser);

router.route('/:slug').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);


router.get("/create", (req, res) =>
{
    res.send("Hello, this is create article")
})

module.exports = router;