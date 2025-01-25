const express = require("express");
const { logTransaction } = require("../controllers/transaction.controller");

const router = express.Router();

// Log a transaction
router.post("/", logTransaction);

module.exports = router;
