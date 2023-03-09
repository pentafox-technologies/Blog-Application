const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController')
const router=express.Router();

router.route('/').get(categoryController.getAllCategory);//.post(authController.protect, categoryController.createTopCategory);

router.route('/topCategory').post(authController.protect, categoryController.createTopCategory)

router.route('/:categoryName').get(categoryController.getCategory).patch(authController.protect, categoryController.updateCategory).delete(categoryController.deleteCategory);



module.exports = router;