const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },    
    name: {
        type: String,
        required: [true, 'Workout Name is Required'],
        trim: true
    },
    duration: {
        type: String,
        required: [true, 'Workout Duration is Required']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

module.exports = mongoose.model('Workout', workoutSchema);