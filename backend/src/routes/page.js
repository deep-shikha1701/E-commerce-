const express = require('express');
const { createPage } = require('../controller/page');
const router = express.Router();
const { upload } = require('../middlewares/index');

router.post('/page/create', upload.fields([
    {name: 'banners'},
    {name: 'products'}
]), createPage);

module.exports = router;    