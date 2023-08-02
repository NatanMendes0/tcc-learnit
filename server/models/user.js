const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    name: String,
    email: String,
    password: String,    
});

module.exports = moongose.model('user', UserSchema);