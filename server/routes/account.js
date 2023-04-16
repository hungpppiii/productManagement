const express = require('express');
const { accountController } = require('../controllers');
const { verifyAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(verifyAdmin, accountController.getAccountList);
router.route('/factory').get(verifyAdmin, accountController.getFactoryList);
router.route('/store').get(verifyAdmin, accountController.getStoreList);
router.route('/guarantee').get(verifyAdmin, accountController.getGuaranteeList);

module.exports = router;
