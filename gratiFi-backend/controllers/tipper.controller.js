const Tipper = require('../models/tipper.model');
const Creator = require('../models/creator.model');
const { ethers } = require('ethers');
const compiledContract = require('../../artifacts/smartcontracts/tipPlatform.sol/TipPlatform.json'); // Adjust path as necessary
const PRIVATE_KEY =
  'd0d431f7304958a330165f1a1d2e012093442df6629a559b9d3b60102573623e';
const contractAddress = '0x57e928A62346e74edf2420deA575DFAbAB03F125';
const TESTNET_RPC_URL = 'https://holesky.rpc.thirdweb.com';
// Load provider and contract
const provider = new ethers.providers.JsonRpcProvider(TESTNET_RPC_URL); // Use Holesky Testnet RPC
const wallet = new ethers.Wallet(PRIVATE_KEY, provider); // Deployer's private key
const contract = new ethers.Contract(
  contractAddress,
  compiledContract.abi,
  wallet
);

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

// Tip a Creator
exports.tipCreator = async (req, res) => {
  const { creatorWallet } = req.params;
  const { tipperWallet, amount } = req.body;

  if (!tipperWallet || !creatorWallet || !amount) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if both tipper and creator exist
    const tipper = await Tipper.findOne({ walletAddress: tipperWallet });
    const creator = await Creator.findOne({ walletAddress: creatorWallet });

    if (!tipper) return res.status(404).json({ message: 'Tipper not found.' });
    if (!creator)
      return res.status(404).json({ message: 'Creator not found.' });

    // Interact with the smart contract to tip the creator
    const tx = await contract.tipCreator(creatorWallet, {
      value: ethers.utils.parseEther(amount.toString()), // Convert amount to Ether
    });

    // Wait for transaction to confirm
    await tx.wait();

    // Update balances and transactions
    tipper.transactions.push({
      creatorWallet,
      amount,
      transactionHash: tx.hash,
    });
    creator.balance += amount;

    await tipper.save();
    await creator.save();

    res.status(200).json({
      message: `Successfully tipped ${amount} ETH to creator!`,
      transactionHash: tx.hash,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error tipping creator.', error: error.message });
  }
};
