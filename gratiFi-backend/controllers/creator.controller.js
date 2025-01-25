const Creator = require('../models/creator.model');

// Creator Registration
exports.registerCreator = async (req, res) => {
  const { name, email, walletAddress, socialLinks, description } = req.body;

  if (!name || !email || !walletAddress) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingCreator = await Creator.findOne({ walletAddress });
    if (existingCreator) {
      return res.status(400).json({ message: 'Wallet address already registered.' });
    }

    const newCreator = new Creator({
      name,
      email,
      walletAddress,
      socialLinks,
      description,
    });

    await newCreator.save();
    res.status(201).json({
      message: 'Creator registered successfully.',
      creator: newCreator,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering creator.' });
  }
};

// Get all creators
exports.getCreators = async (req, res) => {
  try {
    const creators = await Creator.find();
    res.json(creators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching creators.' });
  }
};

// Get one creator
exports.getCreator = async (req, res) => {
  const { walletAddress } = req.params;
  try {
    const creator = await Creator.findOne({ walletAddress });
    if (!creator) return res.status(404).json({ message: "Creator not found" });

    res.json(creator);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Tip a creator
exports.tipCreator = async (req, res) => {
  const { creatorAddress } = req.params;
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: 'Amount is required.' });
  }

  try {
    const creator = await Creator.findOne({ walletAddress: creatorAddress });
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found.' });
    }

    // Add tipping logic here (e.g., update balance)
    res.status(200).json({ message: `Tipped ${amount} to creator!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error tipping creator.' });
  }
};

// Withdraw funds
exports.withdrawFunds = async (req, res) => {
  const { walletAddress, amount } = req.body;

  if (!walletAddress || !amount) {
    return res.status(400).json({ message: 'Wallet address and amount are required.' });
  }

  try {
    const creator = await Creator.findOne({ walletAddress });
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found.' });
    }

    // Add withdrawal logic here (e.g., deduct from balance)
    res.status(200).json({ message: `Withdrawn ${amount} from creator wallet.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error withdrawing funds.' });
  }
};

// Creator Login
exports.loginCreator = async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address is required.' });
  }

  try {
    const creator = await Creator.findOne({ walletAddress });
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found.' });
    }

    res.status(200).json({
      message: 'Login successful.',
      creator,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in creator.' });
  }
};
