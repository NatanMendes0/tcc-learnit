const mongoose = require('mongoose');

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
                note: {
                    type: String,
                    required: false,
                },
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

MaterialSchema.methods.deleteStepById = async function (stepId) {
    // Find the index of the step with the given _id in the content array
    const stepIndex = this.content.findIndex(step => step._id.toString() === stepId);

    if (stepIndex === -1) {
        // If the step is not found, return an error or handle it as needed
        throw new Error("Step not found");
    }

    // Remove the step at the found index
    this.content.splice(stepIndex, 1);

    try {
        // Save the updated material
        await this.save();
        return { message: "Step deleted successfully" };
    } catch (error) {
        // Handle any save errors
        throw new Error("Error while saving the material");
    }
};

module.exports = mongoose.model('Material', MaterialSchema);