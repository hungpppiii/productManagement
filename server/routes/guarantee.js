const express = require('express');

const { guaranteeController } = require('../controllers');

const router = express.Router();

// write your code here
router
    .route('/:accountID')
    .get(guaranteeController.getInfoGuarantee)
    .put(guaranteeController.editInfoGuarantee);

router
    .route('/getAllProduct/:guaranteeID')
    .get(guaranteeController.getAllProductWarranty);
router.route('/editProduct/:productID').put(guaranteeController.editProduct);

module.exports = router;
