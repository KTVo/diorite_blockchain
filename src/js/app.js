App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
	console.log("I am initWeb3 line 7");
    return App.initWeb3();
  },

  initWeb3: function() {
	console.log("I am initWeb3 line 11");
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Diorite.json", function(diorite) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Diorite = TruffleContract(diorite);
      // Connect provider to interact with contract
      App.contracts.Diorite.setProvider(App.web3Provider);
	  
	  console.log("Happy Day");

      return App.render();
    });
  },

  render: function() {
    var dioriteInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Diorite.deployed().then(function(instance) {
      dioriteInstance = instance;
      return dioriteInstance.candidatesCount();
    }).then(function(candidatesCount) {
     var candidatesResults = $("#candidatesResults");
     candidatesResults.empty();


      for (var i = 1; i <= candidatesCount; i++) {
        dioriteInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);
		  
		  var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
			candidatesSelect.append(candidateOption);
        });
      }

//      loader.hide();
//      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },
  
  buyDioriteSubmit: function(buyerAddr, dioriteBoughtAmount) {
    console.log("1buyerAddr = " + buyerAddr + " --- dioriteBoughtAmount = " + dioriteBoughtAmount);
		
	
	App.contracts.Diorite.deployed().then(function(instance) {
		return instance.buy(buyerAddr, dioriteBoughtAmount, { from: App.account });
	}).catch(function(err) {
		console.error(err);
	});
	
	console.log("2buyerAddr = " + buyerAddr + " --- dioriteBoughtAmount = " + dioriteBoughtAmount);

  }
  
};

(function() {
  Document.getElementById(window).load(function() {
    App.init();
  });
});