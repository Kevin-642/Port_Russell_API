const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber: {
        type: Number,
        trim: true,
        require: [true, 'Veuillez choisir le catway réservé']
    },
    clientName: {
        type: String,
        trim: true,
        required: [true, 'Un nom de client est requis']
    },
    boatName: {
        type: String,
        trim: true
    },
    checkIn: {
        type: Date,
        trim: true,
        required: [true, 'Une date de début de réservation est requise']
    },
    checkOut: {
        type: Date,
        trim:true,
        required: [true, 'Une date de fin de réservation est requise']
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Reservation', Reservation);