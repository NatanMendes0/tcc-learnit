const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    file: String,
    ratings: [
        {
            postedby: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: String,
        }
    ],
},
    { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
