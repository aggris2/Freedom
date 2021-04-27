const FreedomSale = artifacts.require("FreedomSale");

contract('FreedomSale', function(accounts) {
	var FreedomSaleInstance;
	var tokenPrice = 1000000000000000; //Wei

	it('initializes the contract with the correct values', function() {
		return FreedomSale.deployed().then(function(instance) {
			FreedomSaleInstance = instance;
			return FreedomSaleInstance.address
		}).then(function(address) {
			assert.notEqual(address, 0x0, 'has contract address');
			return FreedomSaleInstance.tokenContract();
		}).then(function(address) {
			assert.notEqual(address, 0x0, 'has token contract');
			return FreedomSaleInstance.tokenPrice();
		}).then(function(price) {
			assert.equal(price, tokenPrice, 'token price is correct');
		});
	});
});