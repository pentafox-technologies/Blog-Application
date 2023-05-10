const express = require('express');
const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');
const multer = require('./../middleware/multer');


const router=express.Router();


router.get('/getUserArticle', authController.protect, articleController.getUserArticle);

router.get('/getUserDraft', authController.protect, articleController.getUserDraft);

router.get('/getUserPending', authController.protect, articleController.getUserPending);


router.get('/getPendingVerification', authController.protect, articleController.getPendingVerication);

router.route('/').get(articleController.getAllArticle).post(authController.protect, multer.upload("articleCoverImages").single("coverImage") ,articleController.createArticle);


router.post('/sendForApproval/:slug',authController.protect ,articleController.sendForApproval);

router.post('/approveandPublish/:slug',authController.protect ,articleController.approveAndPublish);

router.post('/rejectPost/:slug',authController.protect ,articleController.rejectPost);

router.route('/validation/:slug').get(authController.protect, articleController.selectToValidate);

router.route('/search/:query').get(articleController.searchArticle)

router.post('/pushbackArticle/:slug',authController.protect ,articleController.pushbackArticle);

// router.route('/:slug').get(articleController.getArticle).patch(authController.protect,multer.upload("articleCoverImages").single("coverImage"),articleController.updateArticle).delete(authController.protect, articleController.deleteArticle);

module.exports = router;