const express = require("express");
const { adminController, productLineController } = require("../controllers");

const router = express.Router();

// account
router.route("/getAllAccount").get(adminController.getAllAccount);
router.route("/findOneAccount/:accountID").get(adminController.findOne);

router.route("/addAccount").post(adminController.addAccount);
router.route("/editAccount/:accountID").put(adminController.editAccount);
router.route("/deleteAccount/:accountID").delete(adminController.deleteAccount);

// productLine
router.route("/getAllProductLine").get(productLineController.getAllProductLine);
router.route("/addProductLine").post(productLineController.addProductLine);
router
  .route("/editProductLine/:ProductLineID")
  .put(productLineController.editProductLine);
router
  .route("/deleteProductLine/:ProductLineID")
  .delete(productLineController.deleteProductLine);
module.exports = router;
