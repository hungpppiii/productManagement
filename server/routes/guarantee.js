const express = require("express");

const { guaranteeController } = require("../controllers");

const router = express.Router();

// write your code here
router
  .route("/getInfoGuarantee/:accountID")
  .get(guaranteeController.getInfoGuarantee);
router
  .route("/editInfoGuarantee/:accountID")
  .put(guaranteeController.editInfoGuarantee);

router
  .route("/getAllProduct/:guaranteeID")
  .get(guaranteeController.getAllProductWaranty);
router.route("/editProduct/:productID").put(guaranteeController.editProduct);

module.exports = router;
