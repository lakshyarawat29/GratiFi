require('@nomiclabs/hardhat-ethers');
require('dotenv').config();
const INFURA_URL =
  'https://mainnet.infura.io/v3/f619b4e7e9254e6aad0794e8f5951667';
const PRIVATE_KEY =
  'd0d431f7304958a330165f1a1d2e012093442df6629a559b9d3b60102573623e';

module.exports = {
  solidity: '0.5.11', // Your Solidity version
  paths: {
    sources: './smartcontracts', // Pointing to the correct contract folder
    tests: './test', // Optional if you have test files
    cache: './cache',
    artifacts: './artifacts', // Default location for compiled files
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545', // Default URL for Hardhat Network or Ganache
      accounts: [`0x${PRIVATE_KEY}`], // Use your private key
      gasPrice: 20000000000,
      gasLimit: 6000000,
    },
    sepolia: {
      url: INFURA_URL, // Your Infura URL
      accounts: [
        '0xd0d431f7304958a330165f1a1d2e012093442df6629a559b9d3b60102573623e',
      ],
      gasPrice: 20000000000,
      gasLimit: 6000000,
    },

    holesky: {
      url: 'https://holesky.rpc.thirdweb.com',
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};