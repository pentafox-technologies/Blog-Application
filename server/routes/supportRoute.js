const express = require('express');
const supportController = require('../controllers/supportController');
const router=express.Router();

router.route('/').get(supportController.getAllSupport).post(supportController.createSupport);

router.route('/:slug').get(supportController.getSupport).patch(supportController.updateSupport).delete(supportController.deleteSupport);


router.get("/create", (req, res) =>
{
    res.send("Hello, this is create article")
})

module.exports = router;