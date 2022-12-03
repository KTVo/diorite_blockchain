const path = require('path');
const fs = require('fs');
const solc = require('solc');

const ourContractPath = path.resolve('..','..','contracts', 'Diorite.sol');
const source = fs.readFileSync(ourContractPath, 'UTF-8');


// The last line of codes need to be changed like below.
const input = {
  language: "Solidity",
  sources: {
    "Diorite.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));

//console.log(output.compile);
 
module.exports = output.contracts["Diorite.sol"]["Diorite"];

console.log(module.exports);
