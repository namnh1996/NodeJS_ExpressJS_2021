//const db = require('../db');
const Product = require('../model/product.model');
//let products = db.get('products').value();

module.exports.index = function(req,res){
    // let page = parseInt(req.query.page) || 1; //n
    // let perPage = 6; //x
    // let start = (page - 1) * perPage;
    // let end = page * perPage;
    // res.render('products/index',{
    //     products: db.get('products').value().slice(start, end)
    // });

    //tai sao khong the su dung async await??
    Product.find().then(function(products){
        res.render('products/index',{
            products: products
        })
    });
}