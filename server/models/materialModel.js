const mongoose = require('mongoose');

//todo - adicionar no relatorio a mudança dos campos
const MaterialSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    steps: {
        type: Number,
        default: 0,
    },
    content: [
        {
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
            comment: String,
            postedby: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        }
    ],
},
    { timestamps: true }
);

// count the number of steps
MaterialSchema.pre('save', function (next) {
    this.steps = this.content.length;
    next();
});

module.exports = mongoose.model('Material', MaterialSchema);
