const Transaction = require("../models/transaction.model");

exports.logTransaction = async (req, res) => {
  const { tipper, creator, amount, txHash } = req.body;
  try {
    const transaction = new Transaction({ tipper, creator, amount, txHash });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
