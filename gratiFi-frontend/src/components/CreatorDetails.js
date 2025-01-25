import React, { useState } from "react";
import { getContractInstance } from "../utils/ethereum";

const CreatorDetails = ({ creator }) => {
  const [amount, setAmount] = useState("");

  const sendTip = async () => {
    try {
      const contract = await getContractInstance();
      if (!contract) return;

      const amountInWei = ethers.utils.parseEther(amount);
      const transaction = await contract.sendTip(creator.walletAddress, {
        value: amountInWei,
      });

      await transaction.wait();
      alert(`Tip sent successfully! Tx Hash: ${transaction.hash}`);
    } catch (error) {
      console.error("Error sending tip:", error);
      alert("Transaction failed. Check console for details.");
    }
  };

  return (
    <div>
      <h1>{creator.name}</h1>
      <p>Wallet: {creator.walletAddress}</p>
      <input
        type="number"
        placeholder="Enter tip amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTip}>Send Tip</button>
    </div>
  );
};

export default CreatorDetails;
