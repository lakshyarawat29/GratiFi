const express = require('express');
const { registerCreator, getCreators, tipCreator, withdrawFunds } = require('../controllers/creatorController');
const router = express.Router();

router.post('/register', registerCreator);
router.get('/', getCreators);
router.post('/tip/:creatorAddress', tipCreator);
router.post('/withdraw', withdrawFunds);

module.exports = router;
