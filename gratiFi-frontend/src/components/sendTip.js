import React, { useState } from "react";

const TipCreator = ({ creator }) => {
  const [amount, setAmount] = useState("");

  const handleTip = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount!");
      return;
    }
    await sendTip(amount, creator);
  };

  return (
    <div>
      <h1>Support {creator.name}</h1>
      <p>Wallet Address: {creator.walletAddress}</p>
      <p>{creator.description}</p>

      <label htmlFor="amount">Enter Tip Amount (ETH):</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.01"
      />

      <button onClick={handleTip}>Send Tip</button>
    </div>
  );
};

export default TipCreator;
