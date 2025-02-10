const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Ride = require('../models/Ride');

router.post('/test-data', async (req, res) => {
  // Create a test driver
  const driver = new User({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'test123',
    phone: '+94123456789',
    role: 'driver',
    vehicle: { model: 'Toyota Prius', licensePlate: 'ABC-1234' }
  });
  await driver.save();

  // Create a test ride
  const ride = new Ride({
    driver: driver._id,
    departure: { location: 'Colombo', time: new Date('2024-03-20T08:00:00') },
    destination: 'Kandy',
    seatsAvailable: 3,
  });
  await ride.save();

  res.send({ driver, ride });
});

module.exports = router;