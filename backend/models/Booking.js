const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
    required: true
  },
  seatsBooked: { 
    type: Number, 
    required: true, 
    min: 1 // Ensuring at least one seat is booked
  },
  cost: { 
    type: Number, 
    default: 0 // Auto-calculated for cost-sharing rides
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  isDeleted: { type: Boolean, default: false } // Soft delete feature
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
