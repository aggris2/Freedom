const Freedom = artifacts.require("Freedom");
const FreedomSale = artifacts.require("FreedomSale");

module.exports = function(deployer) {
  deployer.deploy(Freedom, 1000000).then(function() {
  	var tokenPrice = 1000000000000000; //Wei
  	return deployer.deploy(FreedomSale, Freedom.address, tokenPrice);
  });
};
