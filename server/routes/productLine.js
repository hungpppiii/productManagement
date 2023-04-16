const express = require('express');
const { productLineController } = require('../controllers');
const { verifyAccount } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(verifyAccount, productLineController.getProductLines);
router.route('/:id').get(verifyAccount, productLineController.getProductLine);

module.exports = router;
