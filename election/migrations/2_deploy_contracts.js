// Creates a contract & assigns it to var Election
var Election = artifacts.require("./Election.sol");

// Adds the Election contract to the manifest/list of deployed contracts
module.exports = function(deployer) {
	deployer.deploy(Election);
};
