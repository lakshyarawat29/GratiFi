const { ethers } = require("ethers");
const contractABI = require("../../artifacts/smartcontracts/tipPlatform.sol/TipPlatform.json"); // ABI of your contract
const contractAddress = "0x57e928A62346e74edf2420deA575DFAbAB03F125"; // Replace with the address of the deployed contract

const provider = new ethers.providers.JsonRpcProvider(process.env.TESTNET_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function tipCreator(creatorAddress, amount) {
  try {
    const tx = await contract.tip(creatorAddress, {
      value: ethers.utils.parseEther(amount.toString()),
    });
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("Error sending tip:", error);
    throw error;
  }
}

module.exports = { tipCreator };
