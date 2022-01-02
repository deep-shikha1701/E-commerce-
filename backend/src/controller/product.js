const Product = require('../models/product');
const { nanoid  } = require('nanoid');
const slugify = require('slugify');
const Category = require('../models/category');



exports.createProduct = (req, res) => {

    const {
        name, price, description, category,quantity, createdBy
    } = req.body;

    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map(file =>{
            return { img: file.filename}
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id,
    })

    product.save((error, product) => {
        if(error)
            return res.status(400).json({error});
        if(product){
            return res.status(201).json({product});
        }
    })

}


exports.getProductsBySlug = (req, res) => {
    const {slug} = req.params;

    Category.findOne({slug: slug}).exec((error, category) => {
        if(error){
            res.status(400).json(error);
        }
        if(category){
            Product.find({category: category._id}).exec((error, products) => {
                res.status(200).json({
                    products,
                    productsByPrice: {
                        under5k : products.filter(product => product.price <= 5000),
                        under10k: products.filter(product => product.price <= 10000 && product.price > 5000),
                        under15k: products.filter(product => product.price <= 15000 && product.price > 10000),
                        under20k: products.filter(product => product.price <= 20000 && product.price > 15000),
                    }
                });
            }) 
        }    
    });

    // res.status(200).json({slug});

}