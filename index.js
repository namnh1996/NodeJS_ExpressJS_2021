const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.set('view engine','pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
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

app.post('/users/create',function(req,res){
    //console.log(req.body);
    //users.push(req.body);
    db.get('users').push(req.body).write()
    res.redirect('/users')
})

app.listen(3000, function(){
    console.log('Server listening on port ' + port);
})