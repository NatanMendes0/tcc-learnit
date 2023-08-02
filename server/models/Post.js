const moongose = require('mongoose');

const PostSchema = new moongose.Schema({
    title: String,
    description: String,
    file: String,    
});

module.exports = moongose.model('post', PostSchema);