const db = require('../db');
const shortid = require('shortid');
const md5= require('md5');

module.exports.index = function(req,res){
        res.render('users/index',{
            users: db.get('users').value()
        });
}

module.exports.search = function(req,res){
        let q = req.query.q;
        let matchedUsers = users.filter(function(user){
            return user.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
        });
        //console.log(req.query);
        res.render('users/index',{
            users: matchedUsers
        });
}

module.exports.get = function(req,res){
        let id = req.params.id;
        let user = db.get('users').find({id:id}).value();
        res.render('users/view',{
            user: user
        }); 
}


module.exports.create =
    function(req,res){
        res.render('users/create');
}

module.exports.postCreate = function(req,res){
    req.body.id = shortid.generate();
    req.body.password = md5(req.body.password);
    //console.log(req.body);
    db.get('users').push(req.body).write()
    res.redirect('/users')
}
