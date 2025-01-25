import { ethers } from "ethers";
import contractABI from "../../smartcontracts/TipPlatformABI.json";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export const getContractInstance = async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  } else {
    console.error("MetaMask is not installed.");
    return null;
  }
};

export const switchToHolesky = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x170" }], // Holesky Testnet Chain ID
    });
  } catch (error) {
    console.error("Error switching to Holesky network:", error);
  }
};
