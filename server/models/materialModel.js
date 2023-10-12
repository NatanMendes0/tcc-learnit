const { number } = require('joi')
const mongoose = require('mongoose')

const MaterialSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: [
        {
            steps: Number,
            stepContent: {
                title: String,
                text: String,
                file: String,
                note: String,
            }
        },
    ],
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
    Likes: Number,
},
    { timestamps: true }
)

module.exports = mongoose.model('Material', MaterialSchema)