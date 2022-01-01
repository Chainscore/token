const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const ChainScore = artifacts.require('ChainScore');

require('dotenv').config();

module.exports = async function (deployer, network, accounts) {

  await deployer.deploy(ChainScore);
  // deploy token
  const tokenInstance = await ChainScore.deployed();

  // transfer all tokens to treasury wallet
  await tokenInstance.mint(process.env.TREASURY_WALLET, web3.utils.toWei("100000000"));
  
  // transfer token contract ownership to admin wallet
  await tokenInstance.transferOwnership(process.env.ADMIN_WALLET);

  console.log('Deployed: ', tokenInstance.address);
  console.log('Owner: ', (await tokenInstance.owner()));
  console.log('Treasury Balance: ', web3.utils.fromWei(await tokenInstance.balanceOf(process.env.TREASURY_WALLET)), " $SCORE");
};