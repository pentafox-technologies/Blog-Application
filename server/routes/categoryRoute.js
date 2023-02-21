const express = require('express');
const categoryController = require('../controllers/categoryController');
const router=express.Router();
const authController = require('../controllers/authController');

router.route('/').get(categoryController.getAllCategory).post(categoryController.createCategory);

router.route('/:slug').get(categoryController.getCategory).patch(categoryController.updateCategory).delete(categoryController.deleteCategory);

router.route('/topCategory').post(authController.protect, categoryController.createTopCategory)


module.exports = router;