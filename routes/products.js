const express = require("express");
const { Product } = require("../db/models");

const {
  productList,
  productDetail,
  productUpdate,
  productDelete,
  fetchProduct,
} = require("../controllers/productController");

const router = express.Router();

const upload = require("../middleware/multer");

router.param("productId", async (req, res, next, productId) => {
  const foundProduct = await fetchProduct(productId, next);
  if (foundProduct) {
    req.product = foundProduct;
    next();
  } else {
    next({
      status: 404,
      message: "Product not found",
    });
  }
});

router.get("/", productList);
router.get("/:productId", productDetail);
router.put("/:productId", upload.single("image"), productUpdate);
router.delete("/:productId", productDelete);

module.exports = router;
