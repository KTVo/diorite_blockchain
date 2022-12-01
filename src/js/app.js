let metamaskIsInstalled = true;

let metaMaskDetection = $("#alertMissingMetaMask"); // Gets html-component for alertMissingMetaMask
let obtainingAccount = $("#obtainingAccount");    // Gets html-component for loading...
let content = $("#content");  // Gets html-component for content
let showTransactionFields = $("#showTransactionFields")

const transferDioriteForm = document.querySelector("#transferDioriteForm");

let dioriteAmount = null;
let recipientUsername = null;

//const formSubmit = document.getElementById("submit");

showTransactionFields.show();
obtainingAccount.hide();

console.log(dioriteAmount);

// Checks if MetaMask is installed
if (typeof window.ethereum !== 'undefined')
{
  console.log("MetaMask is installed!");
  metamaskIsInstalled = true;
}
else
{
  console.log("MetaMask NOT detected.");
}

if (!metamaskIsInstalled)
{
  metaMaskDetection.show();
  content.hide();
}
else
{
  metaMaskDetection.hide();
  content.show();
  const showAccount = document.querySelector('.showAccount');

  const showTotalBalance = document.querySelector('.showTotalBalance');
  /*
      Code for Sending ETH
  */
  const ethereumButton = document.querySelector('.enableEthereumButton');
  const sendDioriteButton = document.getElementById("sendDiorite");

  let accounts = [];

  //Sending Ethereum to an address
  sendDioriteButton.addEventListener('click', () => {
	  
/*
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
            value: '0x29a2241af62c0000',
            gasPrice: '0x09184e72a000',
            gas: '0x2710',
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
	  
*/
  });
  

  ethereumButton.addEventListener('click', () => {
    getAccount();
  });
  

  transferDioriteForm.addEventListener('submit', (event)=> {

    // stop form submission
	  // event.preventDefault();
	// let messages = []
	  
	
	// if (dioriteAmount.value === '0' || dioriteAmount.value == null)
	// {
	// 	messages.push("Diorite Amount is insufficient");
	// }
	
  const showTranferAmount = document.querySelector('.showTranferAmount');

  // Obtaining recipient's username to be transfered from HTML
  recipientUsername = transferDioriteForm.elements["recipientUsername"].value;

  // Obtaining diorite amount to be transfered from HTML
	dioriteAmount = transferDioriteForm.elements["dioriteAmount"].value;
	console.log("dioriteAmount = " + dioriteAmount);
	
  
  showTranferAmount.innerHTML = dioriteAmount;

  //Transfer Diorite to recipent
  transferDioriteForm(recipientUsername, dioriteAmount);
	
	
  });

  async function getAccount() {
    obtainingAccount.show();

    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    showAccount.innerHTML = account;

    showTotalBalance.innerHTML = "696969";
    
    if(accounts.length > 0)
    {
      obtainingAccount.hide();
      showTransactionFields.show();
      
    }


  }
}

void transferDioriteForm(in_recipientUsername, in_dioriteAmount)
{
  var Election = artifacts.require("./Election.sol");

  contract("Election", function(accounts) {
  
    var electionInstance;

    it("it initializes the users with the correct values", function() {
      return Election.deployed().then(function(instance) {
        electionInstance = instance;
        return electionInstance.users(1);
      }).then(function(senderUsername) {
        // Get Sender's User ID by his/her username
        const senderID = electionInstance.getUserID(senderUsername);

        // Get Recipient's User ID by his/her username
        const recipientID = electionInstance.getUserID(in_recipientUsername);

        electionInstance.send(senderID, recipientID, in_dioriteAmount);

      });
    }); 
  });
}

// App = {
//   web3Provider: null,
//   contracts: {},
//   account: '0x0',

//   init: function() {
//     return App.initWeb3();
//   },

//   initWeb3: function() {
//     if (typeof web3 !== 'undefined') {
//       // If a web3 instance is already provided by Meta Mask.
//       App.web3Provider = web3.ethereum;
//       web3 = new Web3(web3.ethereum);
//     } else {
//       // Specify default instance if no web3 instance provided
//       App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
//       web3 = new Web3(App.web3Provider);
//     }
//     return App.initContract();
//   },

//   initContract: function() {
//     $.getJSON("Election.json", function(election) {
//       // Instantiate a new truffle contract from the artifact
//       App.contracts.Election = TruffleContract(election);
//       // Connect provider to interact with contract
//       App.contracts.Election.setProvider(App.web3Provider);

//       return App.render();
//     });
//   },

//   render: function() {
//     var electionInstance;
//     var loader = $("#loader");
//     var content = $("#content");

//     loader.show();
//     content.hide();

//     // Load account data
//     web3.eth.getCoinbase(function(err, account) {
//       if (err === null) {
//         App.account = account;
//         $("#accountAddress").html("Your Account: " + account);
//       }
//     });

//     // Load contract data
//     App.contracts.Election.deployed().then(function(instance) {
//       electionInstance = instance;
//       return electionInstance.candidatesCount();
//     }).then(function(candidatesCount) {
//       var candidatesResults = $("#candidatesResults");
//       candidatesResults.empty();

//       for (var i = 1; i <= candidatesCount; i++) {
//         electionInstance.candidates(i).then(function(candidate) {
//           var id = candidate[0];
//           var name = candidate[1];
//           var voteCount = candidate[2];

//           // Render candidate Result
//           var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
//           candidatesResults.append(candidateTemplate);
//         });
//       }

//       loader.hide();
//       content.show();
//     }).catch(function(error) {
//       console.warn(error);
//     });
//   }
// };

// $(function() {
//   $(window).load(function() {
//     App.init();
//   });
// });





// App = {
//   web3Provider: null,
//   contracts: {},
//   account: '0x0',

//   init: function() {
//     return App.initWeb3();
//   },

//   initWeb3: function() {
//     if (typeof web3 !== 'undefined') {
//       // If a web3 instance is already provided by Meta Mask.
//       // Meta
//       App.web3Provider = web3.currentProvider;
//       web3 = new Web3(web3.currentProvider);
//     } else {
//       // Specify default instance if no web3 instance provided
//       App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
//       web3 = new Web3(App.web3Provider);
//     }
//     return App.initContract(); // Connects client-side app to blockchain
//   },

//   initContract: function() {
//     $.getJSON("Election.json", function(election) {
//       // Instantiate a new truffle contract from the artifact
//       App.contracts.Election = TruffleContract(election);
//       // Connect provider to interact with contract
//       App.contracts.Election.setProvider(App.web3Provider);

//       App.listenForEvents();
      
//       return App.render();
//     });
//   },

//   render: function() {
//     var electionInstance;
//     var loader = $("#loader");
//     var content = $("#content");
  
//     // Display loading... text until account is connected
//     loader.show();
//     content.hide();
  
//     // Load account data
//     // Obtain account from getCoinbase() from eth
//     web3.eth.getCoinbase(function(err, account) {
//       if (err === null) {
//         App.account = account;
//         $("#accountAddress").html("Your Account: " + account);
//       }
//     });
  
//     // Load contract data
//     App.contracts.Election.deployed().then(function(instance) {
//       electionInstance = instance;
//       return electionInstance.candidatesCount();
//     }).then(function(candidatesCount) {
//       var candidatesResults = $("#candidatesResults");
//       candidatesResults.empty();
  
//       var candidatesSelect = $('#candidatesSelect');
//       candidatesSelect.empty();
  
//       for (var i = 1; i <= candidatesCount; i++) {
//         electionInstance.candidates(i).then(function(candidate) {
//           var id = candidate[0];
//           var name = candidate[1];
//           var voteCount = candidate[2];
  
//           // Render candidate Result
//           var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
//           candidatesResults.append(candidateTemplate);
  
//           // Render candidate ballot option
//           var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
//           candidatesSelect.append(candidateOption);
//         });
//       }
//       return electionInstance.voters(App.account);
//     }).then(function(hasVoted) {
//       // Do not allow a user to vote
//       if(hasVoted) {
//         $('form').hide();
//       }
//       loader.hide();
//       content.show();
//     }).catch(function(error) {
//       console.warn(error);
//     });
//   },

//   castVote: function() {
//     var candidateId = $('#candidatesSelect').val();
//     App.contracts.Election.deployed().then(function(instance) {
//       return instance.vote(candidateId, { from: App.account });
//     }).then(function(result) {
//       // Wait for votes to update
//       $("#content").hide();
//       $("#loader").show();
//     }).catch(function(err) {
//       console.error(err);
//     });
//   },

//   listenForEvents: function() {
//     App.contracts.Election.deployed().then(function(instance) {
//       instance.votedEvent({}, {
//         fromBlock: 0,
//         toBlock: 'latest'
//       }).watch(function(error, event) {
//         console.log("event triggered", event)
//         // Reload when a new vote is recorded
//         App.render();
//       });
//     });
//   }
// };

// $(function() {
//   $(window).load(function() {
//     App.init();
//   });
// });