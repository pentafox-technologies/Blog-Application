const express = require('express');
const supportController = require('../controllers/supportController');
const authController = require('../controllers/authController');
const router=express.Router();

router.route('/').get(authController.protect, supportController.getAllSupport)

router.route('/:slug').get(supportController.getSupport).post(authController.protect, supportController.createSupport).delete(authController.protect, supportController.deleteSupport);


// router.get("/create", (req, res) =>
// {
//     res.send("Hello, this is create article")
// })

module.exports = router;