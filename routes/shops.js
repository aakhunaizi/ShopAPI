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
const passport = require("passport");

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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);
router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
);
router.get("/", shopList);
router.get("/:shopId", shopDetail);
router.put(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopUpdate
);
router.delete(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  shopDelete
);

module.exports = router;
