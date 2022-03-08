const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware, upload } = require('../middlewares/index');
const {createProduct, getProductsBySlug} = require('../controller/product');


  
router.post('/product/create', requireSignin, adminMiddleware,upload.array('productPictures'), createProduct);
router.get('/product/:slug', getProductsBySlug)

module.exports = router;