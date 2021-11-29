const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const ChainScore = artifacts.require('ChainScore');

require('dotenv').config();

module.exports = async function (deployer) {
  const instance = await deployProxy(ChainScore, { deployer, initializer: "initialize", kind: 'uups' });
  await instance.transferOwnership(process.env.ADMIN_WALLET);

  console.log('Deployed: ', instance.address);
};