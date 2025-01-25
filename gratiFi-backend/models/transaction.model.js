const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  tipperAddress: {
    type: String,
    required: true,
  },
  creatorAddress: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensures that the amount cannot be negative
  },
  transactionHash: {
    type: String,
    required: true, // Transaction hash from the blockchain
    unique: true, // Ensures no duplicate transactions
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically sets the transaction time
  },
  status: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'], // Tracks transaction state
    default: 'Pending',
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
