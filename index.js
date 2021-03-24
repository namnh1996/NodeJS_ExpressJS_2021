const express = require('express');
const app = express();

app.get('/', function(req,res){
    res.send("Hello world!");
})

const port = 3000;
app.listen(3000, function(){
    console.log('Server listening on port ' + port);
})