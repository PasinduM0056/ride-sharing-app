const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String,
    required: true, 
    unique: true, 
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/},
  password: { type: String, required: true },
  phone: { type: String, required: true },
  govtId: { 
    type: String, 
    required: true, 
    validate: {
    validator: (v) => /\+94\d{9}/.test(v), // Sri Lankan phone format
    message: 'Phone must be a valid Sri Lankan number (e.g., +94123456789)'
  } }, // Encrypted later
  role: { type: String, enum: ['driver', 'rider'], default: 'rider' },
  vehicle: {
    model: String,
    licensePlate: String,
  },
  rideHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

// In User schema
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

module.exports = mongoose.model('User', userSchema);