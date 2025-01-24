// models/Creator.js
const mongoose = require('mongoose');

const CreatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true, // Each wallet should be unique
  },
  balance: {
    type: Number,
    default: 0, // Default balance starts at 0
  },
  socialLinks: {
    twitter: String,
    instagram: String,
    youtube: String,
    other: String, // Optional field for other social media links
  },
  description: {
    type: String,
    maxlength: 500, // Limiting description length
  },
  stats: {
    audienceReached: {
      type: Number,
      default: 0,
    },
    totalFollowers: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = mongoose.model('Creator', CreatorSchema);
