const { expect } = require("chai");

describe("TipPlatform Contract", function () {
  let TipPlatform, tipPlatform, owner, addr1, addr2;

  beforeEach(async function () {
    TipPlatform = await ethers.getContractFactory("TipPlatform");
    [owner, addr1, addr2] = await ethers.getSigners();
    tipPlatform = await TipPlatform.deploy();
    await tipPlatform.deployed();
  });

  it("Should register a new creator", async function () {
    await tipPlatform.registerCreator("Creator1", addr1.address);
    const creator = await tipPlatform.creators(addr1.address);
    expect(creator.name).to.equal("Creator1");
  });

  it("Should allow tipping a creator", async function () {
    await tipPlatform.registerCreator("Creator1", addr1.address);
    await tipPlatform.connect(addr2).tipCreator(addr1.address, { value: ethers.utils.parseEther("1") });
    
    const creator = await tipPlatform.creators(addr1.address);
    expect(creator.balance).to.equal(ethers.utils.parseEther("1"));
  });
});
