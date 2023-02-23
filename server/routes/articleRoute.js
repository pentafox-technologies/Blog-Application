const express = require('express');
const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');

const router=express.Router();

router.route('/').get(articleController.getAllArticle).post(authController.protect, articleController.createArticle);

router.route('/:slug').get(articleController.getArticle).patch(authController.protect, articleController.updateArticle).delete(articleController.deleteArticle);


router.get("/create", (req, res) =>
{
    res.send("Hello, this is create article")
})

module.exports = router;