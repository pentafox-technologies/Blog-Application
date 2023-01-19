const express = require('express');
const articleController = require('../controllers/articleController');
const router=express.Router();

router.route('/').get(articleController.getAllArticle).post(articleController.createArticle);

router.route('/:slug').get(articleController.getArticle).patch(articleController.updateArticle).delete(articleController.deleteArticle);


router.get("/create", (req, res) =>
{
    res.send("Hello, this is create article")
})

module.exports = router;