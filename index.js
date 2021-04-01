const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const userRoute = require('./routes/user.route');

app.set('view engine','pug');
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set defaults db
// db.defaults({users: []}).write();

app.use('/users', userRoute)

app.get('/', function(req,res){
    res.render('index',{
        name: 'Hai Nam'
    });
});

app.listen(3000, function(){
    console.log('Server listening on port ' + port);
})