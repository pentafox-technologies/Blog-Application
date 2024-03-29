const express = require('express');
const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');
const multer = require('./../middleware/multer');


const router=express.Router();

router.route('/').get(articleController.getAllArticle).post(authController.protect, multer.upload("articleCoverImages").single("coverImage") ,articleController.createArticle);

router.get('/getUserArticle', authController.protect, articleController.getUserArticle);

router.get('/getAllArticleAdmin', authController.protect, articleController.getAllArticleAdmin);

router.get('/getUserDraft', authController.protect, articleController.getUserDraft);

router.get('/getPendingArticles', authController.protect, articleController.getPendingArticles);

router.get('/getPushbackArticles', authController.protect, articleController.getPushbackArticles);

router.get('/getRejectedArticles', authController.protect, articleController.getRejectedArticles);

router.get('/getPendingVerification', authController.protect, articleController.getPendingVerication);

router.route('/searchTopCategory/:query').get(articleController.searchTopCategory)

router.get('/getBack/:slug', authController.protect, articleController.getBack);

router.get('/getValidationArticle/:slug', authController.protect, articleController.getValidationArticle);

router.get('/approveandPublish/:slug',authController.protect ,articleController.approveAndPublish);

router.get('/rejectPost/:slug',authController.protect ,articleController.rejectPost);

// router.route('/validation/:slug').get(authController.protect, articleController.selectToValidate);


router.post('/pushbackArticle/:slug',authController.protect ,articleController.pushbackArticle);

router.route('/:slug').get(articleController.getArticle).patch(authController.protect,multer.upload("articleCoverImages").single("coverImage"),articleController.updateArticle).delete(authController.protect, articleController.deleteArticle);

module.exports = router;