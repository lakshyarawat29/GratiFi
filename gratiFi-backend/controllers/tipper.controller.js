const Tipper = require('../models/tipper.model');

// Tipper Registration
exports.registerTipper = async (req, res) => {
  const { name, email, walletAddress } = req.body;

  if (!name || !email || !walletAddress) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingTipper = await Tipper.findOne({ walletAddress });
    if (existingTipper) {
      return res
        .status(400)
        .json({ message: 'Wallet address already registered.' });
    }

    const newTipper = new Tipper({
      name,
      email,
      walletAddress,
    });

    await newTipper.save();
    res
      .status(201)
      .json({ message: 'Tipper registered successfully.', tipper: newTipper });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering tipper.' });
  }
};

// Tipper Login
exports.loginTipper = async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address is required.' });
  }

  try {
    const tipper = await Tipper.findOne({ walletAddress });
    if (!tipper) {
      return res.status(404).json({ message: 'Tipper not found.' });
    }

    res.status(200).json({
      message: 'Login successful.',
      tipper,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in tipper.' });
  }
};
