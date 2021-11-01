const express = require('express');
const router = express.Router();
const { addItemToCart } = require('../controller/cart');
const { requireSignin, userMiddleware } = require('../middlewares/index');



router.get('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);

module.exports = router;    