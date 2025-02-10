const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride'
  },
  conversationId: { 
    type: String, 
    required: true // Unique identifier for grouped messages
  },
  content: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['text', 'image', 'system'], 
    default: 'text' 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  isDeleted: { 
    type: Boolean, 
    default: false // Soft delete functionality 
  }
}, { timestamps: true });

// Indexing for faster message retrieval
messageSchema.index({ sender: 1, receiver: 1, conversationId: 1 });

module.exports = mongoose.model('Message', messageSchema);
