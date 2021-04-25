const Freedom = artifacts.require("Freedom");

module.exports = function (deployer) {
  deployer.deploy(Freedom, 1000000);
};
