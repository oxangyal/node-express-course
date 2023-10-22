const express = require("express");
const router = express.Router();

const { getProducts, getProduct } = require("../controllers/products.js");

router.route("/").get(getProducts);
router.route("/:productID").get(getProduct);
router.route("/:query").get(searchProduct);

module.exports = router;
