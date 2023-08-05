const moongose = require('mongoose');

const PostSchema = new moongose.Schema({
    nickname: String, //nickname do usuário
    name: String, 
    email: String, 
    title: String,
    description: String,
    file: String,
    date: {
        type: Date,
        default: Date.now,
    },
    //depois ver como adicionar comentários
});

module.exports = moongose.model('post', PostSchema);