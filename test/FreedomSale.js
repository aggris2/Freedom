const Freedom = artifacts.require("Freedom");
const FreedomSale = artifacts.require("FreedomSale");

contract('FreedomSale', function(accounts) {
	var FreedomInstance;
	var FreedomSaleInstance;
	var admin = accounts[0];
	var buyer = accounts[1];
	var tokenPrice = 1000000000000000; //Wei
	var tokensAvailable = 750000;
	var numberOfTokens;

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

	it('facilitates token buying', function() {
		return Freedom.deployed().then(function(instance) {
			FreedomInstance = instance;
			return FreedomSale.deployed();
		}).then(function(instance) {
			FreedomSaleInstance = instance;
			return FreedomInstance.transfer(FreedomSaleInstance.address, tokensAvailable, { from: admin })
		}).then(function(receipt) {
			numberOfTokens = 10;
			return FreedomSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: numberOfTokens * tokenPrice })
		}).then(function(receipt) {
			assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased');
			return FreedomSaleInstance.tokensSold();
		}).then(function(amount) {
			assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
			return FreedomInstance.balanceOf(buyer);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), numberOfTokens);
			return FreedomInstance.balanceOf(FreedomSaleInstance.address);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
		 	return FreedomSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 });
		}).then(assert.fail).catch(function(error) {
         	assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
            return FreedomSaleInstance.buyTokens(800000, { from: buyer, value: numberOfTokens * tokenPrice })
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');
		});
	});
});