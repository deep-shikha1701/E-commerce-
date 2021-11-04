const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../middlewares/index');
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



router.post('/category/create', requireSignin, adminMiddleware,upload.single('categoryImage'),addCategory);
router.get('/category/getCategory', getCategories)

module.exports = router;