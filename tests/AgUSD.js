const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgUSD - Basic ERC20 read functions.", function () {
  it("Should return AggregatedUSD as the name", async function () {
    const AgUSD = await ethers.getContractFactory("AgUSD");
    const agUSD = await AgUSD.deploy();
    await agUSD.deployed();

    //console.log(await agUSD.owner());

    expect(await agUSD.name()).to.equal("AggregatedUSD");
  });
  it("Should return AgUSD as the symbol", async function () {
    const AgUSD = await ethers.getContractFactory("AgUSD");
    const agUSD = await AgUSD.deploy();
    await agUSD.deployed();

    expect(await agUSD.symbol()).to.equal("AgUSD");
  });
  it("Should return 0 as the totalSupply", async function () {
    const AgUSD = await ethers.getContractFactory("AgUSD");
    const agUSD = await AgUSD.deploy();
    await agUSD.deployed();

    expect(await agUSD.totalSupply()).to.equal(0);
  });
});

describe("AgUSD - Basic ERC20 write functions.", function () {
  it("Approve and test approval", async function () {
    const AgUSD = await ethers.getContractFactory("AgUSD");
    const agUSD = await AgUSD.deploy();
    await agUSD.deployed();

    const approvalTx = await agUSD.approve("0x000000000000000000000000000000000000dEaD",100000000000);

    await approvalTx.wait();

    expect(await agUSD.allowance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x000000000000000000000000000000000000dEaD")).to.equal(100000000000);
  });
});

describe("AgUSD - Custom functions", function () {
  it("Test cooldown timer (should be over 0)", async function () {
    const AgUSD = await ethers.getContractFactory("AgUSD");
    const agUSD = await AgUSD.deploy();
    await agUSD.deployed();

    const startCooldownTx = await agUSD.startCooldown();

    await startCooldownTx.wait();

    expect((await agUSD.getCooldownTime("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")) > 0).to.equal(true);
  });
  it("Changing gate availability", async function () {
    const AgUSD = await ethers.getContractFactory("AgUSD");
    const agUSD = await AgUSD.deploy();
    await agUSD.deployed();

    expect(await agUSD.daiGate()).to.equal(true);

    const setGateTx = await agUSD.setDaiGate(false);
    await setGateTx.wait();
    expect(await agUSD.daiGate()).to.equal(false);

    const revertGateTx = await agUSD.setDaiGate(true);
    await revertGateTx.wait();
    expect(await agUSD.daiGate()).to.equal(true);
  });
  it("Changing treasurySend", async function () {
    const AgUSD = await ethers.getContractFactory("AgUSD");
    const agUSD = await AgUSD.deploy();
    await agUSD.deployed();

    expect(await agUSD.treasurySend()).to.equal(2);

    const setTreasuryTx = await agUSD.setTreasurySent(3);
    await setTreasuryTx.wait();
    expect(await agUSD.treasurySend()).to.equal(3);

    const revertTreasuryTx = await agUSD.setTreasurySent(2);
    await revertTreasuryTx.wait();
    expect(await agUSD.treasurySend()).to.equal(2);
  });
  it("Changing multisig", async function () {
    const AgUSD = await ethers.getContractFactory("AgUSD");
    const agUSD = await AgUSD.deploy();
    await agUSD.deployed();

    expect(await agUSD.multisig()).to.equal("0x3e522051A9B1958Aa1e828AC24Afba4a551DF37d");

    const setTreasuryAmtTx = await agUSD.setMultisig("0x000000000000000000000000000000000000dEaD");
    await setTreasuryAmtTx.wait();
    expect(await agUSD.multisig()).to.equal("0x000000000000000000000000000000000000dEaD");

    const revertTreasuryTx = await agUSD.setMultisig("0x3e522051A9B1958Aa1e828AC24Afba4a551DF37d");
    await revertTreasuryTx.wait();
    expect(await agUSD.multisig()).to.equal("0x3e522051A9B1958Aa1e828AC24Afba4a551DF37d");
  });
});
