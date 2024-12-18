const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type: Number,
        trim: true,
        required: [true, 'Un numéro est requis'],
        unique: true
    },
    type: {
        type: String,
        enum: ['long', 'short'],
        trim: true, 
        required: true
    },
    catwayState: {
        type: String,
        trim: true,
        required: [true, "L'état du catway doit être renseigné"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Catway', Catway);