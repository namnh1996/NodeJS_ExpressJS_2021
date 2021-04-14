const db = require('../db');

let products = db.get('products').value();

module.exports.index = function(req,res){

    let page = parseInt(req.query.page) || 1; //n
    let perPage = 6; //x
    let start = (page - 1) * perPage;
    let end = page * perPage;
    res.render("products/index",{
        products: db.get("products").value().slice(start, end)
    });
}