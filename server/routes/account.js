const express = require('express');
const { accountController } = require('../controllers');
const { verifyAccount, verifyAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router
    .route('/getAllAccount')
    .get(verifyAccount, verifyAdmin, accountController.getAllAccount);

router
    .route('/:accountID')
    .get(verifyAccount, verifyAdmin, accountController.findOne)
    .put(verifyAccount, verifyAdmin, accountController.editAccount)
    .delete(verifyAccount, verifyAdmin, accountController.deleteAccount);

router
    .route('/addAccount')
    .post(verifyAccount, verifyAdmin, accountController.addAccount);

module.exports = router;
