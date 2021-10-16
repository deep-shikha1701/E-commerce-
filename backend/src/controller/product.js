const Product = require('../models/product');
const { nanoid  } = require('nanoid');


exports.createProduct = (req, res) => {

    const {
        name, price, description, productPictures, category, createdBy
    } = req.body;

    const product = new Product({
        name: name,
        slug: slugify(name),
        price: price,
        descrition: description,
        productPictures: productPictures,
        catgeory: category,
        createdBy: createdBy,
    })

    product.save().exec((error, product) => {
        if(error)
            return res.status(400).json({error});
        if(product){
            return res.status(201).json({product});
        }
    })

}