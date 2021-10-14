const Category = require('../models/category');
const slugify = require('slugify');

exports.addCategory = (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }

    const cat = Category(categoryObj);
    cat.save((err, cat) => {
        if (err) {
            return res.status(400).json({ err });
        }
        if (cat) {
            return res.status(201).json({cat })
        }
    })


}

