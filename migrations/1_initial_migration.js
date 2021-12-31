const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const ChainScore = artifacts.require('ChainScore');

require('dotenv').config();

module.exports = async function (deployer, network, accounts) {

  // deploy token
  const tokenInstance = await deployProxy(ChainScore, [100000000], { deployer, initializer: "initialize", kind: 'uups' });

  // transfer all tokens to treasury wallet
  let tx = await tokenInstance.transfer(process.env.TREASURY_WALLET, (await tokenInstance.balanceOf(accounts[0])));

  // transfer token contract ownership to admin wallet
  await tokenInstance.transferOwnership(process.env.ADMIN_WALLET);

  console.log('Deployed: ', tokenInstance.address);
};