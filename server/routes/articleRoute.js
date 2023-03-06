const express = require('express');
const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');

const router=express.Router();

router.route('/').get(articleController.getAllArticle).post(authController.protect, articleController.createArticle);

router.get('/getPendingVerification', authController.protect, articleController.getPendingVerication);

router.route('/:slug').get(articleController.getArticle).patch(authController.protect, articleController.updateArticle).delete(articleController.deleteArticle);

router.post('/requestForApproval/:slug',authController.protect ,articleController.requestForApproval);

router.post('/approveandPublish/:slug',authController.protect ,articleController.approveAndPublish);

router.post('/rejectPost/:slug',authController.protect ,articleController.rejectPost);



router.get("/create", (req, res) =>
{
    res.send("Hello, this is create article")
})

module.exports = router;