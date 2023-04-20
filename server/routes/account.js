const express = require('express');
const { accountController } = require('../controllers');
const { verifyAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router
    .route('/getAllAccount')
    .get(verifyAdmin, accountController.getAllAccount);

router
    .route('/:accountID')
    .get(verifyAdmin, accountController.findOne)
    .put(verifyAdmin, accountController.editAccount)
    .delete(verifyAdmin, accountController.deleteAccount);

router.route('/addAccount').post(verifyAdmin, accountController.addAccount);

module.exports = router;
