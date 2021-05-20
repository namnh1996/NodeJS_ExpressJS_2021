const mongoose = require('mongoose');

const usrSchema = new mongoose.Schema({
     password: string,
    name: string,
    avatar: string,
    phone: string
})

const User = mongoose.model('User', userSchema, 'users ');
module.exports = User;