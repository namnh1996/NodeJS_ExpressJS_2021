const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');
const port = 3000;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

app.set('view engine','pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set defaults db
// db.defaults({users: []}).write();
let users = db.get('users').value();

app.get('/', function(req,res){
    res.render('index',{
        name: 'Hai Nam'
    });
});

app.get('/users', function(req,res){
    res.render('users/index',{
        users: users
    });
})

app.get('/users/search', function(req,res){
    let q = req.query.q;
    let matchedUsers = users.filter(function(user){
        return user.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    });
    //console.log(req.query);
    res.render('users/index',{
        users: matchedUsers
    });
})

app.get('/users/create', function(req,res){
    res.render('users/create');
})

app.get('/users/:id', function(req,res){
    let id = req.params.id;
    let user = db.get('users').find({id:id}).value();
    res.render('users/view',{
        user: user
    }); 
})

app.post('/users/create',function(req,res){
    //console.log(req.body);
    //users.push(req.body);
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write()
    res.redirect('/users')
})


app.listen(3000, function(){
    console.log('Server listening on port ' + port);
})