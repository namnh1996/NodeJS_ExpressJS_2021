const express = require('express');
const router = express.Router();
const db = require('../routes/db');
const shortid = require('shortid');

let users = db.get('users').value();

router.get('/', function(req,res){
    res.render('users/index',{
        users: users
    });
})

router.get('/search', function(req,res){
    let q = req.query.q;
    let matchedUsers = users.filter(function(user){
        return user.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    });
    //console.log(req.query);
    res.render('users/index',{
        users: matchedUsers
    });
})

router.get('/create', function(req,res){
    res.render('users/create');
})

router.get('/:id', function(req,res){
    let id = req.params.id;
    let user = db.get('users').find({id:id}).value();
    res.render('users/view',{
        user: user
    }); 
})

router.post('/create',function(req,res){
    //console.log(req.body);
    //users.push(req.body);
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write()
    res.redirect('/users')
})

module.exports = router