const express = require("express");
const { Shop } = require("../db/models");

const {
  shopCreate,
  shopList,
  shopDetail,
  shopUpdate,
  shopDelete,
  fetchShop,
  productCreate,
} = require("../controllers/shopController");

const router = express.Router();

const upload = require("../middleware/multer");

router.param("shopId", async (req, res, next, shopId) => {
  const foundShop = await fetchShop(shopId, next);
  if (foundShop) {
    req.shop = foundShop;
    next();
  } else {
    next({
      status: 404,
      message: "Shop not found",
    });
  }
});

router.post("/", upload.single("image"), shopCreate);
router.post("/:shopId/products", upload.single("image"), productCreate);
router.get("/", shopList);
router.get("/:shopId", shopDetail);
router.put("/:shopId", upload.single("image"), shopUpdate);
router.delete("/:shopId", shopDelete);

module.exports = router;
