const express = require('express');
const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');
const multer = require('./../middleware/multer');


const router=express.Router();

router.route('/').get(articleController.getAllArticle).post(authController.protect, multer.upload("articleCoverImages").single("coverImage") ,articleController.createArticle);

router.get('/getUserArticle', authController.protect, articleController.getUserArticle);

router.get('/getUserDraft', authController.protect, articleController.getUserDraft);

router.get('/getPendingArticles', authController.protect, articleController.getPendingArticles);

router.get('/getPushbackArticles', authController.protect, articleController.getPushbackArticles);

router.get('/getRejectedArticles', authController.protect, articleController.getRejectedArticles);

router.get('/getPendingVerification', authController.protect, articleController.getPendingVerication);

router.post('/sendForApproval/:slug',authController.protect ,articleController.sendForApproval);

router.get('/getBack/:slug',authController.protect ,articleController.getBack);

router.post('/approveandPublish/:slug',authController.protect ,articleController.approveAndPublish);

router.post('/rejectPost/:slug',authController.protect ,articleController.rejectPost);

router.route('/validation/:slug').get(authController.protect, articleController.selectToValidate);

router.route('/search/:query').get(articleController.searchArticle)

router.post('/pushbackArticle/:slug',authController.protect ,articleController.pushbackArticle);

router.route('/:slug').get(articleController.getArticle).patch(authController.protect,multer.upload("articleCoverImages").single("coverImage"),articleController.updateArticle).delete(authController.protect, articleController.deleteArticle);

module.exports = router;