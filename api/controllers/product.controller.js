const Product = require('../../model/product.model');

module.exports.index = function(req,res){
    Product.find().then(function(products){
        // res.render('products/index',{
        //     products: products
        // }) 
        res.json(products);
    });
};

module.exports.create = async function(req,res){
    let product = await Product.create(req.body);
    res.json(product);
}