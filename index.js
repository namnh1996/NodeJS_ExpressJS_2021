//bien moi truong -> quan trong
require('dotenv').config();

//console.log(process.env.SESSION_SECRET);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const authMiddleware = require('./middlewares/auth.middleware');
const productRoute = require('./routes/product.route');
const cookieParser = require('cookie-parser');
const { propertyOf } = require('./db');

app.set('view engine','pug');
app.set('views', './views');

app.use(express.static('public'));

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set defaults db
// db.defaults({users: []}).write();

app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth',authRoute);
app.use('/products', productRoute);

app.get('/', function(req,res){
    res.render('index',{
        name: 'Hai Nam'
    });
});

app.listen(3000, function(){
    console.log('Server listening on port ' + port);
})