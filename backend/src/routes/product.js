const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../middlewares/index');
const {createProduct} = require('../controller/product');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');   

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
        var ID = nanoid(20);
      cb(null, ID +'-'+file.originalname)
    }
  })
  const upload = multer({storage});

  
router.post('/product/create', requireSignin, adminMiddleware,upload.array('productImage'), createProduct);
// router.get('/products/getCategory', getCategories)

module.exports = router;