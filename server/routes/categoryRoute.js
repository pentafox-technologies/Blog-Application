const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController')
const router=express.Router();

router.route('/').get(categoryController.getAllCategory).post(authController.protect, categoryController.createTopCategory);

router.route('/:slug').get(categoryController.getCategory).patch(categoryController.updateCategory).delete(categoryController.deleteCategory);

router.route('/topCategory').post(authController.protect, categoryController.createTopCategory)


module.exports = router;