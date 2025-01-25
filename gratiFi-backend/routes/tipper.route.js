const express = require("express");
const { registerTipper, loginTipper } = require("../controllers/tipper.controller");

const router = express.Router();

// Register Tipper
router.post("/register", registerTipper);

// Login Tipper
router.post("/login", loginTipper);

module.exports = router;
