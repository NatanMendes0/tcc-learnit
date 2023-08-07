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
            liked: Boolean,
            comment: String,
            postedby: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        }
    ],
},
    { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
