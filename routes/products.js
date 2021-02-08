const express = require("express");

const {
  productCreate,
  productList,
  productUpdate,
  productDelete,
} = require("../controllers/productController");
const router = express.Router();

router.post("/", productCreate);
router.get("/", productList);
router.put("/:productId", productUpdate);
router.delete("/:productId", productDelete);

module.exports = router;
