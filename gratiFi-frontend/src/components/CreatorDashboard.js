import React, { useState, useEffect } from "react";
import { getContractInstance } from "../utils/ethereum";

const CreatorDashboard = ({ walletAddress }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const contract = await getContractInstance();
        if (!contract) return;

        const balanceInWei = await contract.getBalance(walletAddress);
        setBalance(ethers.utils.formatEther(balanceInWei));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return (
    <div>
      <h1>Creator Dashboard</h1>
      <p>Your Balance: {balance} ETH</p>
    </div>
  );
};

export default CreatorDashboard;
