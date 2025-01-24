async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // Display deployer's current balance
  const balance = await deployer.getBalance();
  console.log('Account balance:', ethers.utils.formatEther(balance), 'ETH');

  // Get the contract factory for TipPlatform
  const TipPlatform = await ethers.getContractFactory('TipPlatform');

  // Estimate gas for contract deployment
  const estimatedGas = await deployer.estimateGas(TipPlatform.getDeployTransaction());
  console.log(`Estimated Gas for deployment: ${estimatedGas.toString()}`);

  // Deploy the contract
  const tipPlatform = await TipPlatform.deploy();
  await tipPlatform.deployed();

  console.log('Contract deployed to:', tipPlatform.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
