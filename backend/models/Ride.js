const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  riders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  departure: {
    location: { type: String, required: true },
    time: { type: Date, required: true },
  },
  destination: { type: String, required: true },
  seatsAvailable: { type: Number, default: 1, min: 0 }, // Ensuring seats are not negative
  fare: { type: Number, default: 0 }, // Supports cost-sharing feature
  costSharing: { type: Boolean, default: false },
  preferences: [String],
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed', 'cancelled'],
    default: 'pending'
  },
  isDeleted: { type: Boolean, default: false }, // Soft delete feature
}, { timestamps: true });

// Indexing for search optimization
rideSchema.index({ 'departure.location': 'text', destination: 'text' });

module.exports = mongoose.model('Ride', rideSchema);
