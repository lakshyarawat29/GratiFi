const { ethers } = require('ethers');
const Creator = require('../models/creator.model');
const contractABI = require('../../artifacts/smartcontracts/tipPlatform.sol/TipPlatform.json'); // ABI of your contract
const contractAddress = '0x57e928A62346e74edf2420deA575DFAbAB03F125';
const TESTNET_RPC_URL = 'https://holesky.rpc.thirdweb.com';
const provider = new ethers.providers.JsonRpcProvider(TESTNET_RPC_URL); // Use your testnet RPC URL
const PRIVATE_KEY =
  'd0d431f7304958a330165f1a1d2e012093442df6629a559b9d3b60102573623e';
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Creator Registration
exports.registerCreator = async (req, res) => {
  const { name, email, walletAddress, socialLinks, description } = req.body;

  if (!name || !email || !walletAddress) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingCreator = await Creator.findOne({ walletAddress });
    if (existingCreator) {
      return res
        .status(400)
        .json({ message: 'Wallet address already registered.' });
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
    if (!creator) return res.status(404).json({ message: 'Creator not found' });

    res.json(creator);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Tip a creator

exports.tipCreator = async (req, res) => {
  const { creatorAddress } = req.params;
  const { amount, tipperWallet } = req.body;

  if (!amount || !tipperWallet) {
    return res
      .status(400)
      .json({ message: 'Amount and tipper wallet are required.' });
  }

  try {
    const creator = await Creator.findOne({ walletAddress: creatorAddress });
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found.' });
    }

    // Smart contract tipping logic
    // Assumes you have a contract instance ready
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.tipCreator(creatorAddress, {
      value: ethers.utils.parseEther(amount.toString()), // Convert to wei
      from: tipperWallet,
    });

    await tx.wait(); // Wait for transaction confirmation

    // Update creator balance in MongoDB
    creator.balance += parseFloat(amount);
    await creator.save();

    res.status(200).json({
      message: `Successfully tipped ${amount} tokens to creator ${creator.name}.`,
      transactionHash: tx.hash,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error tipping creator.' });
  }
};

// Withdraw funds
exports.withdrawFunds = async (req, res) => {
  const { walletAddress, amount } = req.body;

  if (!walletAddress || !amount) {
    return res
      .status(400)
      .json({ message: 'Wallet address and amount are required.' });
  }

  try {
    const creator = await Creator.findOne({ walletAddress });
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found.' });
    }

    if (creator.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance.' });
    }

    // Smart contract withdrawal logic
    // Assumes you have a contract instance ready
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.withdrawFunds(
      walletAddress,
      ethers.utils.parseEther(amount.toString())
    );

    await tx.wait(); // Wait for transaction confirmation

    // Update creator balance in MongoDB
    creator.balance -= parseFloat(amount);
    await creator.save();

    res.status(200).json({
      message: `Successfully withdrew ${amount} tokens.`,
      transactionHash: tx.hash,
    });
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
