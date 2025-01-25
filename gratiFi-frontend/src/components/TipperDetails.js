import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";

const TipperDetails = () => {
  const location = useLocation();
  const { creator } = location.state;
  const [amount, setAmount] = useState("");

  const handleTip = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    try {
      const contract = await getContractInstance(); // Assume this function gets the contract instance
      if (!contract) return;

      const amountInWei = ethers.utils.parseEther(amount);
      const transaction = await contract.sendTip(creator.walletAddress, {
        value: amountInWei,
      });

      await transaction.wait();

      // Log transaction in MongoDB
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipper: "TYPER_WALLET_ADDRESS", // Replace with the actual wallet address of the tipper
          creator: creator.walletAddress,
          amount,
          txHash: transaction.hash,
        }),
      });

      alert(`Tip sent successfully! Tx Hash: ${transaction.hash}`);
    } catch (error) {
      console.error("Error sending tip:", error);
      alert("Transaction failed. Check console for details.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{creator.name}</h1>
      <p>{creator.description}</p>
      <p className="mb-4">Wallet Address: {creator.walletAddress}</p>

      <label htmlFor="amount" className="block mb-2">
        Enter Tip Amount (ETH):
      </label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded w-full p-2 mb-4"
        placeholder="0.01"
      />

      <button
        onClick={handleTip}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Tip
      </button>
    </div>
  );
};

export default TipperDetails;
