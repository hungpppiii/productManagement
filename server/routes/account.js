const express = require('express');
const { accountController } = require('../controllers');
const { verifyAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/facility/:facility').get(accountController.getAllFacility);

router
    .route('/:id')
    .get(verifyAdmin, accountController.getAccount)
    .patch(verifyAdmin, accountController.editAccount)
    .delete(verifyAdmin, accountController.deleteAccount);

router
    .route('/')
    .get(verifyAdmin, accountController.getAllAccount)
    .post(verifyAdmin, accountController.createAccount);

module.exports = router;
