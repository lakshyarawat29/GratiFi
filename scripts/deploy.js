async function main() {
  // Get the ContractFactory and Signers
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the contract
  const TipPlatform = await ethers.getContractFactory("TipPlatform");
  const tipPlatform = await TipPlatform.deploy();
  console.log("TipPlatform deployed to:", tipPlatform.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
