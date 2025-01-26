const express = require('express');
const {
  registerCreator,
  getCreators,
  getCreator,
  tipCreator,
  withdrawFunds,
  loginCreator,
} = require('../controllers/creator.controller');

const router = express.Router();

// Register a new creator
router.post('/register', registerCreator);

// Get all creators
router.get('/', getCreators);

// Get details of a single creator
router.get('/:walletAddress', getCreator);

// Tip a creator
router.post('/tip/:creatorAddress', tipCreator);

// Withdraw funds
router.post('/withdraw', withdrawFunds);

// Creator login
router.post('/login', loginCreator);

module.exports = router;
