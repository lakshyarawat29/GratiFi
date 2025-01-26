const express = require('express');
const {
  registerTipper,
  loginTipper,
  tipCreator,
} = require('../controllers/tipper.controller');

const router = express.Router();

// Register Tipper
router.post('/register', registerTipper);

// Login Tipper
router.post('/login', loginTipper);

// Tip a Creator
router.post('/tip/:creatorWallet', tipCreator);

module.exports = router;
