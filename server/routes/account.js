const express = require('express');
const { accountController } = require('../controllers');
const { verifyAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router
    .route('/getAllAccount')
    .get(verifyAdmin, accountController.getAllAccount);

router.route('/getAllFactory').get(accountController.getAllFactory);

router.route('/getAllStore').get(accountController.getAllStore);

router.route('/getAllGuarantee').get(accountController.getAllGuarantee);

router
    .route('/:id')
    .get(verifyAdmin, accountController.getAccount)
    .patch(verifyAdmin, accountController.editAccount)
    .delete(verifyAdmin, accountController.deleteAccount);

router.route('/create').post(verifyAdmin, accountController.createAccount);

module.exports = router;
