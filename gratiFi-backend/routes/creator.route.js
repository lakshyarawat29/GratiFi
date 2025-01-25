const express = require('express');
const { registerCreator, getCreators, tipCreator, withdrawFunds,getCreator } = require('../controllers/creator.controller');
const router = express.Router();

router.post('/register', registerCreator);
router.get('/', getCreators);
router.post('/tip/:creatorAddress', tipCreator);
router.post('/withdraw', withdrawFunds);
router.get("/:walletAddress", getCreator);


module.exports = router;
